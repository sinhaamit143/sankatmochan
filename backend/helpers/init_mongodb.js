const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI,{
    dbName: process.env.DB_NAME,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    
})
.then(()=>{
    console.log('MongoDB Connected')
})
.catch(err => console.log(err.message))


mongoose.connection.on('connected',()=>{
    console.log('Mongoose Connected to db')
})
mongoose.connection.on('error',(err)=>{
    console.log('err.message')
})

mongoose.connection.on('disconnected' , ()=>{
    console.log('Mongooose connection is disconnected..')
})

process.on('SIGINT' , async()=>{
    await mongoose.connection.close()
    process.exit(0)
})
