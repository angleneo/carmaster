/*
  * 为页面改变Title
  */
export default {
  name: 'title',
  inserted: function (el, binding) {
    document.title = el.dataset.title
  }
}
