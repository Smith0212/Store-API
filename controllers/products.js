const product = require("../models/product")
const Product = require("../models/product")


const getAllProductsStatic = async (req, res) => {
    // throw new Error("throws error")   //no need to use "next", simply need to throw error
    res.status(200).json({msg : "All Products"})
}

const getAllProducts = async (req, res) =>   {
    // instade of just directly passing req.query to find(bcoz if any of the URL query is not then it will give empty list) func we check for 
    // specific propreties we are intrested in.
    // create new obj(queryObject) for storing that properties
    // if that properties are exist in query then create new properties in queryObject
    // and then passing that new obj(queryObject) in to find func
    const { featured, company, name, sort, fields } = req.query  //var names are need to be same as URL query 
    const queryObject = {}

    if(featured){
        queryObject.featured = featured === "true" ? true : false
    }
    if(company){
        queryObject.company = company
    }
    if(name){
        // $regex will check for values that matches in the name if only "a" is passed then all the product with "a" in name will be displayed
        // $option: 'i' means case insencetive
        queryObject.name = {$regex: name, $options: 'i'} 
    }
    

    // console.log(queryObject)
    // const products = await Product.find(req.query)
    let result = Product.find(queryObject)


    // till here we are collecting products based on query(featured, company, name) in URL
    // after that we are sorting the product, selecting perticuler field to display


    // Sorting
    if (sort) {
        const sortList = sort.split(",").join(" ")
        result = result.sort(sortList)
    }
    else {
        result = result.sort("createAt")
    }

    
    // select only perticuler fields
    if (fields) {
        const fieldsList = fields.split(",").join(" ")
        result = result.select(fieldsList)
    }

    const products = await result
    res.status(200).json({ products, nbHits: products.length })

}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}