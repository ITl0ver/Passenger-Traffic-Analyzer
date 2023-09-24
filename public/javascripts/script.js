// Listen for button clicks and call the corresponding functions
document.getElementById("addPassenger").addEventListener("click", addPassengerMarker);
document.getElementById("removePassenger").addEventListener("click", removePassengerMarker);
document.getElementById("go").addEventListener("click", goToCoordinates);
document.getElementById("requestLocationPermission").addEventListener("click", requestLocation);

// Initialize variables
let currentNumOfPassengers = 0;
let totalNumOfPassengers = 0;
let map;
let markers = [];

// Initialize the map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.716667, lng: 44.783333 },
    zoom: 13,
  });
}

// Function to update passenger counts in the UI
function updatePassengerCounts() {
  document.getElementById("currentNumOfPassengers").textContent = currentNumOfPassengers;
  document.getElementById("totalNumOfPassengers").textContent = totalNumOfPassengers;
}

// Function to add a passenger marker (green) at the specified or current location
function addPassengerMarker() {
  const latitudeInput = document.getElementById("latitude");
  const longitudeInput = document.getElementById("longitude");

  let latitude = parseFloat(latitudeInput.value);
  let longitude = parseFloat(longitudeInput.value);

  if (isNaN(latitude) || isNaN(longitude)) {
    const currentCenter = map.getCenter();
    latitude = currentCenter.lat();
    longitude = currentCenter.lng();
  }

  const passengerLocation = new google.maps.LatLng(latitude, longitude);

  const passengerMarker = new google.maps.Marker({
    position: passengerLocation,
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

// Function to remove a passenger marker (red) at the specified or current location
function removePassengerMarker() {
  const latitudeInput = document.getElementById("latitude");
  const longitudeInput = document.getElementById("longitude");

  let latitude = parseFloat(latitudeInput.value);
  let longitude = parseFloat(longitudeInput.value);

  if (isNaN(latitude) || isNaN(longitude)) {
    const currentCenter = map.getCenter();
    latitude = currentCenter.lat();
    longitude = currentCenter.lng();
  }

  const passengerLocation = new google.maps.LatLng(latitude, longitude);

  // Check if there are passengers to remove
  if (currentNumOfPassengers > 0) {
    const redMarker = new google.maps.Marker({
      position: passengerLocation,
      map: map,
      title: "Removed Passenger",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new google.maps.Size(32, 32),
      },
    });

    markers.push(redMarker);
    currentNumOfPassengers--;

    updatePassengerCounts();
  } else {
    console.warn("No passengers to remove.");
  }
}


// Function to move the map to the specified coordinates and add a blue marker
function goToCoordinates() {
  const latitude = parseFloat(document.getElementById("latitude").value);
  const longitude = parseFloat(document.getElementById("longitude").value);

  if (!isNaN(latitude) && !isNaN(longitude)) {
    const targetCoordinates = new google.maps.LatLng(latitude, longitude);
    map.setCenter(targetCoordinates);

    markers.forEach((marker) => {
      marker.setMap(null);
    });

    const blueMarker = new google.maps.Marker({
      position: targetCoordinates,
      map: map,
      title: "Target Location",
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
        scaledSize: new google.maps.Size(32, 32),
      },
    });

    markers.push(blueMarker);
  } else {
    console.error("Invalid latitude or longitude values.");
  }
}

// Function to request user's location and add a marker
function requestLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        document.getElementById("latitude").value = latitude;
        document.getElementById("longitude").value = longitude;

        const userLocationMarker = new google.maps.Marker({
          position: { lat: latitude, lng: longitude },
          map: map,
          title: "User Location",
          icon: {
            url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            scaledSize: new google.maps.Size(32, 32),
          },
        });

        markers.push(userLocationMarker);

        const newCenter = new google.maps.LatLng(latitude, longitude);
        map.setCenter(newCenter);
      },
      function (error) {
        console.error("Geolocation request failed: " + error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported in this browser.");
  }
}

function updateClock() {
  const now = new Date();

  // Get the time in HH:mm:ss format
  const timeString = now.toLocaleTimeString();

  // Get the date in yyyy-mm-dd format
  const dateString = now.toISOString().slice(0, 10);

  // Update the HTML elements with the time and date
  document.getElementById("time").textContent = timeString;
  document.getElementById("date").textContent = dateString;
}

// Call the updateClock function initially to set the initial time and date
updateClock();

// Set up an interval to update the clock every second
setInterval(updateClock, 1000);