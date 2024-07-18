import { UsersController } from "./controllers/users.controller.js"; // se importa la clase 'CrudUsers'.

const URL_USERS : string = 'http://190.147.64.47:5155'; // variable con la URL de la API.

// se definen los selectores del formulario para obtener los valores. 

const form = document.querySelector('form') as HTMLFormElement;
const email = document.querySelector('#email') as HTMLInputElement;
const password = document.querySelector('#password') as HTMLInputElement;

form.addEventListener('submit', async (event : Event) => {
    event.preventDefault();

    const crudUsers = new UsersController(URL_USERS); // se instancia la clase.
    const respuesta = await crudUsers.login(email, password); // se emplea el método 'login' de la clase y se le dan los parámetros de entrada requeridos.

    const token : string | null = respuesta.data.token; // la variable accede al token que se encuentra en la respuesta una vez el usuario administrador inicia sesión. 

    if (token) {
        console.log('inicio de sesión exitoso.');
        localStorage.setItem('authToken', token); // 'authToken - 'token' -> clave - valor para guardar el token en Local Storage.
        window.location.href = 'books.html' // redirige a la página donde se encuentran los libros una vez el usuario inicia sesión.
    }
    else {
        console.log('no se pudo iniciar sesión.');
    }

    form.reset();
})