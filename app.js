const express= require('express')
const app= express();
const path = require('path');
const mongoose= require('mongoose')


const url= "mongodb+srv://shrunkhalaraut:D9QoQLb9zGiVi7sJ@cluster0.dwabuzw.mongodb.net/blogdb"

const connectionParams = {
    useNewUrlParser: true,    
    useUnifiedTopology: true    
    }
    
    mongoose.connect(url, connectionParams).then(() => {    
    console.log('connected to db')    
    }).catch(    
    console.log('error')    
    )

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'))
app.use(express.urlencoded({extended : true}))
app.use(express.json())

app.listen(8080, ()=>{
    console.log('server started')
})