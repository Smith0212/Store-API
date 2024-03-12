require("dotenv").config();
require("express-async-errors")  //replace the asyncWrapper function of privious project 


const express = require("express")
const app = express()


const connectDB= require("./db/connect")
const productRouter = require("./routes/products")


const errorMW = require("./middleware/error-handler")
const notFoundMW = require("./middleware/not-found")

// middleware
app.use(express.json())  //not going to use this, write just for remember the syntext  

//routes
app.get("/", (req, res) => {
    res.status(200).send("<h1>Store API</h1>")
})


app.use("/api/v1/products", productRouter)


app.use(notFoundMW)
app.use(errorMW)



const port = process.env.PORT || 3000

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    }
    catch (err) {
        console.log(err)
    }
}

start()

