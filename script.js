const container = document.querySelector('.container');
// Grab the seats that are not occupied
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.querySelector('#count');
const total = document.querySelector('#total');
const movieSelect = document.querySelector('#movie');

populateUI();

// "+" sign turns String to Number
let ticketPrice = +movieSelect.value;

// Save selected Movie index and price
function setMovieData(movieIndex, moviePrice) {
	localStorage.setItem('selectedMovieIndex', movieIndex);
	localStorage.setItem('selectedMoviePrice', moviePrice);
}

// Update total and count
function updateSelectedCountTotal() {
	// Get all the selected seats
	const selectedSeats = document.querySelectorAll('.row .seat.selected');

	/* Save selected seats into local storage*/
	// 1. Copy selected seats into array
	// 2. Map through array
	// 3. Return a new array indexes

	// [...selectedSeats] take the values of selectedSeats nodeList to regular array
	// Return the index of the selected seats
	const seatsIndex = [...selectedSeats].map((seat) => [...seats].indexOf(seat));

	// Save array : seatsIndex, (key, with array)
	localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

	// Get number of selectedSeats in a node list
	const selectedSeatsCount = selectedSeats.length;

	// Change the paragraph text at the bottom of the page
	count.innerText = selectedSeatsCount;
	total.innerText = selectedSeatsCount * ticketPrice;
}

// Get data from localStorage and populate UI
function populateUI() {
	const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

	// Check something is in localStorage and not an empty array
	if (selectedSeats !== null && selectedSeats.length > 0) {
		// Looping through the seat and index
		seats.forEach((seat, index) => {
			// if find out that the looped through index is in localStorage
			if (selectedSeats.indexOf(index) > -1) {
				// Add colors to selectedSeat
				seat.classList.add('selected');
			}
		});
	}

	const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

	// If selectedMovie is in the localStorage
	if (selectedMovieIndex !== null) {
		// Set that to the localStorage movie
		movieSelect.selectedIndex = selectedMovieIndex;
	}
}

// Movie select event
movieSelect.addEventListener('change', (e) => {
	ticketPrice = +e.target.value;
	setMovieData(e.target.selectedIndex, e.target.value);
	updateSelectedCountTotal();
});

// Seat click event
container.addEventListener('click', (e) => {
	// e.target = seat elements we clicked on
	// Check on the classList that has seat, but not occupied
	if (
		e.target.classList.contains('seat') &&
		!e.target.classList.contains('occupied')
	) {
		// Turn the selected seat to green
		e.target.classList.toggle('selected');

		updateSelectedCountTotal();
	}
});

// Initial count and total set
// (Prevent overriding the total and count when the page loads)
updateSelectedCountTotal();
