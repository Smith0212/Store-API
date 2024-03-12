require("dotenv").config()

const connectDB = require("./db/connect")
const Product = require("./models/product")
const jsonProducts = require("./products.json")

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        await Product.deleteMany()  //to clear all the rubish values and add data from scratch
        await Product.create(jsonProducts) //add all the products in list
        console.log("Success!!")
        process.exit(0) //once the data is added to DB we terminate this process
    }
    catch (err) {
        console.log(err)
        process.exit(1) //terminate this process with error code
    }
}

start()