import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
const __dirname = dirname(fileURLToPath(import.meta.url));

let app = express();
let port =3000;
let post_count=0;
let post_content=[];
let headings=[];

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.render(__dirname+"/views/index.ejs",{post_count:post_count,headings:headings});
})

app.post("/newpost",(req,res)=>{
    res.render(__dirname+"/views/create_post.ejs");
})

app.post("/create_new_post",(req,res)=>{
    post_content[post_count]=req.body["content"];
    headings[post_count]=req.body["heading"];
    post_count++;
    res.render(__dirname+"/views/index.ejs",
        {blogcreated:"yes",post_count:post_count,headings:headings}
    );
})

app.post("/action_on_post",(req,res)=>{
    if(req.body["action"].slice(0,4)=="post"){
        res.render(__dirname+"/views/view_post.ejs",
        {display_content:post_content[Number(req.body['action'].slice(4))-1]})
    }
    else if(req.body["action"].slice(0,4)=="edit"){
        res.render(__dirname+"/views/edit_post.ejs",
            {display_content:post_content[Number(req.body['action'].slice(4))-1],
                i:Number(req.body['action'].slice(4))
            }
        )
    }
})


app.post("/edit_post",(req,res)=>{
    post_content[Number(req.body["action"].slice(4))-1]=req.body["edited_content"];
    res.render(__dirname+"/views/index.ejs",
        {blogedited:"yes",post_count:post_count,headings:headings}
    );
})


app.listen(port,(req,res)=>{
    console.log("Server is running on port "+port);
})