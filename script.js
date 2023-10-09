(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(success, error);
  } else {
    alert("Geolocation is not supported by this browser");
  }
})();

function success(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  displayMap(latitude, longitude);
}

function error() {
  const enableLocationMsg = "Please enable your device's location to retrieve your current position.";
  const enableLocationBtn = "Enable Location";

  if (confirm(enableLocationMsg)) {
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'denied') {
          alert("You have denied access to your location. Please enable it in your browser settings.");
        } else {
          alert("Unable to retrieve location. Please make sure your device's location is enabled.");
        }
      });
    } else {
      alert("Unable to retrieve location. Please make sure your device's location is enabled.");
    }
  } else {
    alert("Unable to retrieve location");
  }
  
  const locationInput = prompt("Enter latitude and longitude coordinates (e.g., 37.7749, -122.4194) to view a specific location on the map:");
  if (locationInput) {
    const [latitude, longitude] = locationInput.split(',').map(coord => parseFloat(coord.trim()));
    if (!isNaN(latitude) && !isNaN(longitude)) {
      displayMap(latitude, longitude);
    } else {
      alert("Invalid coordinates. Please enter latitude and longitude in the correct format.");
    }
  }
}

function displayMap(latitude, longitude) {
  const map = L.map("map").setView([latitude, longitude], 5);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
  L.marker([latitude, longitude]).addTo(map);
  
  const latLngMsg = `Latitude: ${latitude}, Longitude: ${longitude}`;
  const latLngDiv = document.createElement('div');
  latLngDiv.textContent = latLngMsg;
  document.body.appendChild(latLngDiv);
}