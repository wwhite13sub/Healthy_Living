

//Button to retrieve request
let input = document.querySelector('input');
let searchButton = document.querySelector("#search");

searchButton.addEventListener("click", ()=>{
    sendData()
})
input.addEventListener('keyup', () => {
    if(input.value.length > 0) {searchButton.removeAttribute('disabled');
    }else {
        searchButton.setAttribute('disabled', 'disabled') 
    }
});

//function for input value
function sendData() {
    let MY_ID = '423bfc7b9770465e0f3a11b2f470b29e';
    let secretKey = '9b3d82cc';    
    let searchOutput = document.getElementById("searchBox").value;    
    fetch(`https://api.edamam.com/search?app_id=${secretKey}&app_key=${MY_ID}&q=${searchOutput}&from=0&to=25`)
        .then( response => response.json() )
        .then( getApiData )
        .catch( errorMessage );
        
}




function getCard(cardData) {
    let totalCalorie = (cardData.recipe.calories)/(cardData.recipe.yield);
    return  `
    <div class="card" style="width: 16rem;">
        <img src="${cardData.recipe.image}" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${cardData.recipe.label}</h5>
            <p class="card-text">Calories: ${Math.round(totalCalorie)}</p><p>Ingredients:  ${cardData.recipe.ingredients.length}</p>
            <a href="${cardData.recipe.url}" target="_blank" class="btn btn-primary">Visit Website</a>
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

  