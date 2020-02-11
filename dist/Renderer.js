class Renderer{

     _rendererData(allCityData){
        //  console.log(allCityData)
        const source = $("#new-city-template").html()
        const template = Handlebars.compile(source)
        const newHTML = template({allCityData})
        $(".container_for_city").empty().append(newHTML)
    }

}









 const renderer = new Renderer()


