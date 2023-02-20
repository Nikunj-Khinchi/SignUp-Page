const express = require("express");
// const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
// const { post } = require("request");


// const request = require("request");

const app  = express();


// // for static pages this is method of use static pages
// app.use('*/css',express.static('public/css'));
// app.use('*/js',express.static('public/js'));
// app.use('*/images',express.static('public/images'));

// use bodyparser for html access and get the value 
// app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true})); 

app.use( "*/css", express.static("public/css"));
app.use( "*/image", express.static("public/Image"));

app.get("/" , function(req , res){
    // res.send("Server is on ")
    res.sendFile(__dirname + "/signup.html");
})

app.post("/" , function(req , res){

    const firstName = req.body.Fname;
    const lastName = req.body.Lname;
    const email = req.body.Email;

    // console.log(firstName + "\n"+ lastName  + "\n"+ email);

    const data ={
         members:[
         {
            email_address: email,
            status: "subscribed",
            merge_fields : {
                FNAME : firstName,
                LNAME : lastName,
            }
         }
        ]
    };

    const jsonData = JSON.stringify(data);


    const url = "https://us18.api.mailchimp.com/3.0/lists/ca5dc3e2e9";

    const options ={
        method : "POST",
        auth: "Nikunj:ba842855650fa26a263cf165926af38e-us18"
    }

   const request =  https.request(url , options , function(response){

        if (response.statusCode == 200){
            res.sendFile(__dirname + "/success.html");
        } else{
            res.sendFile(__dirname + "/failure.html")
        }



            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
    })

    //  now we post data using https  before we get data so here we have another method for it 

    request.write(jsonData);
    request.end();

})

app.post("/failure" , function(req , res){
    res.redirect("/");
})



app.listen(process.env.PORT  || 2509, function(req , res){
    console.log("Server is running on port 2509")
})


// https://usX.api.mailchimp.com/3.0/lists/{list_id}?fields=name 

// API KEY

// ba842855650fa26a263cf165926af38e-us18


// List ID

// ca5dc3e2e9