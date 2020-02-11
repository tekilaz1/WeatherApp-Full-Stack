class TempManager {
    constructor() {
        this.cityData = []
    }

   async getDataFromDB() {
      let data = await $.get('/cities')
      this.cityData = data
       data.forEach(d => {
           d.isSaved = true
       })
      return data
        
    }   

    async getCityData(cityName) {
        try {
            let x = await $.get(`/city/${cityName}`)
            let objcityData = {
                name: x.name,
                temperature: Math.round(((x.main.temp) - 260) * (0.5)),
                condition: x.weather[0].main,
                conditionPic: `http://openweathermap.org/img/wn/${x.weather[0].icon}@2x.png`,
                humidity: x.main.humidity,
                isSaved: false
            }

            this.cityData.push(objcityData)
            // console.log(this.cityData)
            return objcityData
     
        } catch{
            alert("the city name is incorrect")
        }
    }

     saveCity(cityName) {
        const cityToSave = this.cityData.find(c => c.name === cityName)
    //   const  cityIndex1 = this.cityData.indexOf(this.cityData.find(c => c.name === cityName))
          $.post(`/city`, cityToSave) 
                 
        this.cityData.find(c => c.name == cityName).isSaved = true
    }



    async removeCity(cityName) {
        let cityIndex = this.cityData.indexOf(this.cityData.find(c => c.name == cityName))
        this.cityData.splice(cityIndex, 1)
        await $.ajax({
            url: `/city/${cityName}`,
            method: "DELETE",
            success: function  (response) {

                console.log(response)
            },
            error: function (xhr, text, error) {
                console.log(error + text)
            }
        })
        // this.cityData.find(c => c.name == cityName).isSaved = false
    }

    async updateCity(cityName) {
        $.ajax({
            url: `/city/${cityName}`,
            method: "PUT",
            success: function (request, response) {
                let updatedCity = {
                    name: request.name,
                    temperature: (request.main.temp),
                    condition: request.weather[0].main,
                    conditionPic: `http://openweathermap.org/img/wn/${request.weather[0].icon}@2x.png`,
                    humidity: x.main.humidity,
                    isSaved: true
                }
                console.log(tempManager.cityData)
                console.log(updatedCity)

            },
            error: function (xhr, text, error) {
                console.log(error + text)
            }

        })
    }
}

// const tempManager = new TempManager()