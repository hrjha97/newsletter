const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

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
    const url ="https://us13.api.mailchimp.com/3.0/lists/786613c223"; 
    const options = {
        method : "POST",
        auth : "Harsh:eb18494d3222df8db669aba217ac04f6-us13"


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



app.listen(process.env.PORT||3000,function(){
    console.log("Server is running on port 3000");
})

// Api Key
// eb18494d3222df8db669aba217ac04f6-us13

// list id
// 786613c223.