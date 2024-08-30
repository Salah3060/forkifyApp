class SearchView {
  #parentEle = document.querySelector('.search');

  getQuery() {
    const query = this.#parentEle.querySelector('.search__field').value;
    this.#clearinput();
    return query;
  }
  #clearinput() {
    this.#parentEle.querySelector('.search__field').value = '';
  }
  addHandlerRender(handler) {
    this.#parentEle.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new SearchView();
