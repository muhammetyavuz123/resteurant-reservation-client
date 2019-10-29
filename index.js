const addReservationModal = document.getElementById("add-reservation-modal");

async function getReservationFromApı() {
  const response = await fetch("http://localhost:3000/reservation");

  const reservations = await response.json();

  reservations.forEach(reservation => {
    let markup = `
    <div class="card-body">
    
        <h5 class="card-footer" style="color:red">${reservation.masa}</h5>
        <p class"card-text">${reservation.name}</p>
        
        <p class"card-text">${reservation.surname}</p>
        
        <p class"card-text">${reservation.phone}</p>
        <div class="card-text">${reservation.date}</div>
        <br>
        <button class="btn btn-danger delete-reservation"  data-reservationid="${reservation._id}">Delete</button>


        </div>
        `;

    let card = document.createElement("div");
    card.classList.add("card");
    card.style.width = "300px";
    card.innerHTML = markup;
    document.getElementById("Reservations").appendChild(card);
  });
}

async function postReservationToApi(event) {
  event.preventDefault();
  const reservationMasa = document.getElementById("reservation-masa").value;
  const reservationName = document.getElementById("reservation-name").value;
  const reservationSurname = document.getElementById("reservation-surname")
    .value;
  const reservationDate = document.getElementById("reservation-date").value;
  const reservationPhone = document.getElementById("reservation-phone").value;

  const requestBody = {
    masa: reservationMasa,
    name: reservationName,
    surname: reservationSurname,
    date: reservationDate,
    phone: reservationPhone
  };

  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(requestBody)
  };

  const response = fetch("http://localhost:3000/reservation", options);

  // const responseJson = await response.json();

  $("#add-reservation-modal").modal("toggle");
  $("#Reservations").html("");
  getReservationFromApı();
}

async function deleteReservationFromAPI() {
  const reservationId = $(this).data("reservationid");
  await fetch(`http://localhost:3000/reservation/${reservationId}`, {
    method: "DELETE"
  });
  $("#Reservations").html("");
  getReservationFromApı();
}

getReservationFromApı();
const addreservationFrom = document.getElementById("add-reservation-form");
addreservationFrom.addEventListener("submit", postReservationToApi);

$("#Reservations").on("click", ".delete-reservation", deleteReservationFromAPI);
