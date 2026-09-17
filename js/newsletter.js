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

        // email validasi
        const isValidEmail = (email) => {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(String(email).toLowerCase());
        };

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            nameError.classList.add('hidden');
            emailError.classList.add('hidden');
            messageError.classList.add('hidden');

            nameInput.classList.remove('border-red-500');
            emailInput.classList.remove('border-red-500');
            messageInput.classList.remove('border-red-500');

            let isValid = true;

            // cek nama
            if (nameInput.value.trim() === '') {
                nameError.classList.remove('hidden');
                nameInput.classList.add('border-red-500');
                isValid = false;
            }

            // cek emasil
            if (!isValidEmail(emailInput.value)) {
                emailError.classList.remove('hidden');
                emailInput.classList.add('border-red-500');
                isValid = false;
            }

            //input pesan
            if (messageInput.value.trim() === '') {
                messageError.classList.remove('hidden');
                messageInput.classList.add('border-red-500');
                isValid = false;
            }

            if (isValid) {
                const originalBtnText = submitBtn.innerHTML;
                submitBtn.innerHTML = `
                    <svg class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Mengirim...</span>
                `;
                submitBtn.disabled = true;

    
                setTimeout(() => {
                    successModal.classList.remove('hidden');

                    requestAnimationFrame(() => {
                        modalContent.classList.add('modal-show');
                    });

                    contactForm.reset();
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });

        const closeModal = () => {
            modalContent.classList.remove('modal-show');
            setTimeout(() => {
                successModal.classList.add('hidden');
            }, 300);
        };

        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', closeModal);
        }
        successModal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-backdrop')) {
                closeModal();
            }
        });
    }
});
