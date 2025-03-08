document.addEventListener('DOMContentLoaded', function() {
    const addBookBtn = document.getElementById('add-book-btn');
    const bookList = document.getElementById('book-list');
    const bookCount = document.getElementById('book-count');
    
    // Sample initial books
    const initialBooks = [
        {
            id: 1,
            title: "10X Engineer",
            author: "Richmond Gakpetor",
            description: "The story of a software engineer who can do the work of 10 engineers. A must-read for all software developers."
        },
    ];
    
    // Load books from localStorage or use initial books
    let books = JSON.parse(localStorage.getItem('books')) || initialBooks;
    
    // Render initial books
    renderBooks();
    

    addBookBtn.addEventListener('click', addBook);
    
    // Add a new book
    function addBook() {
        const title = prompt("Enter book title:");
        if (!title) return;
        
        const author = prompt("Enter book author:");
        if (!author) return;
        
        const description = prompt("Enter book description:");
        if (!description) return;
        
        const newBook = {
            id: Date.now(),
            title,
            author,
            description
        };
        
        books.push(newBook);
        saveBooks();
        renderBooks();
    }
    
    // Save books to localStorage
    function saveBooks() {
        localStorage.setItem('books', JSON.stringify(books));
    }
    
    // Render books
    function renderBooks() {
        bookCount.textContent = `Books (${books.length})`;
        
        if (books.length === 0) {
            bookList.innerHTML = `
                <div class="empty-message">
                    No books in your list. Add one to get started!
                </div>
            `;
            return;
        }
        
        bookList.innerHTML = '';
        
        books.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card';
            
            bookCard.innerHTML = `
                <h3>${book.title}</h3>
                <p class="author">by ${book.author}</p>
                <div class="description">
                    <p>${book.description}</p>
                </div>
            `;
            
            bookList.appendChild(bookCard);
        });
    }
});