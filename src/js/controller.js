import icons from '../img/icons.svg';
import * as model from '../js/model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';

//pf
import 'regenerator-runtime/runtime';
import 'core-js/stable/array';

const controllRecipe = async function () {
  const id = window.location.hash.slice(1);

  console.log('welcome');
  if (!id) return;

  try {
    recipeView.renderSpinner();

    await model.loadRecipe(id);

    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controllSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    // render data
    // resultsView.render(model.state.search.results);

    resultsView.render(model.getSearchResultPage());

    controllPagination();
  } catch (err) {
    resultsView.renderError();
  }
};

const controllPagination = function (page) {
  resultsView.render(model.getSearchResultPage(page));

  paginationView.render(model.state.search);
};
const constrollSurvings = function (newSurevings) {
  model.updateServings(newSurevings);

  recipeView.update(model.state.recipe);
};

const controllAddRecipeView = function (data) {
  console.log(data);
};

const init = function () {
  recipeView.addHandlerRender(controllRecipe);
  recipeView.addHandlerUpdateServings(constrollSurvings);
  searchView.addHandlerRender(controllSearchResults);
  paginationView.addHandlerClick(controllPagination);
  addRecipeView.addHandlerSumbitForm(controllAddRecipeView);
};
init();
