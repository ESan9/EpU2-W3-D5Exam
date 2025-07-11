const endpoint = "https://striveschool-api.herokuapp.com/api/product/";
const parameters = new URLSearchParams(location.search); // creo un oggetto con TUTTI i parametri in questo URL
const eventId = parameters.get("eventId");
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYjhjZDc4Y2RkZjAwMTU1ZDY3OTYiLCJpYXQiOjE3NTIyMTc4MDYsImV4cCI6MTc1MzQyNzQwNn0.VUjghxtyM9dLds1VTtQPuNkeK8y2cRlkYfbvLEgWGug";

fetch(endpoint + eventId, {
  headers: {
    Authorization: "Bearer " + token,
    "Content-Type": "application/json",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel recupero dettaglio evento");
    }
  })
  .then((bookDetails) => {
    console.log("dettagli", bookDetails);
    document.getElementById("spinner-container").classList.add("d-none");
    document.querySelector(".card .card-title").innerText =
      "Titolo:" + " " + bookDetails.name;
    document.querySelector(".card .card-text:nth-of-type(1)").innerText =
      "Descrizione:" + " " + bookDetails.description;
    document.querySelector(".card .card-text:nth-of-type(2)").innerText =
      "Casa Editrice:" + " " + bookDetails.brand;
    document.querySelector(".card .card-text:nth-of-type(3)").innerText =
      "Prezzo:" + " " + bookDetails.price + "€";
    document.querySelector(".card-img-top").src = bookDetails.imageUrl;
  })
  .catch((err) => {
    console.log("ERRORE", err);
  });
