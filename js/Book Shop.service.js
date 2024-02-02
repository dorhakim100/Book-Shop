'use strict'

const gBooks = [
  { id: makeId(), title: 'The Adventures', price: 120, imgUrl: 'jibrish.jpg' },
  { id: makeId(), title: 'World', price: 100, imgUrl: 'jibrish.jpg' },
  { id: makeId(), title: 'Zorba', price: 90, imgUrl: 'jibrish.jpg' },
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
  console.log('bookId:', bookId)
  // const idx = gBooks.findIndex((book) => book.id === bookId)
  gBooks.map((book) => {
    if (book.id === bookId) book.price = newPrice
  })
}
