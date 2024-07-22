import { CardTemplateController } from "./controllers/cards.controller.js";
import { BooksController } from "./controllers/books.controller.js";

const URL_BOOKS : string = 'http://190.147.64.47:5155'; // url base de la API.

const btnLogout = document.querySelector("#btn-logout") as HTMLButtonElement;
const prevPage = document.querySelector("#prev-page") as HTMLButtonElement;
const nextPage = document.querySelector("#next-page") as HTMLButtonElement;

const token = localStorage.getItem("authToken"); // obtenemos el token almacenado en local storage una vez el usuario inició sesión.

let currentPage : number = 1;
const limit : number = 10;

btnLogout.addEventListener("click", (event : Event) => { // evento log out para cerrar sesión y eliminar le token del local storage.
    localStorage.removeItem('authToken');
    window.location.href = "index.html"; // redirige al usuario a la página de inicio de sesión.
});

if (!token) {
    alert("authentication token is missing. Plase, log in.");
    window.location.href = "index.html";
}
else {
    const containerBooks = document.querySelector(".container-books") as HTMLDivElement;
    const form = document.querySelector("form") as HTMLFormElement;
    const title = document.querySelector("#title") as HTMLInputElement;
    const author = document.querySelector("#author") as HTMLInputElement;
    const description = document.querySelector("#description") as HTMLInputElement;
    const summary = document.querySelector("#summary") as HTMLInputElement;
    const publicationDate = document.querySelector("#publication-date") as HTMLInputElement;

    let idCatche : undefined | string; 

    const cardTemplate = new CardTemplateController(containerBooks); // se instancia la clase 'CardTemplateController'.

    prevPage.addEventListener("click", async (event : Event) => {
        if (currentPage >= 1) {
            currentPage--; // es igual al currentPage = currentPage - 1.
            await allBooks(limit, currentPage);
        }
    });

    nextPage.addEventListener("click", async (event : Event) => {
        if (currentPage >= 1) {
            currentPage++; // es igual al currentPage = currentPage + 1.
            await allBooks(limit, currentPage);
        }
    });

    form.addEventListener("submit", async (event : Event) => {

        event.preventDefault();

        const crudBooks = new BooksController(URL_BOOKS);

        if (idCatche === undefined) {
            await crudBooks.createBook(title, author, description, summary, publicationDate, token as string);
        }
        else {
            await crudBooks.updateBook(idCatche, title, author, description, summary, publicationDate, token as string);
            idCatche = undefined;
        }

        form.reset();

        await allBooks(limit, currentPage);
    });

    containerBooks.addEventListener("click", async (event : Event) => {

        if (event.target instanceof HTMLButtonElement) {

            const crudBooks = new BooksController(URL_BOOKS);

            if (event.target.classList.contains("btn-warning")) {
                idCatche = event.target.dataset.id;

                if (idCatche) {
                    const book = await crudBooks.getBookById(idCatche, token as string);

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
                            await crudBooks.deleteBook(bookId, token as string);
                            idCatche = undefined;
                            await allBooks(limit, currentPage);
                        }
                    }
                }
            }

    })
    
   async function allBooks(limit : number, currentPage : number) { // función para mostrar todos los libros. 

    const crudBooks = new BooksController(URL_BOOKS);

    try {
        const response = await crudBooks.getAllBooks(token as string, limit, currentPage);
        console.log(`respuesta de 'getAllBooks' ${response}`);
        const books = response.data; // trae el array con toda la data(información) correspondiente a los libros.

        containerBooks.innerHTML = '';

        for (const book of books) { // recorre el array.
            cardTemplate.render(book.id, book.title, book.author, book.description, book.summary, book.publicationDate)
        }
    }
    catch (error) {
        console.error("error fetching books: ", error);
    }
    
   }

   allBooks(limit, currentPage);
}


