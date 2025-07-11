const endpoint = "https://striveschool-api.herokuapp.com/api/product/";

const getBooks = function () {
  fetch(endpoint, {
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODcwYjhjZDc4Y2RkZjAwMTU1ZDY3OTYiLCJpYXQiOjE3NTIyMTc4MDYsImV4cCI6MTc1MzQyNzQwNn0.VUjghxtyM9dLds1VTtQPuNkeK8y2cRlkYfbvLEgWGug",
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Response.ok non ha restituito true");
      }
    })
    .then((arrayOfBooks) => {
      // TOLGO lo spinner dalla pagina
      document.getElementById("spinner-container").classList.add("d-none");
      console.log("ARRAYOFBOOKS", arrayOfBooks);
      const row = document.getElementById("events-row");
      if (arrayOfBooks.length === 0) {
        row.innerHTML = `
          <div class="col">
            <p class="text-center">Al momento non ci sono libri disponibili</p>
          </div>
        `;
      } else {
        arrayOfBooks.forEach((book) => {
          row.innerHTML += `
            <div class="col">
              <div class="card h-100 d-flex flex-column">
                <img src="https://m.media-amazon.com/images/I/715WdnBHqYL._UF1000,1000_QL80_.jpg">
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title">${book.name}</h5>
                  <p class="card-text flex-grow-1">${book.description}</p>
                  <p class="card-text">${book.brand}</p> 
                 <p class="card-text">${book.price}</p>
                  <a href="./details.html?eventId=${book._id}" class="btn btn-primary">Vai ai dettagli</a>
                </div>
              </div>
            </div>
          `;
        });
      }
    })
    .catch((err) => {
      console.log("ERRORE", err);
    });
};

getBooks();
