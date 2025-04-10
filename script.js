var map = L.map("map").setView([-7.7696282492455975, 110.37859252878474], 16);

map.zoomControl.setPosition("bottomright");

var baseLayer = L.tileLayer(
  "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
  }
).addTo(map);

// Tambahkan marker dari file places.json
fetch("./places.json")
  .then((response) => response.json())
  .then((places) => {
    places.forEach((p) => {
      L.marker(p.coords)
        .addTo(map)
        .bindPopup(
          `<b>${p.name}</b><br>
            <img src="${p.img}" width="200" /><br>
            ${p.desc}<br>
            <a href="${p.link}" target="_blank">Lihat di Google Maps</a>`
        );
    });
  });

// Tambahkan GeoJSON dari file jogja.json
fetch("./jogja.json")
  .then((res) => res.json())
  .then((data) => {
    L.geoJSON(data, {
      style: (feature) => {
        const colorMap = {
          "Gunung Kidul": "orange",
          Sleman: "red",
          Bantul: "blue",
          Yogyakarta: "green",
          "Kulon Progo": "magenta",
        };
        return {
          color: colorMap[feature.properties.KABUPATEN] || "gray",
          weight: 1,
          opacity: 0.5,
          fillOpacity: 0,
        };
      },
      onEachFeature: (feature, layer) => {
        layer.bindPopup(
          `<strong>Kecamatan:</strong> ${feature.properties.KECAMATAN}`
        );
      },
    }).addTo(map);
  });
