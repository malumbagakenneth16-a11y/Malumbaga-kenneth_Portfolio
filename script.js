const menuToggle = document.querySelector("#menu-toggle");
const siteNav = document.querySelector("#site-nav");
const navLinks = document.querySelectorAll(".navbar a");
const typedText = document.querySelector(".typed-text");
const aboutModal = document.querySelector("#about-modal");
const openAboutModal = document.querySelector("#open-about-modal");
const closeAboutModal = document.querySelector("#close-about-modal");
const projectModal = document.querySelector("#project-modal");
const closeProjectModal = document.querySelector("#close-project-modal");
const projectButtons = document.querySelectorAll(".project-open");
const projectModalType = document.querySelector("#project-modal-type");
const projectModalTitle = document.querySelector("#project-modal-title");
const projectModalImage = document.querySelector("#project-modal-image");
const projectModalDescription = document.querySelector("#project-modal-description");
const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");

if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", () => {
        const isOpen = siteNav.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            siteNav.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
        });
    });
}

if (typedText) {
    const roles = ["Web Developer", "Back End Developer"];
    const typingSpeed = 110;
    const erasingSpeed = 65;
    const wordPause = 1500;
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typeRole = () => {
        const currentRole = roles[roleIndex];

        if (isDeleting) {
            typedText.textContent = currentRole.slice(0, charIndex - 1);
            charIndex -= 1;
        } else {
            typedText.textContent = currentRole.slice(0, charIndex + 1);
            charIndex += 1;
        }

        let nextDelay = isDeleting ? erasingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            nextDelay = wordPause;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            nextDelay = 350;
        }

        window.setTimeout(typeRole, nextDelay);
    };

    typedText.textContent = "";
    window.setTimeout(typeRole, 400);
}

if (aboutModal && openAboutModal && closeAboutModal) {
    const toggleModal = (shouldOpen) => {
        aboutModal.classList.toggle("open", shouldOpen);
        aboutModal.setAttribute("aria-hidden", String(!shouldOpen));
        document.body.style.overflow = shouldOpen ? "hidden" : "";
    };

    openAboutModal.addEventListener("click", () => {
        toggleModal(true);
    });

    closeAboutModal.addEventListener("click", () => {
        toggleModal(false);
    });

    aboutModal.addEventListener("click", (event) => {
        if (event.target === aboutModal) {
            toggleModal(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && aboutModal.classList.contains("open")) {
            toggleModal(false);
        }
    });
}

if (
    projectModal &&
    closeProjectModal &&
    projectButtons.length > 0 &&
    projectModalType &&
    projectModalTitle &&
    projectModalImage &&
    projectModalDescription
) {
    const toggleProjectModal = (shouldOpen) => {
        projectModal.classList.toggle("open", shouldOpen);
        projectModal.setAttribute("aria-hidden", String(!shouldOpen));
        document.body.style.overflow = shouldOpen ? "hidden" : "";
    };

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const { projectType, projectTitle, projectImage, projectAlt, projectDescription } = button.dataset;

            projectModalType.textContent = projectType;
            projectModalTitle.textContent = projectTitle;
            projectModalImage.src = projectImage;
            projectModalImage.alt = projectAlt;
            projectModalDescription.textContent = projectDescription;

            toggleProjectModal(true);
        });
    });

    closeProjectModal.addEventListener("click", () => {
        toggleProjectModal(false);
    });

    projectModal.addEventListener("click", (event) => {
        if (event.target === projectModal) {
            toggleProjectModal(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && projectModal.classList.contains("open")) {
            toggleProjectModal(false);
        }
    });
}

if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            contactStatus.textContent = "Please complete the required fields first.";
            return;
        }

        const formData = new FormData(contactForm);
        const fullName = String(formData.get("full_name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const subject = String(formData.get("subject") || "").trim();
        const message = String(formData.get("message") || "").trim();

        const emailSubject = `${subject} - ${fullName}`;
        const emailBody = [
            `Full Name: ${fullName}`,
            `Email Address: ${email}`,
            `Phone Number: ${phone || "Not provided"}`,
            "",
            "Message:",
            message
        ].join("\n");

        const mailtoUrl =
            `mailto:malumbagakenneth16@gmail.com` +
            `?subject=${encodeURIComponent(emailSubject)}` +
            `&body=${encodeURIComponent(emailBody)}`;

        contactStatus.textContent = "Opening your email app...";
        window.location.href = mailtoUrl;
    });
}
