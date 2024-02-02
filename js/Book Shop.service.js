'use strict'

const gBooks = [
  {
    id: makeId(),
    title: 'The Adventures',
    price: 120,
    imgUrl: 'The Adventures.jpg',
  },
  { id: makeId(), title: 'World', price: 100, imgUrl: 'World.jpg' },
  { id: makeId(), title: 'Zorba', price: 90, imgUrl: 'Zorba.jpg' },
]

function getBooks() {
  return gBooks
}

function removeBook(bookId) {
  const idx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.splice(idx, 1)
}

function updatePrice(bookId) {
  const newPrice = +prompt(`What's the new price?`)
  gBooks.map((book) => {
    if (book.id === bookId) book.price = newPrice
  })
}

function addBook(txt) {
  const newBook = _createBook(txt)
  console.log('newBook.price:', newBook.price)
  gBooks.unshift(newBook)
  return newBook
}

function _createBook(txt) {
  return {
    id: makeId(),
    title: txt,
    price: +prompt(`What's the new price?`),
  }
}

function readBook(bookId) {
  const book = gBooks.find((book) => book.id === bookId)
  return book
}
