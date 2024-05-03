document.addEventListener('DOMContentLoaded', function () {
    // La încărcarea paginii, încarcă cărțile din backend
    fetchBooks();

    // Adaugă un eveniment de ascultare pentru trimiterea formularului
    document.getElementById('add-book-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Previne acțiunea implicită de trimitere a formularului
        addBook(); // Apelează funcția addBook pentru a trimite cererea POST către server
    });

    // Adaugă un eveniment de ascultare pentru butonul "See All Books"
    document.getElementById('see-all-books').addEventListener('click', function () {
        showAllBooks(); // Apelează funcția fetchAllBooks pentru a obține toate cărțile
    });

    // Adaugă un eveniment de ascultare pentru butonul "Find Book by ID"
    document.getElementById('find-book-button').addEventListener('click', function () {
        const bookId = document.getElementById('find-book-id').value;
        findBookById(bookId); // Apelează funcția findBookById pentru a găsi cartea cu ID-ul specificat
    });

    // Adaugă un eveniment de ascultare pentru butonul "Delete Book"
    document.getElementById('delete-book-button').addEventListener('click', function () {
        const bookId = document.getElementById('delete-book-id').value;
        deleteBook(bookId); // Apelează funcția deleteBook pentru a șterge cartea cu ID-ul specificat
    });
});

function fetchBooks() {
    // Trimite o cerere GET către endpoint-ul API pentru a obține cărțile
    fetch('https://localhost:7253/api/Crud')
        .then(response => response.json()) // Converteste raspunsul la JSON
        .then(data => {
            // Manipulează datele obținute
            if (data.length === 0) {
                // Dacă nu există cărți, afișăm un mesaj
                const bookList = document.getElementById('book-list');
                bookList.innerHTML = "<p>No books found.</p>";
            } else {
                displayBooks(data); // Afișează cărțile în interfața utilizatorului
            }
        })
        .catch(error => console.error('Error fetching books:', error));
}
function displayBooks(books) {
    const bookList = document.getElementById('book-list');
    bookList.innerHTML = ''; // Curăță lista de cărți existente

    // Adăugăm doar prima carte în lista vizibilă
    const firstBook = createBookElement(books[0]);
    bookList.appendChild(firstBook);

    // Restul cărților vor fi ascunse
    for (let i = 1; i < books.length; i++) {
        const book = books[i];
        const bookItem = createBookElement(book);
        bookItem.classList.add('hidden');
        bookList.appendChild(bookItem);
    }
}

function createBookElement(book) {
    const listItem = document.createElement('div');
    listItem.classList.add('book-item');
    listItem.innerHTML = `
        <h2>${book.title}</h2>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre}</p>
        <p><strong>Price:</strong> ${book.price}</p>
        <p><strong>Published Date:</strong> ${book.publishedDate}</p>
    `;
    return listItem;
}

function showAllBooks() {
    const bookItems = document.querySelectorAll('.book-item.hidden');

    // Iterăm prin cărțile ascunse și le afișăm cu o tranziție elegantă
    bookItems.forEach((bookItem, index) => {
        setTimeout(() => {
            bookItem.classList.remove('hidden');
            bookItem.classList.add('fadeIn'); // Adăugăm o clasă pentru a aplica animația fadeIn
        }, (index + 1) * 200); // Așteptăm un interval de timp între afișarea fiecărei cărți
    });
}
// Funcție pentru a adăuga o carte
function addBook() {
    const book = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        genre: document.getElementById('genre').value,
        price: parseFloat(document.getElementById('price').value),
        publishedDate: document.getElementById('published-date').value
    };

    // Trimite o cerere POST către endpoint-ul API pentru a adăuga o carte
    fetch('https://localhost:7253/api/Crud', {
        method: 'POST', // Specifică metoda HTTP ca POST
        headers: {
            'Content-Type': 'application/json' // Specifică tipul conținutului ca JSON
        },
        body: JSON.stringify(book) // Converteste obiectul "book" în format JSON
    })
        .then(response => response.json())
        .then(() => {
            fetchBooks(); // Reîncarcă lista de cărți după ce a fost adăugată o nouă carte
        })
        .catch(error => console.error('Error adding book:', error));
}

// Functie pentru actualizarea unei carti
function updateBook(bookId, updatedBook) {
    fetch(`https://localhost:7253/api/Crud/${bookId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedBook)
    })
        .then(response => {
            if (response.ok) {
                console.log(`Book with ID ${bookId} updated successfully.`);
                fetchBooks(); // Reîncarcă lista de cărți după actualizare
            } else {
                console.error(`Error updating book with ID ${bookId}.`);
            }
        })
        .catch(error => console.error('Error updating book:', error));
}

// Functie pentru a gasi o carte dupa ID
function findBookById(bookId) {
    fetch(`https://localhost:7253/api/Crud/${bookId}`)
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = ''; // Curățăm lista de cărți existente

            if (data) {
                console.log('Book found:', data);
                const foundBook = document.createElement('div');
                foundBook.classList.add('book-item', 'fadeIn'); // Adăugăm clasele și animația
                foundBook.innerHTML = `
                    <h2>${data.title}</h2>
                    <p><strong>Author:</strong> ${data.author}</p>
                    <p><strong>Genre:</strong> ${data.genre}</p>
                    <p><strong>Price:</strong> ${data.price}</p>
                    <p><strong>Published Date:</strong> ${data.publishedDate}</p>
                `;
                bookList.appendChild(foundBook);
            } else {
                // Dacă nu există cartea, afișăm un mesaj de eroare
                bookList.innerHTML = "<p>Book not found.</p>";
            }
        })
        .catch(error => console.error('Error finding book:', error));
}

// Functie pentru a sterge o carte dupa ID
function deleteBook(bookId) {
    fetch(`https://localhost:7253/api/Crud/${bookId}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (response.ok) {
                console.log(`Book with ID ${bookId} deleted successfully.`);
                fetchBooks(); // Reîncarcă lista de cărți după ștergere
            } else {
                console.error(`Error deleting book with ID ${bookId}.`);
            }
        })
        .catch(error => console.error('Error deleting book:', error));
}
