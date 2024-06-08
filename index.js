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

app.use(express.static("public"));

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
        {display_content:post_content[Number(req.body['action'].slice(4))],
            heading:headings[Number(req.body['action'].slice(4))]
        })
    }
    else if(req.body["action"].slice(0,4)=="edit"){
        res.render(__dirname+"/views/edit_post.ejs",
            {display_content:post_content[Number(req.body['action'].slice(4))],
                i:Number(req.body['action'].slice(4)),
                heading:headings[Number(req.body['action'].slice(4))]
            }
        )
    }
    else{
        let idx = Number(req.body["action"].slice(3));
        post_count--;
        for(let i=idx ; i<headings.length-1 ; i++){
            headings[idx]=headings[idx+1];
            post_content[idx]=post_content[idx+1];
        }
        res.redirect("/");
    }
})


app.post("/edit_post",(req,res)=>{
    post_content[Number(req.body["action"].slice(4))]=req.body["edited_content"];
    res.render(__dirname+"/views/index.ejs",
        {blogedited:"yes",post_count:post_count,headings:headings}
    );
})


app.post("/header",(req,res)=>{
    if(req.body["header_action"]=="home"){
        res.redirect("/");
    }else if(req.body["header_action"]=="project_des"){
        res.render(__dirname+"/views/project_des.ejs");
    }else{
        res.redirect("https://github.com/aahil-khan/");
    }
})



app.listen(port,(req,res)=>{
    console.log("Server is running on port "+port);
})

