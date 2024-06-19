// Sélection de l'élément input de type fichier
const fileInput = document.getElementById("file");

// Écoute de l'événement de changement sur le champ de fichier

document.addEventListener("DOMContentLoaded", () => {
  fileInput.addEventListener("change", function (event) {
    // Récupérer le fichier sélectionné
    const file = event.target.files[0];

    // Vérifier si un fichier a été sélectionné
    if (file) {
      // Créer un objet URL à partir du fichier sélectionné
      const imageURL = URL.createObjectURL(file);

      // Sélectionner l'élément div où afficher l'image
      const imagePreviewDiv = document.getElementById("imagePreview");

      // Créer un élément img
      const imgElement = document.createElement("img");
      imgElement.src = imageURL;
      imgElement.alt = "Image du livre"; // Ajoutez une description alt si nécessaire

      // Effacer le contenu précédent de la div
      imagePreviewDiv.innerHTML = "";

      // Ajouter l'élément img à la div
      imagePreviewDiv.appendChild(imgElement);

      // Libérer l'URL de l'objet après utilisation pour éviter les fuites mémoire
      URL.revokeObjectURL(imageURL);
    }
  });
  // Fonction pour charger les livres depuis un fichier JSON initial
  fetch("books.json")
    .then((response) => response.json())
    .then((data) => {
      books = data.livres;
      displayBooks();
    })
    .catch((error) => console.error("Error loading books:", error));

  document
    .getElementById("bookForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();

      const formData = new FormData(event.target);
      console.log(formData.get("auteurs"));
      const newBook = {
        titre: formData.get("titre"),
        auteurs: formData
          .get("auteurs")
          .split(",")
          .map((auteur) => auteur.trim()),
        isbn: formData.get("isbn"),
        image: URL.createObjectURL(formData.get("image")),
        editeur: formData.get("editeur"),
        datePublication: formData.get("datePublication"),
        genre: "À définir",
        resume: formData.get("resume"),
        langue: formData.get("langue"),
        nombrePages: formData.get("nombrePages"),
        disponibilite: formData.get("disponibilite") === "on",
        etat: formData.get("etat"),
      };

      books.push({ ...newBook, id: books.length });
      console.log(books);
      updateJSONFile();
      displayBooks();
      event.target.reset(); // Reset the form
    });

  function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; // Clear existing content

    books.forEach((book) => {
      const bookItem = document.createElement("div");
      bookItem.id = book.id;
      bookItem.className = "book-item";

      const a1 = document.createElement("a");
      a1.href = `./details.html?${JSON.stringify(book)}`;

      const a2 = document.createElement("a");
      a2.href = `./details.html?${JSON.stringify(book)}`;

      const bookImage = document.createElement("img");
      bookImage.src = book.image;
      bookImage.alt = `Couverture de ${book.titre}`;
      a1.appendChild(bookImage);

      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.titre;
      a2.appendChild(bookTitle);

      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = `Par ${book.auteurs.join(", ")}`;

      const deleteButton = document.createElement("button");
      deleteButton.className = `delete-book`;
      deleteButton.textContent = "supprimer";

      bookItem.appendChild(a1);
      bookItem.appendChild(a2);
      bookItem.appendChild(bookAuthor);
      bookItem.appendChild(deleteButton);

      bookList.appendChild(bookItem);
      deleteButton.addEventListener("click", () => {
        books.filter((item) => item.id !== book.id);
        document.getElementById(book.id).remove();
      });
    });
  }

  function updateJSONFile() {
    const json = JSON.stringify(books, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const downloadLink = document.getElementById("download-link");
    downloadLink.href = url;
    downloadLink.download = "books.json";
    downloadLink.click();

    URL.revokeObjectURL(url);
  }
});

let books = [];
