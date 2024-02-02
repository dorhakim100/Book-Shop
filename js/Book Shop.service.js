'use strict'

const gBooks = [
  { id: makeId(), title: 'The Adventures', price: 120, imgUrl: 'jibrish.jpg' },
  { id: makeId(), title: 'World', price: 100, imgUrl: 'jibrish.jpg' },
  { id: makeId(), title: 'Zorba', price: 90, imgUrl: 'jibrish.jpg' },
]

function getBooks() {
  return gBooks
}
