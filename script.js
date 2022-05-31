
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


// Open form
document.querySelector('.book-add').addEventListener('click', () => {
    document.querySelector('div.form').classList.remove('hidden')
})
// Hide form when clicked outside it
document.querySelector('div.form').onclick = (e) => {
    if (e.target == document.querySelector('div.form')) { 
        document.querySelector('div.form').classList.add('hidden')
    }
}

// Add book to library on form submit
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    // Get form data
    let formData = new FormData(document.querySelector('form'))
    let status = formData.get('status') === 'on' ? true : false

    // Add book to library
    addToLibrary(formData.get('title'), formData.get('author'), formData.get('pages'), status)

    // Hide the form and show library
    document.querySelector('.form').classList.toggle('hidden')
    showLibrary()
})






// addToLibrary('Alice in the Wonderland', 'Lewis Caroll', '150', true)
// addToLibrary('The Lord of the Rings', 'JRR Tolkein', '800', false)

function showLibrary() {
    library.forEach(book => {
        let bookHTML = `
            <div class="book-card">
                <p class="book-title"><strong>${book.title}</strong></p>
                <p class="book-author"><em>${book.author}</em></p>
                <p class="book-pages">Page count: ${book.pages}</p>
                <div>${book.status ? '<p class="book-status">\
                                        <i class="mdi mdi-check"></i>\
                                        <span class="status-change">Mark as incomplete</span>\
                                        </p>' : '\
                                        <p class="book-status">\
                                        <i class="mdi mdi-close"></i>\
                                        <span class="status-change">Mark as complete</span>\
                                        </p>'}
                    <p><i class="mdi mdi-trash-can delete"></i></p>
                </div>
            </div>`
        document.querySelector('.book-catalogue').innerHTML += bookHTML
    })
}





// showLibrary()