const product = require("../models/product")
const Product = require("../models/product")


const getAllProductsStatic = async (req, res) => {
    // throw new Error("throws error")   //no need to use "next", simply need to throw error
    res.status(200).json({msg : "All Products"})
}

const getAllProducts = async (req, res) =>   {
    // instade of just directly passing req.query to "find" func(bcoz if any 1 of the URL query is not in DB Schema then it will give empty list) we check for- 
    // -specific propreties we are intrested in.
    // create new obj(queryObject) for storing that properties
    // if that properties are exist in query then create new properties in queryObject
    // and then passing that new obj(queryObject) in to find func
    const { featured, company, name, sort, fields, numericFilter } = req.query  //var names are need to be same as URL query 
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
    if(numericFilter) {
        const operatorMap = {
            '>': '$gt',
            '<': '$lt',
            '>=': '$gte',
            '<=': '$lte',
            '=': '$eq',
        }
        const regEx = /\b(>|<|>=|<=|=)\b/g    // to match the numeric oprator
        let filter = numericFilter.replace(regEx, (match) => `-${operatorMap[match]}-`) // we can't directly pass this "filter" to queryObject as it is not DB property like "name", "company" etc.

        const options = ["price", "rating"]   // if field is not from this two(numeric) fields then filtering cant apply(bcoz its not numeric value))
        filter = filter.split(",").forEach((item) => {
            const [field, operator, value] = item.split("-")
            if(options.includes(field)) {
                queryObject[field] = {[operator]: Number(value)}
            }
        })


        console.log(queryObject)
 
    }

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


    const page = Number(req.query.page) || 1     // By default "req.query.page" is string so convert it in Number 
    const limit = Number(req.query.limit) || 7
    const skip = (page-1) * limit   // 7 products in 1st page, in next page 1st 7 products should be skip and next 7 product should be display
                                    // 7, 7, 7, 2 (num of products in page 1, 2, 3, 4)

    result = result.limit(limit).skip(skip)

    const products = await result
    res.status(200).json({ products, nbHits: products.length })

}

module.exports = {
    getAllProducts,
    getAllProductsStatic,
}

