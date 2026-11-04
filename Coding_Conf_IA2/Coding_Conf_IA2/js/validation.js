var form = document.getElementById("registration-form");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    var name = document.getElementById("fullName").value.trim();
    var email = document.getElementById("email").value.trim();
    var github = document.getElementById("github").value.trim();
    var avatar = document.getElementById("avatar").files[0];
    var valid = true;

    document.getElementById("name-error").textContent = "";
    document.getElementById("email-error").textContent = "";
    document.getElementById("github-error").textContent = "";
    document.getElementById("avatar-error").textContent = "";

    if (name === "") {
        document.getElementById("name-error").textContent = "Please enter your full name.";
        valid = false;
    }

    var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(email)) {
        document.getElementById("email-error").textContent = "Enter a valid email address, such as name@example.com.";
        valid = false;
    }

    var githubPattern = /^@[A-Za-z0-9-]{1,39}$/;
    if (!githubPattern.test(github)) {
        document.getElementById("github-error").textContent = "Enter a GitHub username starting with @.";
        valid = false;
    }

    if (!avatar) {
        document.getElementById("avatar-error").textContent = "Please choose a JPEG or PNG image.";
        valid = false;
    } else {
        var imageType = avatar.type === "image/jpeg" || avatar.type === "image/png";
        if (!imageType) {
            document.getElementById("avatar-error").textContent = "Only JPEG and PNG images are allowed.";
            valid = false;
        } else if (avatar.size >= 500 * 1024) {
            document.getElementById("avatar-error").textContent = "Your image must be smaller than 500 KB.";
            valid = false;
        }
    }

    if (valid) {
        var reader = new FileReader();

        reader.onload = function () {
            var registration = {
                name: name,
                email: email,
                github: github,
                avatar: reader.result
            };

            localStorage.setItem("codingConfRegistration", JSON.stringify(registration));
            window.location.href = "ticket.html";
        };

        reader.readAsDataURL(avatar);
    }
});
