'use strict'

var gBooks = [
  {
    id: makeId(),
    title: 'The Adventures',
    price: 120,
    imgUrl: 'The Adventures.jpg',
  },
  { id: makeId(), title: 'World', price: 100, imgUrl: 'World.jpg' },
  { id: makeId(), title: 'Zorba', price: 90, imgUrl: 'Zorba.jpg' },
]
_createBooks()

function getBooks(filterBy) {
  if (!filterBy) return gBooks
  var booksOrder = []
  var sorted = []
  switch (filterBy) {
    case 'title-A-Z':
      booksOrder = gBooks.reduce((acc, book) => {
        acc.push(book.title)
        return acc
      }, [])
      booksOrder.sort()
      sorted = gBooks.reduce((acc, book, idx) => {
        const currBook = gBooks.find((book) => book.title === booksOrder[idx])
        acc.push(currBook)
        return acc
      }, [])
      break
    case 'title-Z-A':
      booksOrder = gBooks.reduce((acc, book) => {
        acc.push(book.title)
        return acc
      }, [])
      booksOrder.sort().reverse()
      sorted = gBooks.reduce((acc, book, idx) => {
        const currBook = gBooks.find((book) => book.title === booksOrder[idx])
        acc.push(currBook)
        return acc
      }, [])
      break
    case 'price-High-Low':
      booksOrder = gBooks.reduce((acc, book) => {
        acc.push(book.price)
        return acc
      }, [])
      booksOrder.sort().reverse()
      sorted = gBooks.reduce((acc, book, idx) => {
        const currBook = gBooks.find((book) => book.price === booksOrder[idx])
        acc.push(currBook)
        return acc
      }, [])
      break
    case 'price-Low-High':
      booksOrder = gBooks.reduce((acc, book) => {
        acc.push(book.price)
        return acc
      }, [])
      booksOrder.sort()
      sorted = gBooks.reduce((acc, book, idx) => {
        const currBook = gBooks.find((book) => book.price === booksOrder[idx])
        acc.push(currBook)
        return acc
      }, [])
      break
  }
  return sorted
}

function removeBook(bookId) {
  const idx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.splice(idx, 1)

  _saveBooks()
}

function updatePrice(bookId) {
  const newPrice = +prompt(`What's the new price?`)
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
      },
      { id: makeId(), title: 'World', price: 100, imgUrl: 'World.jpg' },
      { id: makeId(), title: 'Zorba', price: 90, imgUrl: 'Zorba.jpg' },
    ]
    _saveBooks()
  }
}
