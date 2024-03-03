const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
const dotenv = require('dotenv');

dotenv.config();
const port = process.env.PORT

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static(__dirname + "/public/"));

app.get("/",function(request,response){
    response.sendFile(__dirname+ "/signup.html");
})

app.post("/",function(request,res){
    const firstName = request.body.fName;
    const lastName = request.body.lName;
    const email = request.body.email;
   
    const data ={
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields :{
                    FNAME : firstName,
                    LNAME : lastName,
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = process.env.URL; 
    const options = {
        method : "POST",
        auth : process.env.AUTH


    }

    const req = https.request(url,options,function(response){
        if(response.statusCode===200){
            res.sendFile(__dirname + "/success.html");
            
        } else{
            res.sendFile(__dirname + "/failure.html");
        }
        

        response.on("data",function(data){
            console.log(JSON.parse(data));
           

        })
        

    })
    req.write(jsonData);
    req.end();

    //  post data

})
app.post("/failure",function(req,res){
    res.redirect("/");
})



app.listen(process.env.PORT||9000,function(){
    console.log(`Server is running on port ${port}`);
})

