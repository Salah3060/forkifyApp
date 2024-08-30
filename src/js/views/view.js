import icons from '../../img/icons.svg';

export default class View {
  render(data) {
    this._data = data;
    if (!data || (Array.isArray(data) && data.length === 0)) throw Error();
    const markup = this._generateMarkup();
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(errorMsg = this._errorMsg) {
    const markup = `
        <div class="error">
            <div>
              <svg>
                <use href="${icons}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${errorMsg}</p>
        </div>
    `;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentEle.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
    });
  }
  _clear() {
    this._parentEle.innerHTML = '';
  }
  renderSpinner() {
    const spinner = `
          <div class="spinner">
            <svg>
              <use href="${icons}#icon-loader"></use>
            </svg>
          </div>
      `;
    this._clear();
    this._parentEle.insertAdjacentHTML('afterbegin', spinner);
  }
}
