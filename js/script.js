
//function for toggle mobile


//function for drop down selection

//Button to retrieve request
let searchButton = document.querySelector("#search")
searchButton.addEventListener("click", ()=>{
    sendData()
})
//function for input value
async function sendData() {
    let MY_ID = config.MY_KEY;
    let secretKey = config.SECRET_KEY;
    
    let searchOutput = document.getElementById("searchBox").value;
    let response = await fetch(`https://api.edamam.com/search?app_id=${secretKey}&app_key=${MY_ID}&q=${searchOutput}&from=0&to=15`);
    console.log(response)
    let data = await response.json()
    console.log(data)
    getApiData(data)   
}

function getCard(cardData) {
    return  `
    <div class="card" style="width: 18rem;">
        <img src="${cardData.recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${cardData.recipe.label}</h5>
            <p class="card-text">Calories: ${cardData.recipe.calories}</p><p>Health Label: ${cardData.recipe.healthLabels}</p>
            <a href="${cardData.recipe.url}" class="btn btn-primary">Visit Website</a>
        </div>
    </div>
    `;
}


//function to return API ID result in a section
function getApiData(data){
    let markup = data.hits.map(getCard).join('');
    // getCard(data.hits[5]);
    document.querySelector("#content").innerHTML = markup;
    var hits= "";
        console.log("count",hits.length);
        var imgCount = hits.length;
        document.getElementById("imgCount").innerHTML = imgCount;
       
        for (i in hits) {
            $('.imgCount').append(`<img id='img' src='${hits[i].length}'>`)}

}

//Function for error message 



