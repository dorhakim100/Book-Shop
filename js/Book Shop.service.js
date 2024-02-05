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
  if (gByName) {
    gBooks.find((book) => {
      if (book.title.toUpperCase() === filterBy.toUpperCase()) {
        console.log(book.title)
        sorted.push(book)
      }
    })
    gByName = false
    return sorted
  }
  // gBooks.find((book) => {
  //   if (book.title.toUpperCase() !== filterBy.toUpperCase()) {
  //     console.log('works')
  //   }
  // })

  switch (filterBy) {
    case 'title-A-Z':
      gBooks.sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) return -1
        if (a.title.toUpperCase() > b.title.toUpperCase()) return 1
        return 0
      })

      // booksOrder = gBooks.reduce((acc, book) => {
      //   acc.push(book.title.toUpperCase())
      //   return acc
      // }, [])
      // booksOrder.sort()
      // sorted = gBooks.reduce((acc, book, idx) => {
      //   const currBook = gBooks.find(
      //     (book) => book.title.toUpperCase() === booksOrder[idx]
      //   )
      //   acc.push(currBook)
      //   return acc
      // }, [])
      break
    case 'title-Z-A':
      gBooks.sort((a, b) => {
        if (a.title.toUpperCase() < b.title.toUpperCase()) return -1
        if (a.title.toUpperCase() > b.title.toUpperCase()) return 1
        return 0
      })
      gBooks.reverse()
      // booksOrder = gBooks.reduce((acc, book) => {
      //   acc.push(book.title.toUpperCase())
      //   return acc
      // }, [])
      // booksOrder.sort().reverse()
      // sorted = gBooks.reduce((acc, book, idx) => {
      //   const currBook = gBooks.find(
      //     (book) => book.title.toUpperCase() === booksOrder[idx]
      //   )
      //   acc.push(currBook)
      //   return acc
      // }, [])
      break
    case 'price-High-Low':
      gBooks.sort((a, b) => {
        return a.price - b.price
      })
      gBooks.reverse()
      // booksOrder = gBooks.reduce((acc, book) => {
      //   acc.push(book.price)
      //   return acc
      // }, [])
      // booksOrder.sort().reverse()
      // sorted = gBooks.reduce((acc, book, idx) => {
      //   const currBook = gBooks.find((book) => book.price === booksOrder[idx])
      //   acc.push(currBook)
      //   return acc
      // }, [])
      break
    case 'price-Low-High':
      gBooks.sort((a, b) => {
        return a.price - b.price
      })
      // booksOrder = gBooks.reduce((acc, book) => {
      //   acc.push(book.price)
      //   return acc
      // }, [])
      // booksOrder.sort()
      // sorted = gBooks.reduce((acc, book, idx) => {
      //   const currBook = gBooks.find((book) => book.price === booksOrder[idx])
      //   acc.push(currBook)
      //   return acc
      // }, [])
      break
  }
  // return sorted
  return gBooks
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
