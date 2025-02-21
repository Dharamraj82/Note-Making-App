const express = require('express')
const app = express();
const path = require('path')
const fs = require('fs');
const { log } = require('console');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))

app.get("/", (req, res)=>{
    fs.readdir(`./files`, (err, files)=>{
        // console.log(files) // read file
    res.render("index", {files: files})
    })
})

// app.get("/files/:filename", (req, res)=>{
//     fs.readFile(`/files/${req.params.filename}`, "utf-8", function(err, filedata){
//         res.render('tasks', {filename:req.params.filename, filedata: filedata})
//         console.log(filedata);
        
//     })
// })

app.get("/files/:filename", (req, res) => {
const filePath = path.join(__dirname, "files", req.params.filename);
        fs.readFile(filePath, "utf-8", (err, filedata) => {
        res.render("tasks", { filename: req.params.filename, filedata: filedata });
    });
});

app.get("/delete/:filename", (req, res)=>{
const filePath = path.join(__dirname, "files", req.params.filename);
    fs.unlink(filePath, (err) => {
     res.redirect("/")
      });
 })

 app.get("/edit/:filename", (req, res)=>{
    const filePath = path.join(__dirname, "files", req.params.filename);
        fs.readFile(filePath, "utf-8", (err, filedata) => {
            res.render("edit", { filename: req.params.filename, filedata: filedata });
    });
});

app.post("/create", (req, res)=>{
    // console.log(req.body);
 fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.details, function(err){
     res.redirect("/")
 })
 })
 app.post("/edit", (req, res)=>{
    const oldPath = path.join(__dirname, "files", req.body.previous);
    const newPath = path.join(__dirname, "files", req.body.new.split(' ').join('') + ".txt");

    fs.rename(oldPath, newPath, (err) => {
        
        fs.writeFile(newPath, req.body.new_details, (err) => {
          
            res.redirect("/");
        });
 })
 })
app.listen(3000)