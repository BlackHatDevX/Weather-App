const express=require("express");
const app = express();
const bodyParser=require("body-parser")
https=require("https");
app.use(bodyParser.urlencoded({extended:true}))


// --------------------GET---------------------
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){
    // const main = req.body
    var cityName = req.body.city


    // ---------------------Making get request to api--------------------------------

    const url ="https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=b3a1cd2134e9f28c43beacab95ea8a1a&units=metric"
    https.get(url,function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            var weatherData=JSON.parse(data)
            var temp = weatherData.main.temp
            var desc = weatherData.weather[0].main
            var cityNameF = weatherData.name
            res.write("<h1>Weather in " + cityNameF +"</h1>")
            res.write("<h2>Sky Status : "+ desc +"</h2>")
            res.write("<h3>Temperature is " + temp + " deg Celcius.</h3>")
            res.write("<a href='/'>Change location</a>")
            res.send()
            console.log(cityNameF);
        })
    })

})





app.listen(process.env.PORT || 4000,function(){
    console.log("Server is now live at port 4000");
})




