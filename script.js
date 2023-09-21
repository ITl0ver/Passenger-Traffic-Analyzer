// Listen for button clicks and call the corresponding functions
document.getElementById("addPassenger").addEventListener("click", addPassengerMarker);
document.getElementById("removePassenger").addEventListener("click", removePassengerMarker);
document.getElementById("go").addEventListener("click", goToCoordinates);
document.getElementById("requestLocationPermission").addEventListener("click", requestLocation);
// Initialize 
let currentNumOfPassengers = 0;
let totalNumOfPassengers = 0;
let map;
let markers = []; 

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.716667, lng: 44.783333 },
    zoom: 13,
  });
}

// Function to update passenger counts
function updatePassengerCounts() {
  document.getElementById("currentNumOfPassengers").textContent =
    currentNumOfPassengers;
  document.getElementById("totalNumOfPassengers").textContent =
    totalNumOfPassengers;
}

// Function to add a passenger marker (green) to the map
function addPassengerMarker() {
  const currentCenter = map.getCenter();
  const passengerMarker = new google.maps.Marker({
    position: currentCenter,
    map: map,
    title: "Passenger",
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png", 
      scaledSize: new google.maps.Size(32, 32),
    },
  });

  markers.push(passengerMarker);
  currentNumOfPassengers++;
  totalNumOfPassengers++;
  updatePassengerCounts();
}

// Function to remove a passenger marker (red) from the map and add a red marker at the current location
function removePassengerMarker() {
  if (markers.length > 0) {
    // Get the current center of the map
    const currentCenter = map.getCenter();

    // Create a new red marker at the current location
    const redMarker = new google.maps.Marker({
      position: currentCenter,
      map: map,
      title: "Removed Passenger",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Path to red marker icon
        scaledSize: new google.maps.Size(32, 32),
      },
    });

    markers.push(redMarker);
    currentNumOfPassengers--;

    // Update the UI
    updatePassengerCounts();
  }
}

// Function to move the map to the specified coordinates and add a blue marker
function goToCoordinates() {
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  if (!isNaN(latitude) && !isNaN(longitude)) {
    const targetCoordinates = new google.maps.LatLng(latitude, longitude);
    map.setCenter(targetCoordinates);

    // Remove previous blue marker (if it exists)
    markers.forEach((marker) => {
      marker.setMap(null);
    });

    // Create a new blue marker at the target coordinates
    const blueMarker = new google.maps.Marker({
      position: targetCoordinates,
      map: map,
      title: "Target Location",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Path to blue marker icon
        scaledSize: new google.maps.Size(32, 32),
      },
    });

    markers.push(blueMarker);
  } else {
    console.error("Invalid latitude or longitude values.");
  }
}

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

        // Update the map's center to the retrieved location
        const newCenter = new google.maps.LatLng(latitude, longitude);
        map.setCenter(newCenter);

        // Remove the existing marker (if it exists)
        markers.forEach((marker) => {
          marker.setMap(null);
        });

        // Create a new marker at the retrieved location
        const locationMarker = new google.maps.Marker({
          position: newCenter,
          map: map,
          title: "Your Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png", // Path to location marker icon
            scaledSize: new google.maps.Size(32, 32),
          },
        });

        markers.push(locationMarker);
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
