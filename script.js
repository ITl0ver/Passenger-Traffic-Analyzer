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

// Initialize the map
let map;
let marker;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.716667, lng: 44.783333 },
    zoom: 15,
  });
}

// Call initMap when the Google Maps API is loaded
google.maps.event.addDomListener(window, "load", initMap);

// Add an event listener to the "Add Passenger" button
document.getElementById("addPassenger").addEventListener("click", () => {
  // Get the current location (simulated here)
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  // Update passenger counts
  currentNumOfPassengers++;
  totalNumOfPassengers++;

  // Update the UI
  updatePassengerCounts();

  // Add a marker at the specified coordinates
  const location = new google.maps.LatLng(latitude, longitude);
  if (marker) {
    marker.setMap(null);
  }
  marker = new google.maps.Marker({
    position: location,
    map: map,
    title: "Passenger Location",
  });
});

// Add an event listener to the "Remove Passenger" button
document.getElementById("removePassenger").addEventListener("click", () => {
  // Get the current location (simulated here)
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  // Check if there are passengers to remove
  if (currentNumOfPassengers > 0) {
    // Update passenger counts
    currentNumOfPassengers--;

    // Update the UI
    updatePassengerCounts();
  }
});

// Function to request user's location
function requestLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Handle the retrieved location (latitude and longitude)
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Update the latitude and longitude input fields
        document.getElementById("latitude").value = latitude;
        document.getElementById("longitude").value = longitude;

        // Update the map's center to the retrieved location and set an appropriate zoom level
        const newCenter = new google.maps.LatLng(latitude, longitude);
        map.setCenter(newCenter);
        map.setZoom(15); // Set the zoom level to your preference

        // Remove the existing marker (if it exists)
        if (marker) {
          marker.setMap(null);
        }

        // Create a new marker at the retrieved location
        marker = new google.maps.Marker({
          position: newCenter,
          map: map,
          title: "Your Location",
        });
      },
      function (error) {
        // Handle errors if geolocation request fails
        console.error("Geolocation request failed: " + error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported in this browser.");
  }
}

// Add an event listener to the "Request Location" button
document
  .getElementById("requestLocationPermission")
  .addEventListener("click", requestLocation);

// Add an event listener to the "Go" button to move the map to the specified coordinates
document.getElementById("go").addEventListener("click", () => {
  // Get the coordinates from the input fields
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  // Move the map to the specified coordinates
  const newCenter = new google.maps.LatLng(latitude, longitude);
  map.setCenter(newCenter);
  map.setZoom(15); // Set the zoom level to your preference
});
