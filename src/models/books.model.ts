// interface para obtener la respuesta de la petición 'GET'.

export interface BodyResponseGetAllBooks { // interface con la respuesta al conectar con la API y realizar exitosamente la conexión.
    message: string;
    data:    Datum[];
}

export interface Datum { // interface para el objeto que continene la información de 'Datum'.
    id:              string;
    title:           string;
    author:          string;
    description:     string;
    summary:         string;
    publicationDate: string;
    createdBy:       string;
    updatedBy:       null;
    deletedBy:       null;
    createdAt:       Date;
    updatedAt:       Date;
    deletedAt:       null;
    files:           any[];
}

export interface BodyRequestCreateBook { // interface con la información para realizar la petición para crear un libro. 
    title : string,
    author : string,
    description : string,
    summary : string,
    publicationDate : string 
}

export interface BodyResponseCreateBook { // interface para obetener la información del libro que fue creado.
    message : string,
    data : Record <string, string>
}

export interface BodyResponseGetBookById { // interface para obtener un libro por su ID.
    message : string,
    data : Record <string, string>
}

export interface BodyRequestUpdateBook { // interface con la información para realizar la petición para crear un libro.
    title : string,
    author : string,
    description : string,
    summary : string,
    publicationDate : string 
}

export interface BodyResponseUpdateBook { // interface para obetener la información del libro que fue actualizado.
    message : string,
    data : Record <string, string>
}

export interface BodyResponseDeleteBook { // interface para obetener la información del libro que fue eliminado.
    message : string,
    data : null 
}

