const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const parameters = new URLSearchParams(location.search);
const eventId = parameters.get("eventId");

const authToken =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYjhjZDc4Y2RkZjAwMTU1ZDY3OTYiLCJpYXQiOjE3NTIyMTc4MDYsImV4cCI6MTc1MzQyNzQwNn0.VUjghxtyM9dLds1VTtQPuNkeK8y2cRlkYfbvLEgWGug";

// Carica i dati nel form

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
  const img = document.getElementById("imageUrl");

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

// Avevo messo gli ID uguali nei due FORM, 1 ora perché non si aggiornava in home quando cliccavo modifica, 1 ora, ora funziona tutto

document.getElementById("modify-btn").addEventListener("click", () => {
  const id = document.getElementById("product-id").value.trim();

  const name = document.getElementById("manage-name").value;
  const description = document.getElementById("manage-description").value;
  const brand = document.getElementById("manage-brand").value;
  const price = document.getElementById("manage-price").value;

  if (!id) return alert("Inserisci un ID valido per la modifica");

  const updatedProduct = {
    name,
    description,
    brand,
    price,
    imageUrl:
      "https://m.media-amazon.com/images/I/715WdnBHqYL._UF1000,1000_QL80_.jpg",
  };

  fetch(endpoint + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: authToken,
    },
    body: JSON.stringify(updatedProduct),
  })
    .then((res) => {
      if (!res.ok) throw new Error("Errore nella modifica");
      return res.json();
    })
    .then(() => {
      alert("Prodotto modificato con successo!");
      window.location.href = "./home.html";
    })
    .catch((err) => {
      console.error("ERRORE PUT:", err);
      alert("Errore durante la modifica");
    });
});

// PER CANCELLARE

document.getElementById("delete-btn").addEventListener("click", () => {
  const id = document.getElementById("product-id").value.trim();
  if (!id) return alert("Inserisci un ID valido per la cancellazione");

  if (!confirm("Sei sicuro di voler cancellare questo prodotto?")) return;

  fetch(endpoint + id, {
    method: "DELETE",
    headers: {
      Authorization: authToken,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Errore nella cancellazione");
      alert("Prodotto eliminato con successo!");
    })
    .catch((err) => {
      console.error("ERRORE DELETE:", err);
      alert("Errore durante la cancellazione");
    });
});

// ALERT DEL FORM

document.getElementById("res").addEventListener("click", () => {
  if (!confirm("Sei sicuro di voler resettare il form?")) return;
  bookForm.reset();
});
