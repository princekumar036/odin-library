
// Book Class: represents a single book
class Book {
    constructor(title, author, pages, status) {
        // Generate unique id for each book
        this.id = Math.random().toString(16).slice(2)
        
        this.title = title
        this.author = author
        this.pages = pages
        this.status = status
    }
}

// UI Class: represents the UI of the app
class UI {

    static showLibrary() {
        const library = Store.getBooks()
        library.forEach(book => UI.addBookToCatalogue(book))
    }

    static addBookToCatalogue(book) {
        let statusHTML = '';
        if(book.status === 'completed') {
            statusHTML = `<div><i class="mdi mdi-check"></i> <span class="change-status">Mark as incomplete</span></div>`
        }
        else if(book.status === 'incomplete') {
            statusHTML = `<div><span class="change-status">Mark as completed</span></div>`
        }

        let bookHTML = `
            <div class="book-card" id="${book.id}">
                <h3>${book.title}</h3>
                <p>Author(s): <em>${book.author}</em></p>
                <p>Page Count: ${book.pages}</p>
                <div>
                    <div class="status ${book.status}">${statusHTML}</div>
                    <div><i class="mdi mdi-delete delete"></i></div>
                </div>
            </div>
        `
        const bookCatalogue = document.querySelector('.book-catalogue')
        bookCatalogue.innerHTML += bookHTML
    }

    static deleteBook(bookCard) {
        bookCard.remove()
    }

    static changeStatus(bookCard) {
        const statusDiv = bookCard.querySelector('.status')
        if(statusDiv.classList.contains('completed')) {
            statusDiv.classList.remove('completed')
            statusDiv.classList.add('incomplete')
            statusDiv.querySelector('i').remove()
            statusDiv.querySelector('span').innerText = 'Mark as complete'
        }
        else if(statusDiv.classList.contains('incomplete')) {
            statusDiv.classList.remove('incomplete')
            statusDiv.classList.add('complete')
            const i = document.createElement('i')
            i.innerHTML = `<i class="mdi mdi-check"></i> `
            statusDiv.querySelector('div').insertBefore(i, statusDiv.querySelector('span'))
            statusDiv.querySelector('span').innerText = 'Mark as incomplete'
        }
    }
}

// Storage Class
class Store {
    static getBooks() {
        let library;
        if(localStorage.getItem('library') === null) {
            library = []
        }
        else {
            library = JSON.parse(localStorage.getItem('library'))
        }
        return library
    }

    static addBook(book) {
        const library = Store.getBooks()
        library.push(book)
        localStorage.setItem('library', JSON.stringify(library))
    }

    static deleteBook(id) {
        const library = Store.getBooks()
        library.forEach((book, index) => {
            if(book.id === id) {
                library.splice(index, 1)
            }
        })

        localStorage.setItem('library', JSON.stringify(library))
    }

    static changeStatus(id) {
        const library = Store.getBooks()
        library.forEach((book) => {
            if(book.id === id) {
                book.status = book.status === 'completed' ? 'incomplete' : 'completed'
            }
        })

        localStorage.setItem('library', JSON.stringify(library))
    }
}

// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.showLibrary)

// Event: Add a Book
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    // Get Book data from Form
    let bookData = new FormData(document.forms.addBook)

    // Instantiate new Book
    let title = bookData.get('title')
    let author = bookData.get('author')
    let pages = bookData.get('pages')
    let status = bookData.get('status') === 'on' ? 'completed' : 'incomplete'
    const newBook = new Book(title, author, pages, status)

    // Add Book to Catalogue
    UI.addBookToCatalogue(newBook)
    Store.addBook(newBook)

    // Clear Form fields
    document.querySelector('form').reset()
})

// Event: Delete a Book
document.querySelector('.book-catalogue').addEventListener('click', (e) => {
    if(e.target.classList.contains('delete')) {
        const bookCard = e.target.parentElement.parentElement.parentElement
        const id = bookCard.getAttribute('id')

        UI.deleteBook(bookCard)
        Store.deleteBook(id)
    }
})

// Event: Change book status
document.querySelector('.book-catalogue').addEventListener('click', (e) => {
    if(e.target.classList.contains('change-status')) {
        const bookCard = e.target.parentElement.parentElement.parentElement.parentElement
        const id = bookCard.getAttribute('id')
        UI.changeStatus(bookCard)
        Store.changeStatus(id)
    }
})