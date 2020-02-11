const express = require("express")
const moment = require("moment")
const City = require('../model/city')
const router = express.Router()
const request = require("request")




router.get("/city/:cityName", function (req, res) {
    const cityName = req.params.cityName
    request.get(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=cfb84a90721440161bd21ceab28d28b8`, function (error, response, body) {
        let data = JSON.parse(body)
        res.send(data)

    })
})

router.get("/cities", async function (req, res) {
    const cities = await City.find({})
    res.send(cities)

})


    
router.post("/city", function(req, res){
    const newCity = new City(req.body)
    console.log(req.body)
    console.log(newCity)
      newCity.isSaved = false
      newCity.save(function(city) {
res.send(newCity)
      })

    // City.findOne({name: newCity.name}, function(error, success){
    //     if (success){
    //         return
    //     } else {
    //         newCity.isSaved = false
    //         newCity.save()
            
    //     }
    //     res.send(newCity)
    // })
    
})

    




    router.delete("/city/:cityName", async function(req, res){
        const cityName = req.params.cityName
        let success = await City.deleteOne({name: cityName})
        res.end()
            
    })
    router.delete("/delete", async function(req, res){
        await City.delete({})
        res.end()
    })
  









module.exports = router
