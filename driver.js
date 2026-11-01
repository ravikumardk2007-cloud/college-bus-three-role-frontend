
requireRole(["driver"]);

let running = false;
let count = 0;
let timer = null;

const status = () => {
    document.getElementById("tripStatus").textContent =
        running ? "In progress" : "Stopped";

    document.getElementById("gpsStatus").textContent =
        running ? "Sharing (demo)" : "Off";
};

document.getElementById("startTrip").addEventListener("click", () => {
    if (running) return;

    running = true;
    status();

    document.getElementById("driverMessage").textContent =
        "Demo trip started. Simulated location updates are being generated every 3 seconds.";

    timer = setInterval(() => {
        count++;
        document.getElementById("updates").textContent = count;
    }, 3000);
});

document.getElementById("stopTrip").addEventListener("click", () => {
    running = false;
    clearInterval(timer);
    status();

    document.getElementById("driverMessage").textContent =
        "Trip stopped. No more simulated location updates.";
});

// DRIVER ARRIVAL STATUS UPDATE

const ARRIVAL_KEY = "collegeBusArrivalUpdate";

document.getElementById("arrivalForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const arrivalStatus = document.getElementById("arrivalStatus").value;
    const minutes = Number(document.getElementById("arrivalMinutes").value);
    const message = document.getElementById("arrivalMessage").value.trim();

    if (
        arrivalStatus !== "unable" &&
        (!Number.isFinite(minutes) || minutes < 0 || minutes > 240)
    ) {
        alert("Please enter an ETA between 0 and 240 minutes.");
        return;
    }

    const update = {
        status: arrivalStatus,
        minutes: arrivalStatus === "unable" ? null : minutes,
        message: message,
        updatedAt: new Date().toISOString()
    };

    localStorage.setItem(ARRIVAL_KEY, JSON.stringify(update));

    document.getElementById("publishedStatus").textContent =
        "Arrival status successfully published!";
});

// Hide ETA input when the driver selects Unable to Arrive

const arrivalStatusInput = document.getElementById("arrivalStatus");
const arrivalMinutesInput = document.getElementById("arrivalMinutes");

function updateEtaInput() {
    const unable = arrivalStatusInput.value === "unable";
    arrivalMinutesInput.disabled = unable;
    arrivalMinutesInput.required = !unable;
}

arrivalStatusInput.addEventListener("change", updateEtaInput);
updateEtaInput();
