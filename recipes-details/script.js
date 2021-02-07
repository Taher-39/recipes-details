// search recipes handler
document.getElementById('searchBtn').addEventListener('click', function () {
    const searchResult = document.getElementById('searchMeal').value;
    if(searchResult === ""){
        document.getElementById('mealItem').style.display = none;
        document.getElementById('ingredientInfo').style.display = none;
    }
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchResult}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            mealResult(data);
        });
});

function mealResult(data) {
    const mealItem = document.getElementById('mealItem');
    document.getElementById('mealItem').innerHTML = '';
    document.getElementById('ingredientInfo').innerHTML = '';
    for (let i = 0; i < data.meals.length; i++) {
        const element = data.meals[i];
        const divItem = document.createElement('div');
        divItem.className = 'allItem'
        const itms = `
            <div onclick="(detailsInfo('${element.idMeal}'))" class = "meal-and-name">
                <img src="${element.strMealThumb}">
                <p>${element.strMeal}</p>
            </div>
        `;
        divItem.innerHTML = itms;
        mealItem.appendChild(divItem)
    }
}

// meal details
const detailsInfo = id => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => mealIngredients(data.meals[0]))
}

const mealIngredients = element => {
    const ingredientInfo = document.getElementById('ingredientInfo');
    ingredientInfo.innerHTML = `
        <img src="${element.strMealThumb}">
        <div class="meal-info">
            <h3>${element.strMeal}</h3>
            <h5>Ingredients</h5>
            <p>✔ <span>${element.strMeasure1}</span> <span>${element.strIngredient1}</span></p>
            <p>✔ <span>${element.strMeasure2}</span> <span>${element.strIngredient2}</span></p>
            <p>✔ <span>${element.strMeasure3}</span> <span>${element.strIngredient3}</span></p>
            <p>✔ <span>${element.strMeasure4}</span> <span>${element.strIngredient4}</span></p>
            <p>✔ <span>${element.strMeasure5}</span> <span>${element.strIngredient5}</span></p>
            <p>✔ <span>${element.strMeasure6}</span> <span>${element.strIngredient6}</span></p>
        </div>
    `;
}