'use strict'

var gModalInput

var gBooks = [
  {
    id: makeId(),
    title: 'The Adventures',
    price: 120,
    imgUrl: 'The Adventures.jpg',
    rating: getRandomIntInclusive(1, 5),
    isRead: false,
  },
  {
    id: makeId(),
    title: 'World',
    price: 100,
    imgUrl: 'World.jpg',
    rating: getRandomIntInclusive(1, 5),
    isRead: false,
  },
  {
    id: makeId(),
    title: 'Zorba',
    price: 90,
    imgUrl: 'Zorba.jpg',
    rating: getRandomIntInclusive(1, 5),
    isRead: false,
  },
]
_createBooks()

function getBooks(options) {
  var filtered
  // console.log('options.page:', options.page)
  if (isAll) {
    filtered = gBooks

    if (options.page) {
      const startIdx = options.page.index * options.page.size
      filtered = filtered.slice(startIdx, startIdx + options.page.size)
      // console.log('filtered:', filtered)
    }

    return filtered
  }

  if (isFilter) {
    filtered = filterBooks(options)

    if (options.page) {
      const startIdx = options.page.index * options.page.size
      filtered = filtered.slice(startIdx, startIdx + options.page.size)
      // console.log('filtered:', filtered)
    }

    return filtered
  }

  filtered = gBooks
  if (options.page) {
    const startIdx = options.page.index * options.page.size
    filtered = filtered.slice(startIdx, startIdx + options.page.size)
    // console.log('filtered:', filtered)
  }

  return filtered
}

function getNextPageBooks(options) {
  var filtered = filterBooks(options)

  if (options.page) {
    const startIdx = (options.page.index + 1) * options.page.size
    filtered = filtered.slice(startIdx, startIdx + options.page.size)
    // console.log('filtered:', filtered)
  }

  return filtered
}
function getPrePageBooks(options) {
  var filtered = filterBooks(options)

  if (options.page) {
    const startIdx = (options.page.index - 1) * options.page.size
    filtered = filtered.slice(startIdx, startIdx + options.page.size)
    // console.log('filtered:', filtered)
  }

  return filtered
}

function filterBooks(options) {
  const filtered = gBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(options.filterBy.txt.toLowerCase()) &&
      book.rating >= options.filterBy.minRating
  )

  !isFilter

  return filtered
}

function sortBooks(sortBy) {
  // const sortedBooks = filterBooks(gQueryOptions)
  const filtered = filterBooks(gQueryOptions)
  // console.log('sortBy:', sortBy)
  switch (sortBy) {
    case 'All':
      render(filtered)
      return sortedBooks

      break
    case 'title-A-Z':
      filtered.sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) return -1
        if (a.title.toUpperCase() > b.title.toUpperCase()) return 1
        return 0
      })

      break
    case 'title-Z-A':
      filtered.sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) return -1
        if (a.title.toUpperCase() > b.title.toUpperCase()) return 1
        return 0
      })
      filtered.reverse()

      break
    case 'price-High-Low':
      filtered.sort((a, b) => {
        return a.price - b.price
      })
      filtered.reverse()

      break
    case 'price-Low-High':
      filtered.sort((a, b) => {
        return a.price - b.price
      })

      break
  }

  const startIdx = gQueryOptions.page.index * gQueryOptions.page.size
  const sortedBooks = filtered.slice(
    startIdx,
    startIdx + gQueryOptions.page.size
  )
  console.log('sortedBooks:', sortedBooks)
  console.log('filtered:', filtered)
  gBooks = filtered
  render(sortedBooks)
  return filtered
}

function removeBook(bookId) {
  const idx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.splice(idx, 1)

  _saveBooks()
}

function updatePrice(bookId) {
  const newPrice = +prompt(`What's the new price?`)
  // openModal()
  // const newPrice = onModalEnter()
  gBooks.map((book) => {
    if (book.id === bookId) book.price = newPrice
  })

  _saveBooks()
}

function addBook(txt) {
  const newBook = _createBook(txt)
  console.log('newBook.price:', newBook.price)
  gBooks.unshift(newBook)
  _saveBooks()
  return newBook
}

function _createBook(txt) {
  return {
    id: makeId(),
    title: txt,
    price: +prompt(`What's the new price?`),
    imgUrl: `${txt}.jpg`,
    rating: getRandomIntInclusive(1, 5),
    isRead: false,
  }
}

function readBook(bookId) {
  const book = gBooks.find((book) => book.id === bookId)
  return book
}

function _saveBooks() {
  saveToStorage('books', gBooks)
}

function _createBooks() {
  gBooks = loadFromStorage('books')
  if (!gBooks || gBooks.length === 0) {
    gBooks = [
      {
        id: makeId(),
        title: 'The Adventures',
        price: 120,
        imgUrl: 'The Adventures.jpg',
        rating: getRandomIntInclusive(1, 5),
        isRead: false,
      },
      {
        id: makeId(),
        title: 'World',
        price: 100,
        imgUrl: 'World.jpg',
        rating: getRandomIntInclusive(1, 5),
        isRead: false,
      },
      {
        id: makeId(),
        title: 'Zorba',
        price: 90,
        imgUrl: 'Zorba.jpg',
        rating: getRandomIntInclusive(1, 5),
        isRead: false,
      },
    ]
    _saveBooks()
  }
}

function displayMsg(msg) {
  const elMsg = document.querySelector('.msg-box')
  elMsg.innerText = msg
  // elMsg.classList.remove('hidden')
  // setTimeout(() => elMsg.classList.add('hidden'), 1500)
  elMsg.style.opacity = '1'
  setTimeout(() => (elMsg.style.opacity = '0'), 1500)
}

function updateStats() {
  const elExpensive = document.querySelector('.expensive-books')
  var expensiveCounter = 0
  const elAverage = document.querySelector('.average-books')
  var averageCounter = 0
  const elCheap = document.querySelector('.cheap-books')
  var cheapCounter = 0

  gBooks.forEach((book) => {
    if (book.price > 200) expensiveCounter++
    if (book.price <= 200 && book.price >= 80) averageCounter++
    if (book.price < 80) cheapCounter++
  })
  elExpensive.innerText = expensiveCounter
  elAverage.innerText = averageCounter
  elCheap.innerText = cheapCounter
}

function rateBookColor(bookId) {
  const books = filterBooks(gQueryOptions)
  const elRating = document.querySelector(`.${bookId}-rating`)
  const book = books.find((book) => book.id === bookId)
  if (book.rating <= 2) elRating.style.color = 'red'
  if (book.rating === 3) elRating.style.color = 'black'
  if (book.rating >= 4) elRating.style.color = 'green'
}

function loopBooksRate(books) {
  books.forEach((book) => {
    rateBookColor(book.id)
  })
}

function colorReadBook(bookId) {
  const elBookTitle = document.getElementById(bookId)
  const book = gBooks.find((book) => book.id === bookId)
  if (book.isRead) elBookTitle.style.color = '#00A170'
  if (!book.isRead) elBookTitle.style.color = 'black'
}

function loopBooksIsRead(books) {
  const readBooks = books.filter((book) => book.isRead === true)
  readBooks.forEach((book) => {
    colorReadBook(book.id)
  })
}

function openModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.opacity = '1'
}

function closeModal() {
  const elModal = document.querySelector('.modal')
  elModal.style.opacity = '0'
}

function onModalEnter(ev) {
  ev.preventDefault()
  const elInput = document.querySelector('.modal-input input')
  gModalInput = elInput.value
  console.log('input:', gModalInput)
  elInput.value = ''
}
