import icons from '../../img/icons.svg';
import View from './view.js';

class PaginationView extends View {
  _parentEle = document.querySelector('.pagination');
  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.recipePerPage
    );
    // first page and there is other pages
    if (this._data.currentPage === 1 && numPages === 1) {
      return '';
    }

    //
    if (this._data.currentPage === 1) {
      return this._generateMarkupNextBtn();
    }
    // in between
    if (this._data.currentPage > 1 && this._data.currentPage < numPages) {
      return this._generateMarkupNextBtn() + this._generateMarkupPreBtn();
    }
    if (this._data.currentPage === numPages) {
      return this._generateMarkupPreBtn();
    }
  }
  _generateMarkupPreBtn() {
    return `
        <button  data-goto=${
          +this._data.currentPage - 1
        } class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${+this._data.currentPage - 1}</span>
          </button>
    `;
  }
  _generateMarkupNextBtn() {
    return `
        <button data-goto=${
          this._data.currentPage + 1
        } class="btn--inline pagination__btn--next">
            <span>Page ${+this._data.currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button>
    `;
  }
  addHandlerClick(handler) {
    this._parentEle.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      handler(+btn.dataset.goto);
    });
  }
}
export default new PaginationView();
