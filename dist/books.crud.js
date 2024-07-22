var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { CardTemplateController } from "./controllers/cards.controller.js";
import { BooksController } from "./controllers/books.controller.js";
const URL_BOOKS = 'http://190.147.64.47:5155'; // url base de la API.
const btnLogout = document.querySelector("#btn-logout");
const prevPage = document.querySelector("#prev-page");
const nextPage = document.querySelector("#next-page");
const token = localStorage.getItem("authToken"); // obtenemos el token almacenado en local storage una vez el usuario inició sesión.
let currentPage = 1;
const limit = 10;
btnLogout.addEventListener("click", (event) => {
    localStorage.removeItem('authToken');
    window.location.href = "index.html"; // redirige al usuario a la página de inicio de sesión.
});
if (!token) {
    alert("authentication token is missing. Plase, log in.");
    window.location.href = "index.html";
}
else {
    const containerBooks = document.querySelector(".container-books");
    const form = document.querySelector("form");
    const title = document.querySelector("#title");
    const author = document.querySelector("#author");
    const description = document.querySelector("#description");
    const summary = document.querySelector("#summary");
    const publicationDate = document.querySelector("#publication-date");
    let idCatche;
    const cardTemplate = new CardTemplateController(containerBooks); // se instancia la clase 'CardTemplateController'.
    prevPage.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage--; // es igual al currentPage = currentPage - 1.
            yield allBooks(limit, currentPage);
        }
    }));
    nextPage.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        if (currentPage >= 1) {
            currentPage++; // es igual al currentPage = currentPage + 1.
            yield allBooks(limit, currentPage);
        }
    }));
    form.addEventListener("submit", (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const crudBooks = new BooksController(URL_BOOKS);
        if (idCatche === undefined) {
            yield crudBooks.createBook(title, author, description, summary, publicationDate, token);
        }
        else {
            yield crudBooks.updateBook(idCatche, title, author, description, summary, publicationDate, token);
            idCatche = undefined;
        }
        form.reset();
        yield allBooks(limit, currentPage);
    }));
    containerBooks.addEventListener("click", (event) => __awaiter(void 0, void 0, void 0, function* () {
        if (event.target instanceof HTMLButtonElement) {
            const crudBooks = new BooksController(URL_BOOKS);
            if (event.target.classList.contains("btn-warning")) {
                idCatche = event.target.dataset.id;
                if (idCatche) {
                    const book = yield crudBooks.getBookById(idCatche, token);
                    title.value = book.data.title;
                    author.value = book.data.author;
                    description.value = book.data.description;
                    summary.value = book.data.summary;
                    publicationDate.value = book.data.publicationDate;
                }
            }
            else if (event.target.classList.contains("btn-danger")) {
                const bookId = event.target.dataset.id;
                if (bookId) {
                    const confirmDelete = confirm('are you shure you want to delete this book?');
                    if (confirmDelete) {
                        yield crudBooks.deleteBook(bookId, token);
                        idCatche = undefined;
                        yield allBooks(limit, currentPage);
                    }
                }
            }
        }
    }));
    function allBooks(limit, currentPage) {
        return __awaiter(this, void 0, void 0, function* () {
            const crudBooks = new BooksController(URL_BOOKS);
            try {
                const response = yield crudBooks.getAllBooks(token, limit, currentPage);
                console.log(`respuesta de 'getAllBooks' ${response}`);
                const books = response.data; // trae el array con toda la data(información) correspondiente a los libros.
                containerBooks.innerHTML = '';
                for (const book of books) { // recorre el array.
                    cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate);
                }
            }
            catch (error) {
                console.error("error fetching books: ", error);
            }
        });
    }
    allBooks(limit, currentPage);
}
