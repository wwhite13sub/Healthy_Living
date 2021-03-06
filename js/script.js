
//Button to retrieve request
let searchButton = document.querySelector("#search")
searchButton.addEventListener("click", ()=>{
    sendData()
})
//function for input value
function sendData() {
    let MY_ID = config.MY_KEY;
    let secretKey = config.SECRET_KEY;
    
    let searchOutput = document.getElementById("searchBox").value;
    
    fetch(`https://api.edamam.com/search?app_id=${secretKey}&app_key=${MY_ID}&q=${searchOutput}&from=0&to=25`)
        .then( response => response.json() )
        .then( getApiData )
        .catch( errorMessage );
        
}




function getCard(cardData) {
    return  `
    <div class="card" style="width: 18rem;">
        <img src="${cardData.recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${cardData.recipe.label}</h5>
            <p class="card-text">Calories: ${Math.round(cardData.recipe.calories)}</p><p>Number of Ingredients:  ${cardData.recipe.ingredients.length}</p>
            <a href="${cardData.recipe.url}" class="btn btn-primary">Visit Website</a>
        </div>
    </div>
    `;
   
}


//function to return API ID result in a section
function getApiData(data){
    if (data.hits.count === 0) {
        errorMessage();
        return;
    }
    let markup = data.hits.map(getCard).join('');
    document.querySelector("#content").innerHTML = markup;   
    console.log("count",data.hits.length);
    var imgCount = data.hits.length;
    document.getElementById("imgCount").innerHTML = imgCount;    
    console.log(data)
}
   

//Function for error message 
function errorMessage() {
    document.querySelector("#content").innerHTML = `
      <div class="error">
        <h1><strong>No recipes found please search again.</strong><h1>
      </div>
    `;
  }

  