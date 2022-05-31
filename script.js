
let library = []

// Book constructor
function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

// Add book to lib array
function addToLibrary(title, author, pages, status) {
    let newBook = new Book(title, author, pages, status)
    library.push(newBook)
}

// Add book to library on form submit
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
    e.preventDefault()

    // Get form data
    let formData = new FormData(document.forms.addBook)
    let status = formData.get('status') === 'on' ? true : false

    // Add book to library
    console.log(formData.get('title'), formData.get('author'), formData.get('pages'), status)
    addToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), status)

    // Reset form
    form.reset()

    showLibrary()
})

function showLibrary() {
    document.querySelector('.book-catalogue').innerHTML = ''
    library.forEach(book => {

        let statusHTML = ''
        if (book.status === 'null') {
            statusHTML = `<i class="mdi mdi-check"></i><span data-attribute="${library.indexOf(book)}"> Mark as not read</span>`
        }
        else {
            statusHTML = `<span data-attribute="${library.indexOf(book)}"> Mark as read</span>`
        }

        let bookHTML = `
            <div class="book-card">
                <h3>${book.title}</h3>
                <p>Author(s): <em>${book.author}</em></p>
                <p>Page Count: ${book.pages}</p>
                <div>
                    <div class="status">${statusHTML}</div>
                    <div class="delete" data-attribute="${library.indexOf(book)}"><i class="mdi mdi-delete"></i></div>
                </div>
            </div>`
        
        document.querySelector('.book-catalogue').innerHTML += bookHTML
    })
}

addToLibrary('Alice in the Wonderland', 'Lewis Caroll', '150', true)
addToLibrary('The Lord of the Rings', 'JRR Tolkein', '800', false)
showLibrary()


// Delete a book
const deleteBtns = document.querySelectorAll('.delete')
deleteBtns.forEach(deleteBtn => {
    deleteBtn.addEventListener('click', (e) => {
        bookIndex = e.target.parentElement.getAttribute('data-attribute')
        library.splice(bookIndex, 1)
        console.log(library)
        showLibrary()
    })
})

// document.querySelector('.status span').addEventListener('click', (e) => {
//     console.log(e)
// })