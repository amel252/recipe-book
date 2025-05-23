const API_KEY = "1ec45f9fec5948a59bf1e9cc69bd1fb4";
// cette function va chercher l'info dans l'API
async function getRecipes() {
    const response = await fetch(
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );
    const data = await response.json();

    return data.recipes();
}

//faire une function pour initialiser la page
async function init() {
    const recipes = await getRecipes();
    console.log(recipes);
}
init();
