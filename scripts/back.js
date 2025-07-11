const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYjhjZDc4Y2RkZjAwMTU1ZDY3OTYiLCJpYXQiOjE3NTIyMTc4MDYsImV4cCI6MTc1MzQyNzQwNn0.VUjghxtyM9dLds1VTtQPuNkeK8y2cRlkYfbvLEgWGug";

// Se in modalità modifica, carica i dati nel form

if (eventId) {
  fetch(endpoint + eventId, {
    headers: {
      Authorization: authToken,
    },
  })
    .then((response) => {
      if (response.ok) return response.json();
      else throw new Error("Errore nel recupero dati");
    })
    .then((bookDetails) => {
      document.getElementById("name").value = bookDetails.name;
      document.getElementById("description").value = bookDetails.description;
      document.getElementById("brand").value = bookDetails.brand;
      document.getElementById("price").value = bookDetails.price;
    })
    .catch((err) => console.error("ERRORE FETCH:", err));
}

// CLASSE PER OGGETTO LIBRO

class Book {
  constructor(name, description, brand, price) {
    this.name = name;
    this.description = description;
    this.brand = brand;
    this.price = price;
    this.imageUrl =
      "https://m.media-amazon.com/images/I/715WdnBHqYL._UF1000,1000_QL80_.jpg";
  }
}

// FORM SUBMIT

const bookForm = document.getElementById("book-form");

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const description = document.getElementById("description").value;
  const brand = document.getElementById("brand").value;
  const price = document.getElementById("price").value;

  const bookToSave = new Book(name, description, brand, price);

  const method = eventId ? "PUT" : "POST";
  const url = eventId ? endpoint + eventId : endpoint;

  fetch(url, {
    method: method,
    body: JSON.stringify(bookToSave),
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
  })
    .then((response) => {
      if (response.ok) {
        alert("Operazione completata con successo!");
        bookForm.reset();
        if (!eventId) location.href = "./home.html"; // Rimanda alla pagina HOME una volta creato
      } else {
        throw new Error("Errore nella richiesta");
      }
    })
    .catch((err) => {
      console.error("ERRORE:", err);
      alert("Errore durante il salvataggio");
    });
});
