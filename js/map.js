document.addEventListener("DOMContentLoaded", function () {
  var mapEl = document.getElementById("map");
  if (!mapEl || typeof L === "undefined") return;

  var branches = [
    { name: "SparkRight Sandton", lat: -26.1076, lng: 28.0567, query: "Sandton,Johannesburg" },
    { name: "SparkRight Rosettenville", lat: -26.2565, lng: 28.0600, query: "Rosettenville,Johannesburg" }
  ];

  var map = L.map("map", { scrollWheelZoom: false });
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var bounds = [];
  branches.forEach(function (b) {
    var directions = "https://www.google.com/maps/dir/?api=1&destination=" + encodeURIComponent(b.query);
    L.marker([b.lat, b.lng]).addTo(map).bindPopup(
      "<strong>" + b.name + "</strong><br>" +
      '<a href="' + directions + '" target="_blank" rel="noopener noreferrer">Get directions</a>'
    );
    bounds.push([b.lat, b.lng]);
  });

  map.fitBounds(bounds, { padding: [40, 40] });
  map.on("click", function () { map.scrollWheelZoom.enable(); });
});