// Initialize passenger counts
let currentNumOfPassengers = 0;
let totalNumOfPassengers = 0;

// Function to update passenger counts
function updatePassengerCounts() {
  document.getElementById("currentNumOfPassengers").textContent =
    currentNumOfPassengers;
  document.getElementById("totalNumOfPassengers").textContent =
    totalNumOfPassengers;
}

// Define initMap as a global function
window.initMap = function () {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
};

// Example: Listen for the "Add Passenger" button click
document.getElementById("addPassenger").addEventListener("click", () => {
  // Get the current location (simulated here)
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  // Update passenger counts
  currentNumOfPassengers++;
  totalNumOfPassengers++;

  // Update the UI
  updatePassengerCounts();
});

// Example: Listen for the "Remove Passenger" button click
document.getElementById("removePassenger").addEventListener("click", () => {
  // Get the current location (simulated here)
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  // Update passenger counts
  currentNumOfPassengers--;

  // Update the UI
  updatePassengerCounts();
});

// Implement other functionality for requesting location, showing statistics, and initializing the map here.
