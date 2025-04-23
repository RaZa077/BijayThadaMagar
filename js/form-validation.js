document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Reset error messages
            const errorMessages = document.querySelectorAll('.error-message');
            errorMessages.forEach(error => error.style.display = 'none');
            
            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'nameError', 'Name is required');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'emailError', 'Email is required');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'emailError', 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'messageError', 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'messageError', 'Message must be at least 10 characters');
                isValid = false;
            }
            
            // If form is valid, submit it
            if (isValid) {
                // In a real application, you would send the form data to a server here
                // For this example, we'll just show a success message
                contactForm.style.display = 'none';
                formSuccess.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // In a real application, you might want to redirect or show the form again after a delay
                setTimeout(() => {
                    formSuccess.style.display = 'none';
                    contactForm.style.display = 'grid';
                }, 5000);
            }
        });
        
        // Function to show error message
        function showError(input, errorId, message) {
            const errorElement = document.getElementById(errorId);
            errorElement.textContent = message;
            errorElement.style.display = 'block';
            input.focus();
        }
        
        // Function to validate email format
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }
        
        // Real-time validation
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        formInputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                // Remove error message when user starts typing
                const errorId = this.id + 'Error';
                const errorElement = document.getElementById(errorId);
                if (errorElement) {
                    errorElement.style.display = 'none';
                }
            });
        });
        
        function validateField(field) {
            const errorId = field.id + 'Error';
            const errorElement = document.getElementById(errorId);
            
            switch(field.id) {
                case 'name':
                    if (!field.value.trim()) {
                        errorElement.textContent = 'Name is required';
                        errorElement.style.display = 'block';
                    }
                    break;
                    
                case 'email':
                    if (!field.value.trim()) {
                        errorElement.textContent = 'Email is required';
                        errorElement.style.display = 'block';
                    } else if (!isValidEmail(field.value)) {
                        errorElement.textContent = 'Please enter a valid email address';
                        errorElement.style.display = 'block';
                    }
                    break;
                    
                case 'message':
                    if (!field.value.trim()) {
                        errorElement.textContent = 'Message is required';
                        errorElement.style.display = 'block';
                    } else if (field.value.trim().length < 10) {
                        errorElement.textContent = 'Message must be at least 10 characters';
                        errorElement.style.display = 'block';
                    }
                    break;
            }
        }
    }
});