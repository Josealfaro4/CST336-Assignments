const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //imgs, css, js
const request = require("request");

app.get("/", async function(req, res){
    let parsedData = await getImages("cars", "v"); 
    res.render("index", {"image": parsedData.hits[0].largeImageURL});
});

app.get("/results", async function(req, res) {
    let keyword = req.query.keyword; //gets the val the user typed in form
    let orientation = req.query.orientation;
    let parsedData = await getImages(keyword, orientation); 
    res.render("results", {"images": parsedData});

});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express Server is running...");
});


//returns all data from pixabay api in json format 
function getImages(keyword, orientation){
    return new Promise(function(resolve, reject){
        if(orientation == 'v'){
            request(`https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=${keyword}&orientation=vertical`, function(error, response, body){
               if(!error && response.statusCode == 200){
                    let parsedData = JSON.parse(body); //converts string to json
                    resolve(parsedData);
               }else{
                   reject(error);
                   console.log(response.statusCode);
                   console.log(error);
                   
               }
            });
        }
        else{
            request(`https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q=${keyword}&orientation=horizontal`, function(error, response, body){
                if(!error && response.statusCode == 200){
                    let parsedData = JSON.parse(body); //converts string to json
                    resolve(parsedData);
               }else{
                   reject(error);
                   console.log(response.statusCode);
                   console.log(error);
                   
               }
            });
        }
    });
}