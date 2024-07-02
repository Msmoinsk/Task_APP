const mongoose = require("mongoose")

const connectDB = (url) => {
    return mongoose.connect(url, {
        useNewUrlParser:true,
        useCreateIndex:true,
        useFindAndModify:false,
        useUnifiedTopology:true
    })
}
mongoose.connection.once("open", () => {console.log('DB started');})

module.exports = connectDB