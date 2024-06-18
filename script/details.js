// récupére le donnés envoyer dans l'url
const [, data] = window.location.href.split("?");
// console.log(decodeURIComponent(data));
const livre = JSON.parse(decodeURIComponent(data));
console.log(livre);

// Sélection des éléments HTML à mettre à jour
const titreElement = document.querySelector(".head h1");
const auteursElement = document.querySelector(".head h2");
const imageElement = document.querySelector("#details img");
const ulElement = document.querySelector("#details ul");
const resumeElement = document.querySelector("#resume p");
const disponibiliteElement = document.querySelectorAll("#details ul li")[8]; // Sélection de l'élément de disponibilité
const etatElement = document.querySelectorAll("#details ul li")[9]; // Sélection de l'élément d'état

// Mettre à jour les éléments HTML avec les données du livre
titreElement.textContent = livre.titre;
auteursElement.textContent = livre.auteurs.join(", ");
imageElement.src = livre.image;
ulElement.innerHTML = `
  <li><strong>Titre:</strong> ${livre.titre}</li>
  <li><strong>Auteurs:</strong> ${livre.auteurs.join(", ")}</li>
  <li><strong>ISBN:</strong> ${livre.isbn}</li>
  <li><strong>Éditeur:</strong> ${livre.editeur}</li>
  <li><strong>Date de Publication:</strong> ${livre.datePublication}</li>
  <li><strong>Genre:</strong> ${livre.genre}</li>
  <li><strong>Langue:</strong> ${livre.langue}</li>
  <li><strong>Nombre de Pages:</strong> ${livre.nombrePages}</li>
  <li><strong>Disponibilité:</strong> ${
    livre.disponibilite ? "Disponible" : "Non disponible"
  }</li>
  <li><strong>État:</strong> ${livre.etat}</li>
`;
resumeElement.textContent = livre.resume;
disponibiliteElement.innerHTML = `<strong>Disponibilité:</strong> ${
  livre.disponibilite ? "Disponible" : "Non disponible"
}`;
etatElement.innerHTML = `<strong>État:</strong> ${livre.etat}`;
