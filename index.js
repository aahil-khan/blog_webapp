import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

let app = express();
let port =3000;
let post_count=0;
let post_content=[];

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render(__dirname+"/views/index.ejs",{post_count:post_count});
})

app.post("/newpost",(req,res)=>{
    res.render(__dirname+"/views/create_post.ejs");
})

app.post("/create_new_post",(req,res)=>{
    post_content[post_count]=req.body["content"];
    post_count++;
    res.render(__dirname+"/views/index.ejs",
        {blogcreated:"yes",post_count:post_count,heading:req.body["heading"]}
    );
    console.log(req.body);
})

app.post("/view_post",(req,res)=>{
    console.log(req.body);
    res.render(__dirname+"/views/view_post.ejs",
        {display_content:post_content[Number(req.body['action'].slice(4))-1]})

})


app.listen(port,(req,res)=>{
    console.log("Server is running on port "+port);
})