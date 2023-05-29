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

const blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    added_by: String,
    createdAt: ({type: Date, default: Date.now})
})

let BlogTable = mongoose.model('Blogs', blogSchema);

app.get("/", (req,res) => {
    res.redirect("/blogs");
})

//get all blogs
app.get("/blogs", async(req,res) => {
    const blogs = await BlogTable.find({});
    res.render("index.ejs",{allBlogs : blogs})
})

//add new post
app.post("/blogs", async (req, res) => {
    const data = req.body;
    const newBlog = new BlogTable({
        title: data.title,
        image: data.image,
        body: data.body,
        added_by : data.owner_name
    });
    await newBlog.save();
    res.redirect("/blogs")
})

app.get("/blogs/new", (req,res)=>{
    res.render("new.ejs");
})

app.listen(8080, ()=>{
    console.log('server started')
})