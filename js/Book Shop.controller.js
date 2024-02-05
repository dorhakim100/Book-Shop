'use strict'

var gFilterBy
var gMsg
var gByName

function onInit() {
  render()
}

function render() {
  const elTable = document.querySelector('.container')
  var strHTML = `<table class="table">
  <tr>
      <td class="title">Title</td>
      <td class="price">Price</td>
      <td class="actions">Actions</td>
  </tr>`
  const books = getBooks(gFilterBy)
  const strHtmls = books.map(
    (book) => `<tr>
    <td class="book-name">'${book.title}'</td>
    <td class="book-price">${book.price}</td>
    <td class="actions-section">
        <button class="btn read">Read</button>
        <button class="btn details" onclick="onDetailsBook(event, '${book.id}')">Details</button>
        <button class="btn update" onclick="onUpdateBook(event, '${book.id}')">Update</button>
        <button class="btn delete" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
    </td>
</tr>`
  )
  strHTML += strHtmls.join('') + `</table>`
  elTable.innerHTML = strHTML
  updateStats()
}

function onRemoveBook(ev, bookId) {
  ev.stopPropagation()

  removeBook(bookId)
  render()
  gMsg = 'Book was removed successfully'
  displayMsg(gMsg)
}
function onUpdateBook(ev, bookId) {
  ev.stopPropagation()

  updatePrice(bookId)
  render()
  gMsg = 'Price was updated successfully'
  displayMsg(gMsg)
}

function onAddBook(ev) {
  ev.preventDefault()
  const elInput = document.querySelector('.new-book input')
  if (elInput.value === '') {
    gMsg = 'Enter a book with valid title'
    displayMsg(gMsg)
    return
  }
  addBook(elInput.value)
  elInput.value = ''
  render()
  gMsg = 'Book was added successfully'
  displayMsg(gMsg)
}

function onDetailsBook(ev, bookId) {
  ev.stopPropagation()
  const elModal = document.querySelector('.book-details')
  const elTxt = elModal.querySelector('h2 span')
  const elPre = elModal.querySelector('pre')
  const elImg = document.querySelector('.img')

  console.log('elImg:', elImg)

  const book = readBook(bookId)
  const bookStr = JSON.stringify(book, null, 4)

  elTxt.innerText = book.title
  elPre.innerText = bookStr
  console.log('book.imgUrl:', book.imgUrl)
  elImg.innerHTML = `<img src="js/Covers/${book.imgUrl}" alt="" height="500"</img>`

  elModal.showModal()
}

function onSetFilterBy(elFilterBy) {
  // console.log('elFilterBy:', elFilterBy.value)
  gFilterBy = elFilterBy.value
  render()
}

function onSearchBook(ev) {
  ev.preventDefault()
  gByName = true
  const elInput = document.querySelector('.search-book')
  gFilterBy = elInput.value
  render()
  elInput.value = ''
}
