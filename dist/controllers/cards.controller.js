export class CardTemplateController {
    constructor(containerBooks) {
        this.containerBooks = containerBooks;
    }
    render(id, title, author, description, summary, publicationDate) {
        const figure = document.createElement("figure");
        figure.classList.add("card", "col-4");
        const h2 = document.createElement("h2");
        h2.classList.add("card-title", "text-center");
        h2.textContent = title;
        figure.appendChild(h2);
        const h4 = document.createElement("h4");
        h4.classList.add("card-title", "text-center");
        h4.textContent = author;
        figure.appendChild(h4);
        const figcaption = document.createElement("figcaption");
        figcaption.classList.add("card-title", "bg-light", "text-dark");
        figure.appendChild(figcaption);
        const h5 = document.createElement("h5");
        h5.classList.add("card-title", "text-center");
        h5.textContent = description;
        figcaption.appendChild(h5);
        const p = document.createElement("p");
        p.classList.add("card-title", "text-center");
        p.textContent = summary;
        figcaption.appendChild(p);
        const h6 = document.createElement("h6");
        h6.classList.add("card-title", "text-center");
        h6.textContent = publicationDate;
        figcaption.appendChild(h6);
        const div = document.createElement("div");
        div.classList.add("d-flex");
        const editButton = document.createElement("button");
        editButton.classList.add("btn", "btn-warning");
        editButton.textContent = "edit";
        editButton.type = "button";
        editButton.dataset.id = id; // dataset almacena los data atributtes. Se le añade el id del libro.
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("btn", "btn-danger");
        deleteButton.textContent = "delete";
        deleteButton.type = "button";
        deleteButton.dataset.id = id; // dataset almacena los data atributtes. Se le añade el id del libro.
        div.appendChild(editButton);
        div.appendChild(deleteButton);
        figcaption.appendChild(div);
        this.containerBooks.appendChild(figure);
    }
}
