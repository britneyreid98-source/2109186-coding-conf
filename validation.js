document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registrationForm');
    
    if (!form) return;

    form.addEventListener('submit', function(event) {
        // Prevent default submission to perform custom validation
        event.preventDefault();

        // Grab form fields
        const fullNameInput = document.getElementById('fullName');
        const emailInput = document.getElementById('email');
        const githubInput = document.getElementById('githubTag');
        const avatarInput = document.getElementById('avatarUpload');

        // Grab error span containers
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const githubError = document.getElementById('githubError');
        const avatarError = document.getElementById('avatarError');

        // Reset previous error messages
        nameError.textContent = '';
        emailError.textContent = '';
        githubError.textContent = '';
        avatarError.textContent = '';

        let isValid = true;

        // 1. Full Name Validation: Required, cannot consist only of empty spaces
        const fullName = fullNameInput.value.trim();
        if (!fullName) {
            nameError.textContent = 'Full name is required.';
            isValid = false;
        }

        // 2. Email Validation: Strict user@domain.com regex
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            emailError.textContent = 'Email address is required.';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = 'Please enter a valid email address (e.g. user@domain.com).';
            isValid = false;
        }

        // 3. GitHub Tag Validation: Must start with @
        const githubTag = githubInput.value.trim();
        if (!githubTag) {
            githubError.textContent = 'GitHub user tag is required.';
            isValid = false;
        } else if (!githubTag.startsWith('@')) {
            githubError.textContent = 'GitHub tag must begin with the @ prefix (e.g. @username).';
            isValid = false;
        }

        // 4. Avatar Upload Validation: Required, JPEG/PNG, under 500KB
        const avatarFile = avatarInput.files[0];
        if (!avatarFile) {
            avatarError.textContent = 'Please upload an avatar image.';
            isValid = false;
        } else {
            const validTypes = ['image/jpeg', 'image/png'];
            if (!validTypes.includes(avatarFile.type)) {
                avatarError.textContent = 'Only JPEG or PNG image formats are allowed.';
                isValid = false;
            } else if (avatarFile.size > 500 * 1024) { // 500KB limit
                avatarError.textContent = 'Avatar file size must be under 500KB.';
                isValid = false;
            }
        }

        // If all checks pass, process file reader and store session data
        if (isValid) {
        // Save text data immediately to sessionStorage
        sessionStorage.setItem('conf_fullName', fullName);
        sessionStorage.setItem('conf_email', email);
        sessionStorage.setItem('conf_github', githubTag);

        const avatarFile = avatarInput.files[0];
        if (avatarFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                sessionStorage.setItem('conf_avatar', e.target.result);
                window.location.href = 'ticket.html';
            };
            reader.onerror = function() {
                // Fallback if reader fails so it still redirects
                window.location.href = 'ticket.html';
            };
            reader.readAsDataURL(avatarFile);
        } else {
            window.location.href = 'ticket.html';
        }
    }
            reader.readAsDataURL(avatarFile);
    });
});
