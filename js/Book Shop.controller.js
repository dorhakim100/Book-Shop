'use strict'

var gFilterBy
var gMsg
var gByName

function onInit() {
  render()
  loopBooksRate(gBooks)
  loopBooksIsRead(gBooks)
}

function render() {
  const elTable = document.querySelector('.container')
  var strHTML = `<div class="table-container">
  <table class="table">
  <tr>
      <td class="title">Title</td>
      <td class="price">Price</td>
      <td class="actions">Actions</td>
  </tr>`
  const books = getBooks(gFilterBy)
  if (books.length === 0) {
    strHTML += `
  <tr>
      <td class="no-books-msg" colspan="3">No matching books were found...</td>
  </tr>`
    strHTML += `</table>`
    strHTML += `</div>`
    // strHTML += `<div class="msg-no-books">No matching books were found...</div>`
    elTable.innerHTML = strHTML
  } else {
    const strHtmls = books.map(
      (book) => `<tr>
      <td id="${book.id}" class="book-name">'${book.title}'</td>
      <td class="book-price">${book.price}</td>
      <td class="actions-section">
      <rater class="rater-container">
<button class="btn" onclick="onRaterClick(event, this, ${book.id})">➖</button>
<span class="rating ${book.id}-rating">${book.rating}</span>
<button class="btn" onclick="onRaterClick(event, this, ${book.id})">✚</button>
</rater>
<div class="read-container">
<button class="btn read" onclick="onReadBook(event, '${book.id}', this)">Read</button>
</div>
<div class="details-container">
<button class="btn details" onclick="onDetailsBook(event, '${book.id}')">Details</button>
</div>
<div class="update-container">
<button class="btn update" onclick="onUpdateBook(event, '${book.id}')">Update</button>
</div>
<div  class="delete-container">
<button class="btn delete" onclick="onRemoveBook(event, '${book.id}')">Delete</button>
</div>
      </td>
      </tr>`
    )
    strHTML += strHtmls.join('') + `</table>`
    strHTML += `</div>`
    elTable.innerHTML = strHTML
    updateStats()
  }
  loopBooksRate(gBooks)
  loopBooksIsRead(gBooks)
}

function onReadBook(ev, bookId) {
  ev.stopPropagation()
  const books = getBooks()
  const book = books.find((book) => book.id === bookId)
  if (book.isRead === true) book.isRead = false
  else if (book.isRead === false) book.isRead = true
  // book.isRead = !book.isRead
  console.log('book.isRead:', book.isRead)
  const elBook = document.getElementById(bookId)
  elBook.classList.toggle('was-read')
  colorReadBook(bookId)
  _saveBooks()
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

function onRaterClick(ev, elBtn, bookId) {
  ev.preventDefault()
  const id = bookId.id
  const elRating = document.querySelector(`.${id}-rating`)
  const book = gBooks.find((book) => book.id === id)

  switch (elBtn.innerText) {
    case '➖':
      if (book.rating === 0) return
      book.rating--
      if (book.rating <= 2) elRating.style.color = 'red'
      if (book.rating === 3) elRating.style.color = 'black'
      break
    case '✚':
      if (book.rating === 5) return
      book.rating++
      if (book.rating === 3) elRating.style.color = 'black'
      if (book.rating >= 4) elRating.style.color = 'green'
      break
  }
  elRating.innerText = book.rating
  _saveBooks()
}
