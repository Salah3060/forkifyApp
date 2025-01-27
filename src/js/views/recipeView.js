import icons from '../../img/icons.svg';
import View from './view.js';
import Friction from 'fractional';

class RecipeViews extends View {
  _data;
  _parentEle = document.querySelector('.recipe');
  _errorMsg = 'could not find the recipe , please try another one ! ';

  _generateMarkup(recipe = this._data) {
    return `
    <figure class="recipe__fig">
          <img src=${recipe.image} alt=${recipe.title} class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipe.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipe.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="${icons}#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people"></span>
            <span class="recipe__info-text">${recipe.servings} servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--update-servings" data-updateTo=${
                +recipe.servings - 1
              }>
                <svg>
                  <use href="${icons}#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--update-servings" data-updateTo=${
                +recipe.servings + 1
              }>
                <svg>
                  <use href="${icons}#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="${icons}#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
          ${this._generateMarkupIngredients(recipe)}
          </ul>
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipe.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href=${recipe.sourceUrl}
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </a>
        </div>
  `;
  }

  _generateMarkupIngredients(recipe = this._data) {
    return recipe.ingredients
      .map(ingredient => {
        return `<li class="recipe__ingredient">
      <svg class="recipe__icon">
        <use href="${icons}#icon-check"></use>
      </svg>
      <div class="recipe__quantity">${
        ingredient.quantity
          ? new Friction.Fraction(ingredient.quantity).toString()
          : ''
      }</div>
      <div class="recipe__description">
        <span class="recipe__unit">${
          ingredient.unit ? ingredient.unit : ' '
        }</span>
        ${ingredient.description}
      </div>
    </li>
  `;
      })
      .join('\n');
  }

  addHandlerRender(handler, controllUpdateSercings) {
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
  addHandlerUpdateServings(handler) {
    console.log('heelo');
    console.log(this._parentEle);
    this._parentEle.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--update-servings');
      console.log(btn);
      if (!btn) return;
      const updateTo = btn.dataset.updateto;
      console.log(updateTo);
      if (+updateTo > 0) handler(+updateTo);
    });
  }
}

export default new RecipeViews();
