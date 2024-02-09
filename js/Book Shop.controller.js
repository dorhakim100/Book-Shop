'use strict'

// gQueryOptions.filterBy.txt

// var gQueryOptions.filterBy.txt = ''
var gMsg
var gByName
var gByRating
var isFilter
var isSort
var isAll
var titleInnerText = 'Title'
var priceInnerText = 'Price'

var gQueryOptions = {
  filterBy: { minRating: 0, txt: '' },
  sortBy: '',
  page: { index: 0, size: 4 },
}
var pagesSize = gQueryOptions.page.size

function onInit() {
  render()
  loopBooksRate(gBooks)
  loopBooksIsRead(gBooks)
}

function render(sortedBooks) {
  const elTable = document.querySelector('.container')
  var strHTML = `<div class="table-container">
  <table class="table">
  <tr>
      <td class="title" onclick="onTitleClick(this)">${titleInnerText}</td>
      <td class="price" onclick="onPriceClick(this)">${priceInnerText}</td>
      <td class="actions">Actions</td>
  </tr>`
  var books
  if (sortedBooks) books = sortedBooks
  else books = getBooks(gQueryOptions)
  console.log('books:', books)
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
  // loopBooksRate(gBooks)
  // loopBooksIsRead(gBooks)
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
  elImg.innerHTML = `<img src="js/Covers/${book.imgUrl}" onerror="this.src='js/Covers/book-cover.jpg'" alt="" height="500"</img>`

  elModal.showModal()
}

function onSetFilterBy(elFilterBy) {
  isFilter = true
  isAll = false
  console.log('isFilter:', isFilter)
  console.log('elFilterBy:', elFilterBy)
  // console.log('works')

  gQueryOptions.page.index = 0

  gQueryOptions.filterBy.minRating = elFilterBy.minRating
  getBookCount()
  render()
}

function onSortBy(elSortBy) {
  // isSort = true
  gQueryOptions.page.index = 0

  gQueryOptions.sortBy = elSortBy.value
  if (gQueryOptions.sortBy === 'All') {
    isAll = true
    render()
    return
  }

  sortBooks(gQueryOptions.sortBy)
  // render()
}

function onClearFilter() {
  gQueryOptions.filterBy.minRating = 0
  gQueryOptions.filterBy.txt = ''
  const elInput = document.querySelector('.search-book')
  elInput.value = ''
  render()
}

function onSearchBook(ev) {
  console.log('works')
  ev.preventDefault()
  isFilter = true
  const elInput = document.querySelector('.search-book')

  const elLastSearch = document.querySelector('.last-search')
  console.log('elLastSearch:', elLastSearch)
  elLastSearch.innerText = 'Last search:'
  elLastSearch.innerText += ' ' + elInput.value

  gQueryOptions.filterBy.txt = elInput.value
  console.log('gFilterBy:', gQueryOptions.filterBy.txt)
  gByName = true
  render()
  elInput.value = ''
}

// function onSearchTyping(ev) {
//   // console.log('works')
//   const elInput = document.querySelector('.search-book')
//   const currKey = ev.key
//   gFilterBy += currKey
//   console.log('gFilterBy:', gFilterBy)
//   onSearchBook()
// }

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

function getBookCount() {
  const bookCount = getBooks(gQueryOptions).length
  return bookCount
}

function onPrePage() {
  var prePage = getPrePageBooks(gQueryOptions)
  const elPageNumber = document.querySelector('.page-number')
  const bookCount = gBooks.length
  const filtered = filterBooks(gQueryOptions)
  const filteredCount = filtered.length
  if (prePage.length === 0) {
    gQueryOptions.page.index = Math.floor(
      filteredCount / gQueryOptions.page.size
    )
    if (filteredCount % gQueryOptions.page.size === 0)
      gQueryOptions.page.index--
    console.log('idx:', gQueryOptions.page.index)
    elPageNumber.innerText = `Page: ${gQueryOptions.page.index + 1}`
    render()
    return
  }
  if (gQueryOptions.page.index === 0) {
    gQueryOptions.page.index =
      Math.floor(filteredCount / gQueryOptions.page.size) - 1
    elPageNumber.innerText = `Page: ${gQueryOptions.page.index + 1}`
  } else {
    gQueryOptions.page.index--
    elPageNumber.innerText = `Page: ${gQueryOptions.page.index + 1}`
  }
  render()
}

function onNextPage() {
  var nextPage = getNextPageBooks(gQueryOptions)
  const elPageNumber = document.querySelector('.page-number')
  if (nextPage.length === 0) {
    gQueryOptions.page.index = 0
    elPageNumber.innerText = `Page: ${gQueryOptions.page.index + 1}`
    render()
    return
  }
  const gBookCount = gBooks.length

  if (gBookCount > (gQueryOptions.page.index + 1) * gQueryOptions.page.size) {
    gQueryOptions.page.index++
    elPageNumber.innerText = `Page: ${gQueryOptions.page.index + 1}`
  } else {
    gQueryOptions.page.index = 0
    elPageNumber.innerText = `Page: ${gQueryOptions.page.index + 1}`
  }
  var shownBooks = getBooks(gQueryOptions)

  render()
}

function showBooks(options) {
  if (options.page) {
    const startIdx = options.page.index * options.page.size
    var filtered = getBooks(gQueryOptions)
    filtered = filtered.slice(startIdx, startIdx + options.page.size)
    // console.log('filtered:', filtered)
  }
}

function onTitleClick(elTitle) {
  console.log('elTitle:', elTitle)
  const text = elTitle.innerText
  var sortBy
  switch (text) {
    case 'Title':
      sortBy = 'title-A-Z'
      titleInnerText = 'Title ⬇'
      break
    case 'Title ⬇':
      sortBy = 'title-Z-A'
      titleInnerText = 'Title ⬆'
      break
    case 'Title ⬆':
      sortBy = 'title-A-Z'
      titleInnerText = 'Title ⬇'
      break
  }
  priceInnerText = 'Price'
  sortBooks(sortBy)
}

function onPriceClick(elPrice) {
  var sortBy
  const text = elPrice.innerText
  switch (text) {
    case 'Price':
      sortBy = 'price-Low-High'
      priceInnerText = 'Price ⬆'
      break
    case 'Price ⬇':
      sortBy = 'price-Low-High'
      priceInnerText = 'Price ⬆'
      break
    case 'Price ⬆':
      sortBy = 'price-High-Low'
      priceInnerText = 'Price ⬇'
      break
  }
  titleInnerText = 'Title'
  sortBooks(sortBy)
}

function onSetSortBy() {
  const elSortBy = document.querySelector('.sort-by select')
  const elDir = document.querySelector('.sort-desc-div input')
  var sortBy = elSortBy.value
  const dir = elDir.checked ? -1 : 1

  switch (sortBy) {
    case 'price-High-Low':
      if (dir === -1) {
        sortBy = 'price-Low-High'
      }
      break
    case 'price-Low-High':
      if (dir === -1) {
        sortBy = 'price-High-Low'
      }
      break
    case 'title-A-Z':
      if (dir === -1) {
        sortBy = 'title-Z-A'
      }
      break
    case 'title-Z-A':
      if (dir === -1) {
        sortBy = 'title-A-Z'
      }
      break
  }
  sortBooks(sortBy)
}
