document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault(); // Stops the default browser URL reload

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

            // 1. Full Name Validation
            const fullName = fullNameInput.value.trim();
            if (!fullName) {
                nameError.textContent = 'Full name is required.';
                isValid = false;
            }

            // 2. Email Validation
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email) {
                emailError.textContent = 'Email address is required.';
                isValid = false;
            } else if (!emailRegex.test(email)) {
                emailError.textContent = 'Please enter a valid email address (e.g. user@domain.com).';
                isValid = false;
            }

            // 3. GitHub Tag Validation
            const githubTag = githubInput.value.trim();
            if (!githubTag) {
                githubError.textContent = 'GitHub user tag is required.';
                isValid = false;
            } else if (!githubTag.startsWith('@')) {
                githubError.textContent = 'GitHub tag must begin with the @ prefix (e.g. @username).';
                isValid = false;
            }

            // 4. Avatar Upload Validation
            const avatarFile = avatarInput.files[0];
            if (!avatarFile) {
                avatarError.textContent = 'Please upload an avatar image.';
                isValid = false;
            } else {
                const validTypes = ['image/jpeg', 'image/png'];
                if (!validTypes.includes(avatarFile.type)) {
                    avatarError.textContent = 'Only JPEG or PNG image formats are allowed.';
                    isValid = false;
                } else if (avatarFile.size > 500 * 1024) {
                    avatarError.textContent = 'Avatar file size must be under 500KB.';
                    isValid = false;
                }
            }

            // If all checks pass, process file reader and store session data
            if (isValid) {
                sessionStorage.setItem('conf_fullName', fullName);
                sessionStorage.setItem('conf_email', email);
                sessionStorage.setItem('conf_github', githubTag);

                if (avatarFile) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        sessionStorage.setItem('conf_avatar', e.target.result);
                        window.location.href = 'ticket.html';
                    };
                    reader.onerror = function() {
                        window.location.href = 'ticket.html';
                    };
                    reader.readAsDataURL(avatarFile);
                } else {
                    window.location.href = 'ticket.html';
                }
            }
        });
    }
});
