// 1- création d'une const qui contient notre api key :
const API_KEY = "ea3a54e6a34c40a9a38604ba80284aad";
// 4- aller chercher l'id ou on veux afficher
const recipeListEl = document.getElementById("recipe-list");

//--------------------------
// 5- faire la function d'affichage
function displayRecipes(recipes) {
    // on fait une chaine vide , On fait ça pour nettoyer l'affichage précédent avant d’ajouter les nouvelles recettes
    recipeListEl.innerHTML = "";

    recipes.forEach((recipe) => {
        // parcourir chaque élément** du tableau `recipes` avec forEach
        const recipeItemEl = document.createElement("li");
        // on veut créer des li  qui ont une classe recipe-item
        recipeItemEl.classList.add("recipe-item");
        // on veut créer une img qu'elle a une source et alt
        const recipeImageEl = document.createElement("img");
        recipeImageEl.src = recipe.image;

        recipeImageEl.alt = `Image de ${recipe.title}`;
        // créer le titre de la recette
        const recipeTitleEl = document.createElement("h2");
        recipeTitleEl.innerText = recipe.title;
        // faire les ingredients
        const recipeIngredientsEl = document.createElement("p");
        recipeIngredientsEl.innerHTML = `<strong>Ingrédients :</strong> ${recipe.extendedIngredients
            .map((ingredient) => ingredient.original)
            .join(", ")}`;
        // faire le lien
        recipeLinkEl = document.createElement("a");
        recipeLinkEl.href = recipe.sourceUrl;
        recipeLinkEl.innerText = "View Recipe";

        recipeItemEl.appendChild(recipeImageEl);
        recipeItemEl.appendChild(recipeTitleEl);
        recipeItemEl.appendChild(recipeIngredientsEl);
        recipeItemEl.appendChild(recipeLinkEl);

        recipeListEl.appendChild(recipeItemEl);
    });
}

// ----------------

// 2- cette function va chercher l'info dans l'API
async function getRecipes() {
    const response = await fetch(
        // le lien qui contient les infos recherché
        `https://api.spoonacular.com/recipes/random?number=10&apiKey=${API_KEY}`
    );
    // creation de fetch data , convertir to json
    const data = await response.json();
    return data.recipes;
}

// 3- faire une function pour initialiser la page
async function init() {
    const recipes = await getRecipes();
    displayRecipes(recipes);
}
init();

// Paramètres API modifiables :
// number=10 ->>> Le nombre de recettes à retourner (entre 1 et 100).
// tags=pasta,dessert -->> Limite les recettes à certains types (séparés par des virgules).
// apiKey=... --->> Ta clé API personnelle (obligatoire
