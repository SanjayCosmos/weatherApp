const Express = require("express")
const https = require("https")

const app = Express();

const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended:true}))



app.get("/",function(req,res){
    
   res.sendFile(__dirname+"/index.html")
})

app.post("/",function(req,res){

    console.log(req.body)

    const cityName = req.body.city
    
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=8e78e7bd4f79e81d23f6ebf64eeb7172&units=metric"
    // https.get(url,function(response){
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const desc = weatherData.weather[0].description
            res.write("<h1>temperature in "+cityName+" is "+temp+" degree celcius</h1>")
            res.write("<p>Description: "+desc +" </p>")
            res.write("<p>Minimum temperature: "+ weatherData.main.temp_min  +"</p>")
            res.write("<p>Maximum temperature: "+ weatherData.main.temp_max  +"</p>")
            res.write("<p>humidity: "+weatherData.main.humidity +" </p>")
            res.send()
            

        })
        
    })



app.listen(process.env.PORT || 8080,function(){
    console.log("server started at port 8080")
})



// const url = "https://api.openweathermap.org/data/2.5/weather?q=london&appid=8e78e7bd4f79e81d23f6ebf64eeb7172"
//     https.get(url,function(response){
//         response.on("data",function(data){
            
//             const weatherData = JSON.parse(data)
//             const temp = weatherData.main.temp
//             const desc = weatherData.weather[0].description
            
//             res.write("the tempurature in london is "+temp)
//             res.write(desc)
            
//             res.send()