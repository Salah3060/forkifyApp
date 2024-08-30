import View from './view';

class AddRecipeView extends View {
  _parentEle = document.querySelector('.add-recipe-window');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _window = this._parentEle;
  _overlay = document.querySelector('.overlay');
  _form = document.querySelector('.upload');

  constructor() {
    super();
    this._addHandlertoggleWindow();
  }
  _toggleWindow() {
    this._window.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }
  _addHandlertoggleWindow() {
    this._btnOpen.addEventListener('click', this._toggleWindow.bind(this));
    this._btnClose.addEventListener('click', this._toggleWindow.bind(this));
  }
  addHandlerSumbitForm(handler) {
    this._form.addEventListener('submit', function (e) {
      e.preventDefault();
      const data = Object.fromEntries([...new FormData(this)]);
      handler(data);
    });
  }
}

export default new AddRecipeView();
