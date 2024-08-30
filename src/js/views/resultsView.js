import icons from '../../img/icons.svg';
import View from './view.js';

class ResultsView extends View {
  _parentEle = document.querySelector('.results');
  _errorMsg = 'No recipes found , please try again 💣💣💣 ';

  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join(' ');
  }
  _generateMarkupPreview(pre) {
    return `
        <li class="preview">
            <a class="preview__link " href="#${pre.id}">
              <figure class="preview__fig">
                <img src=${pre.image} alt=${pre.title} />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${pre.title}</h4>
                <p class="preview__publisher">${pre.publisher}</p>
                <div class="preview__user-generated">
                  <svg>
                    <use href="src/img/icons.svg#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>
    `;
  }
}

export default new ResultsView();
