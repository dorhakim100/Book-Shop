'use strict'

function onInit() {
  render()
}

function render() {
  console.log('works')
  const elTable = document.querySelector('.container')
  var strHTML = `<table class="table">
  <tr>
      <td class="title">Title</td>
      <td class="price">Price</td>
      <td class="actions">Actions</td>
  </tr>`
  const books = getBooks()
  const strHtmls = books.map(
    (book) => `<tr>
    <td class="book-name">'${book.title}'</td>
    <td class="book-price">${book.price}</td>
    <td class="actions-section">
        <button class="btn read">Read</button>
        <button class="btn update" onclick="onUpdateBook(event, '${book.id}')">Update</button>
        <button class="btn delete" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
    </td>
</tr>`
  )
  strHTML += strHtmls.join('') + `</table>`
  elTable.innerHTML = strHTML
}

function onRemoveBook(ev, bookId) {
  ev.stopPropagation()

  removeBook(bookId)
  render()
}

function onUpdateBook(ev, bookId) {
  ev.stopPropagation()

  updatePrice(bookId)
  render()
}
