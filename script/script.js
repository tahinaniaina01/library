// const books = [
//   {
//     titre: "1984",
//     auteurs: ["George Orwell"],
//     isbn: "978-2-07-036822-8",
//     image: "/assets/images/bd1.jpg",
//     editeur: "Gallimard",
//     datePublication: "1949",
//     genre: "Dystopie, Science-fiction",
//     resume:
//       "Un homme lutte contre un régime totalitaire oppressif dans un monde dystopique.",
//     langue: "Français",
//     nombrePages: 368,
//     disponibilite: false,
//     etat: "Endommagé",
//   },
//   {
//     titre: "Le Meilleur des Mondes",
//     auteurs: ["Aldous Huxley"],
//     isbn: "978-2-07-036845-7",
//     image: "/assets/images/bd2.jpg",
//     editeur: "Plon",
//     datePublication: "1932",
//     genre: "Dystopie, Science-fiction",
//     resume:
//       "Une vision cauchemardesque d'un futur où les êtres humains sont manipulés.",
//     langue: "Français",
//     nombrePages: 288,
//     disponibilite: true,
//     etat: "Neuf",
//   },
// ];

// function displayBooks() {
//   const bookList = document.getElementById("book-list");

//   books.forEach((book) => {
//     const link = document.createElement("a");
//     const bookItem = document.createElement("div");
//     bookItem.className = "book-item";

//     const bookImage = document.createElement("img");
//     bookImage.src = book.image;
//     bookImage.alt = `Couverture de ${book.titre}`;

//     const bookTitle = document.createElement("h3");
//     bookTitle.textContent = book.titre;

//     const bookAuthor = document.createElement("p");
//     bookAuthor.textContent = `Par ${book.auteurs.join(", ")}`;

//     bookItem.appendChild(bookImage);
//     bookItem.appendChild(bookTitle);
//     bookItem.appendChild(bookAuthor);
//     link.href = `./details.html?${JSON.stringify(book)}`;

//     link.appendChild(bookItem);
//     bookList.appendChild(link);
//   });
// }

// document.addEventListener("DOMContentLoaded", displayBooks);

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

      books.push(newBook);
      updateJSONFile();
      displayBooks();
      event.target.reset(); // Reset the form
    });

  function displayBooks() {
    const bookList = document.getElementById("book-list");
    bookList.innerHTML = ""; // Clear existing content

    books.forEach((book) => {
      const bookItem = document.createElement("div");
      const a = document.createElement("a");
      a.href = `./details.html?${JSON.stringify(book)}`;
      bookItem.className = "book-item";

      const bookImage = document.createElement("img");
      bookImage.src = book.image;
      bookImage.alt = `Couverture de ${book.titre}`;

      const bookTitle = document.createElement("h3");
      bookTitle.textContent = book.titre;

      const bookAuthor = document.createElement("p");
      bookAuthor.textContent = `Par ${book.auteurs.join(", ")}`;

      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthor);
      a.appendChild(bookItem);

      bookList.appendChild(a);
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
