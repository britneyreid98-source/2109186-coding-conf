var savedRegistration = localStorage.getItem("codingConfRegistration");

if (savedRegistration === null) {
    window.location.href = "index.html";
} else {
    var registration = JSON.parse(savedRegistration);

    document.getElementById("congrats").textContent = "Congrats, " + registration.name + "! Your ticket is ready.";
    document.getElementById("ticket-name").textContent = registration.name;
    document.getElementById("ticket-github").textContent = registration.github;
    document.getElementById("ticket-github").href = "https://github.com/" + registration.github.substring(1);
    document.getElementById("ticket-avatar").src = registration.avatar;
}
