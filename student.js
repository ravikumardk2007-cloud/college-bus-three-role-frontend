
requireRole(["student"]);

// SIMULATED BUS MAP

const pts = [
    [12.9716, 77.5946],
    [12.9722, 77.5952],
    [12.9729, 77.5960],
    [12.9735, 77.5970],
    [12.9742, 77.5980],
    [12.9750, 77.5990],
    [12.9760, 77.6000]
];

const map = L.map("studentMap").setView(pts[0], 15);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap contributors"
}).addTo(map);

L.polyline(pts, {
    color: "#2476e8",
    weight: 5
}).addTo(map);

let i = 0;

const bus = L.marker(pts[0])
    .addTo(map)
    .bindPopup("College Bus KA-01-AB-1234")
    .openPopup();

L.marker(pts[pts.length - 1])
    .addTo(map)
    .bindPopup("Campus");

setInterval(() => {
    i = (i + 1) % pts.length;

    bus.setLatLng(pts[i]);

    document.getElementById("eta").textContent =
        Math.max(1, pts.length - i);

    document.getElementById("speed").textContent =
        25 + (i % 7);

    document.getElementById("status").textContent =
        i > 4 ? "Arriving soon" : "On time";

}, 3500);


// DISPLAY ARRIVAL STATUS PUBLISHED BY DRIVER

const ARRIVAL_KEY = "collegeBusArrivalUpdate";

function updateStudentDashboard() {

    const saved = localStorage.getItem(ARRIVAL_KEY);

    if (!saved) {
        return;
    }

    let data;

    try {
        data = JSON.parse(saved);
    } catch (error) {
        console.error("Invalid arrival update data:", error);
        return;
    }

    const statusText = {
        "on-time": "Bus will arrive on time",
        "delayed": "Bus is delayed",
        "unable": "Bus will not arrive"
    };

    document.getElementById("studentStatus").textContent =
        statusText[data.status] || "Status unavailable";

    document.getElementById("studentETA").textContent =
        data.status === "unable"
            ? "Unavailable"
            : data.minutes + " minutes";

    document.getElementById("studentMessage").textContent =
        data.message || "No additional message";

    document.getElementById("studentUpdateTime").textContent =
        data.updatedAt
            ? new Date(data.updatedAt).toLocaleString()
            : "Not available";
}

// Load the latest update when the student page opens

updateStudentDashboard();

// Refresh the student dashboard when the driver publishes an update
// in another tab of the same browser

window.addEventListener("storage", function(event) {
    if (event.key === ARRIVAL_KEY) {
        updateStudentDashboard();
    }
});
