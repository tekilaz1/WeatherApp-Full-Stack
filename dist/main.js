const tempManager = new TempManager()
// const renderer = new Renderer()

const loadPage = async function () {
    let citiesFromDB = await tempManager.getDataFromDB()
    renderer._rendererData(citiesFromDB)
    // console.log(citiesFromDB)
}

$(document).ready(loadPage());



const handleSearch = async function () {
    let requiredCity = $("#city-search").val()
    if (requiredCity) {
        await tempManager.getCityData( requiredCity )
        renderer._rendererData(tempManager.cityData)
    }
    $("#city-search").val("")

}

$(".container").on("keypress", "#city-search", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault()
        $(".search").click()
    }
})

$(".container").on("click keypress", ".search", function () {
    handleSearch()
})
// const save = async function(name){
//     let city =await tempManager.saveCity(name)
//     renderer._rendererData(tempManager.cityData)

// }

// const del = async function(){
//      await  tempManager.removeCity(cityName)
//       renderer._rendererData(tempManager.cityData)
// }



$(".container_for_city").on("click", "#save", async function () {
    const cityName = $(this).parent().find("#city-name").text()
     await tempManager.saveCity(cityName)
    
    renderer._rendererData(tempManager.cityData)
})



$(".container_for_city").on("click", "#delete",  function () {
    let removeThisCity = $(this).closest("div").find("h1").text()
     tempManager.removeCity(removeThisCity)
    $(".container_for_city").empty()
    renderer._rendererData(tempManager.cityData)
})

// $(".container").on('click', "#refresh", async function () {
//     let updateCity = $(this).closest("div").find("h1").text()
//     let updateThisCity = await tempManager.updateCity(updateCity)
//     // $(".container_for_city").empty()
//     renderer._rendererData(tempManager.cityData)
// })
