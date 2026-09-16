document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        const successModal = document.getElementById('success-modal');
        const modalContent = document.getElementById('modal-content');
        const closeModalBtn = document.getElementById('close-modal-btn');
        const submitBtn = document.getElementById('submit-btn');

        // Helper function for email validation
        const isValidEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Reset errors
            nameError.classList.add('hidden');
            emailError.classList.add('hidden');
            messageError.classList.add('hidden');

            nameInput.classList.remove('border-red-500');
            emailInput.classList.remove('border-red-500');
            messageInput.classList.remove('border-red-500');

            let isValid = true;

            // Validate Name
            if (nameInput.value.trim() === '') {
                nameError.classList.remove('hidden');
                nameInput.classList.add('border-red-500');
                isValid = false;
            }

            // Validate Email
            if (!isValidEmail(emailInput.value)) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-500');
                isValid = false;
            }

            // Validate Message
            if (messageInput.value.trim() === '') {
                messageError.classList.remove('hidden');
                messageInput.classList.add('border-red-500');
                isValid = false;
            }

            // If valid, show success modal (Simulate API request)
            if (isValid) {
                // Change button state to simulate loading
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = `
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Mengirim...</span>
                `;
                submitBtn.disabled = true;

                // Simulate network request delay
                setTimeout(() => {
                    // Show modal
                    successModal.classList.remove('hidden');

                    // Trigger animation in next frame
                    requestAnimationFrame(() => {
                        modalContent.classList.add('modal-show');
                    });

                    // Reset form & button
                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });

        // Close Modal Logic
        const closeModal = () => {
            modalContent.classList.remove('modal-show');
            setTimeout(() => {
                successModal.classList.add('hidden');
            }, 300); // Wait for transition
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }

        // Close on clicking backdrop
        successModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });
    }
});
