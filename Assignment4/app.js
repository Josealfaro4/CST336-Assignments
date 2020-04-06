const express = require("express");
const app = express();

var knockknock = require('knock-knock-jokes'); // additional node package used. It displays a joke in the console


app.engine('html', require('ejs').renderFile);
app.use(express.static("public"));

app.get("/", function(req, res){
    res.render("index.html");
    console.log(knockknock());
});

app.get("/contents", function(req, res){
    res.render("contents.html");
    console.log(knockknock());

});

app.get("/facts", function(req, res){
    res.render("facts.html");
    console.log(knockknock());
});

app.get("/variants", function(req, res){
    res.render("variants.html");
    console.log(knockknock());
});

app.get("*", function(req,res){
    res.send("Page not found");
});

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express Server is running..."); 
});