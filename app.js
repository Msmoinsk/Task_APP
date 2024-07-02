const exporess = require("express"),
app = exporess()

// middleware
app.use(exporess.static("./public"))
app.use(exporess.json())
const { notFound } = require("./middleware/not-found")
const errorHandlerMiddleware = require("./middleware/error")

// Controllers
const tasks = require("./routes/tasks") 

// data base connection file 
const connectDB = require("./db/db_connection")

// env file calling the Mongo URL
require("dotenv").config()

// routes
app.use("/api/v1/tasks", tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

const port = 3000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server running at port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}
start()