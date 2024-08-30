import { API_URL, REC_PER_PAGE } from './config';
import { getJSON } from './helper.js';

export const state = {
  recipe: {},
  search: {
    results: [],
    query: '',
    recipePerPage: REC_PER_PAGE,
    currentPage: 1,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);
    const { recipe } = data.data;
    state.recipe = {
      image: recipe.image_url,
      publisher: recipe.publisher,
      cookingTime: recipe.cooking_time,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      ingredients: recipe.ingredients,
      servings: recipe.servings,
    };
  } catch (err) {
    throw err;
  }
};

export const loadSearchResults = async function (query) {
  try {
    this.state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    this.state.search.results = data.data.recipes.map(recipe => {
      return {
        publisher: recipe.publisher,
        image: recipe.image_url,
        title: recipe.title,
        id: recipe.id,
      };
    });
  } catch (err) {
    throw err;
  }
};

export const getSearchResultPage = function (page = state.search.currentPage) {
  state.search.currentPage = page;
  const start = (page - 1) * state.search.recipePerPage;
  const end = page * state.search.recipePerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });

  state.recipe.servings = newServings;
  console.log(newServings);
};
