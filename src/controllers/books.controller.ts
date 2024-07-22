import { BodyResponseGetAllBooks, BodyRequestCreateBook, BodyResponseCreateBook, BodyResponseGetBookById, BodyRequestUpdateBook, BodyResponseUpdateBook, BodyResponseDeleteBook } from "../models/books.model"; // se importa la interface correspondiente a la respuesta para obtener los libros almacenados en la API.

export class BooksController { 

    public domain : string;

    constructor (domain : string) {
        this.domain = domain;
    }

    async getAllBooks(token : string, limit : number, page : number) : Promise <BodyResponseGetAllBooks> { // función para obtener los libros almacenados en la API. 'limit' y 'page' -> corresponden a la paginación.

        const headers : Record <string, string> = { // headers correspondientes a la petición 'GET' para acceder a los libros.
        'accept' : '*/*',
        'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = { // objeto con la información necesaria para realizar la petición.
            method : 'GET',
            headers : headers
        }

        const response : Response = await fetch(`${this.domain}/api/v1/books?limit=${limit}&page=${page}`, requestOptions) // '?limit=${limit}&page=${page}' corresponden a la sintaxis para escribir los query params de la paginación. ? -> query param & -> para añadir un nuevo query param. 

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }

        const responseBodyGetAllBooks : BodyResponseGetAllBooks = await response.json(); // se transforma la respuesta obtenida a código, implementando la interface 'BodyResponseGetAllBooks'.

        return responseBodyGetAllBooks;
    }

    async createBook(title : HTMLInputElement, author : HTMLInputElement, description : HTMLInputElement, summary : HTMLInputElement, publicationDate : HTMLInputElement, token : string) : Promise <BodyResponseCreateBook> { // función para crear un nuevo libro.

        const newBook : BodyRequestCreateBook = { // body (objeto) con la información necesaria para crear un nuevo libro.
            title : title.value,
            author : author.value,
            description : description.value,
            summary : summary.value,
            publicationDate : publicationDate.value
        }
        
        const headers : Record <string, string> = { // headers correspondientes a la petición 'POST' para crear los libros.
            "accept" : "*/*",
            "Authorization" : `Bearer ${token}`,
            "Content-Type" : "application/json"
        }

        const requestOptions : RequestInit = {
            method : 'POST',
            headers : headers,
            body : JSON.stringify(newBook) // 'body : JSON.stringify(newBook)' envía el objeto con la información del nuevo libro.
        }

        const response : Response = await fetch(`${this.domain}/api/v1/books`, requestOptions);

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros ${response.status} ${response.statusText}`);
        }

        const responseBodyCreateBook : BodyResponseCreateBook = await response.json();

        return responseBodyCreateBook;
    }

    async getBookById(id : string, token : string) : Promise <BodyResponseGetBookById> { // función para obtener un libro por su ID.

        const headers : Record <string, string> = { // headers correspondientes a la petición 'GET' para acceder a los libros.
            'accept' : '*/*',
            'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = { // objeto con la información necesaria para realizar la petición.
            method : 'GET',
            headers : headers
        }
        
        const response : Response = await fetch(`${this.domain}/api/v1/books/${id}`, requestOptions);

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }

        const responseBodyGetBookById : BodyResponseGetBookById = await response.json();

        return responseBodyGetBookById;
    }

    async updateBook(idCatche : string, title : HTMLInputElement, author : HTMLInputElement, description : HTMLInputElement, summary : HTMLInputElement, publicationDate : HTMLInputElement, token : string) : Promise <BodyResponseUpdateBook> { // función para actualizar la información de un libro.

        const updateBook : BodyRequestUpdateBook = { // body (objeto) con la información necesaria para actualizar un libro.
            title : title.value,
            author : author.value,
            description : description.value,
            summary : summary.value,
            publicationDate : publicationDate.value
        }

        const headers : Record <string, string> = { // headers correspondientes a la petición 'PATCH' para crear los libros.
            'accept' : '*/*',
            'Content-Type' : 'application/json',
            'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = {
            method : 'PATCH',
            headers : headers,
            body : JSON.stringify(updateBook) // 'body : JSON.stringify(newBook)' envía el objeto con la información del libro actualizado.
        }

        const response : Response = await fetch(`${this.domain}/api/v1/books/${idCatche}`, requestOptions);

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }

        const responseBodyUpdateBook : BodyResponseUpdateBook = await response.json();

        return responseBodyUpdateBook;
    }

    async deleteBook(id : string, token : string) : Promise <BodyResponseDeleteBook> {

        const headers : Record <string, string> = { // headers correspondientes a la petición 'DELETE' para acceder a los libros.
            'accept' : '*/*',
            'Authorization' : `Bearer ${token}`
        }

        const requestOptions : RequestInit = { // objeto con la información necesaria para realizar la petición.
            method : 'DELETE',
            headers : headers
        }

        const response : Response = await fetch(`${this.domain}/api/v1/books/${id}`, requestOptions);

        if (!response.ok) { // manejo de error en caso de no contar con una conexión exitosa. 
            console.log(response);
            throw new Error(`error al obtener libros: ${response.status} : ${response.statusText}`);
        }

        const responseBodyDeleteBook : BodyResponseDeleteBook = await response.json();

        return responseBodyDeleteBook;
    }
}