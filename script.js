/* ═══════════════════════════════════════
   ELEMENT REFERENCES
═══════════════════════════════════════ */
const menuToggle       = document.querySelector("#menu-toggle");
const siteNav          = document.querySelector("#site-nav");
const navLinks         = document.querySelectorAll(".navbar a");
const typedText        = document.querySelector(".typed-text");
const aboutModal       = document.querySelector("#about-modal");
const openAboutModal   = document.querySelector("#open-about-modal");
const closeAboutModal  = document.querySelector("#close-about-modal");
const projectModal     = document.querySelector("#project-modal");
const closeProjectBtn  = document.querySelector("#close-project-modal");
const projectButtons   = document.querySelectorAll(".project-open");
const projectModalType = document.querySelector("#project-modal-type");
const projectModalTitle= document.querySelector("#project-modal-title");
const projectModalImage= document.querySelector("#project-modal-image");
const projectModalDesc = document.querySelector("#project-modal-description");
const contactForm      = document.querySelector("#contact-form");
const contactStatus    = document.querySelector("#contact-status");
const header           = document.querySelector("#header");
const scrollTopBtn     = document.querySelector("#scroll-top");

/* ═══════════════════════════════════════
   MOBILE NAV
═══════════════════════════════════════ */
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

/* ═══════════════════════════════════════
   TYPEWRITER
═══════════════════════════════════════ */
if (typedText) {
    const roles = ["Web Developer", "Back End Developer", "PHP Developer"];
    const typingSpeed  = 110;
    const erasingSpeed = 65;
    const wordPause    = 1800;
    let roleIndex = 0, charIndex = 0, isDeleting = false;

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
            isDeleting  = true;
            nextDelay   = wordPause;
        } else if (isDeleting && charIndex === 0) {
            isDeleting  = false;
            roleIndex   = (roleIndex + 1) % roles.length;
            nextDelay   = 350;
        }

        window.setTimeout(typeRole, nextDelay);
    };

    typedText.textContent = "";
    window.setTimeout(typeRole, 500);
}

/* ═══════════════════════════════════════
   HEADER SCROLL SHADOW
═══════════════════════════════════════ */
if (header) {
    const handleHeaderScroll = () => {
        header.classList.toggle("scrolled", window.scrollY > 40);
    };
    window.addEventListener("scroll", handleHeaderScroll, { passive: true });
}

/* ═══════════════════════════════════════
   ACTIVE NAV ON SCROLL
═══════════════════════════════════════ */
const sections = document.querySelectorAll("section[id]");
const allNavLinks = document.querySelectorAll(".nav-link");

const updateActiveNav = () => {
    let current = "";
    sections.forEach((section) => {
        const sectionTop    = section.offsetTop - 160;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.id;
        }
    });
    allNavLinks.forEach((link) => {
        link.classList.toggle("active", link.dataset.section === current);
    });
};
window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

/* ═══════════════════════════════════════
   SCROLL TO TOP BUTTON
═══════════════════════════════════════ */
if (scrollTopBtn) {
    window.addEventListener("scroll", () => {
        scrollTopBtn.classList.toggle("visible", window.scrollY > 400);
    }, { passive: true });

    scrollTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

/* ═══════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════ */
const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right").forEach((el) => {
    revealObserver.observe(el);
});

/* ═══════════════════════════════════════
   ABOUT MODAL
═══════════════════════════════════════ */
if (aboutModal && openAboutModal && closeAboutModal) {
    const toggleAboutModal = (shouldOpen) => {
        aboutModal.classList.toggle("open", shouldOpen);
        aboutModal.setAttribute("aria-hidden", String(!shouldOpen));
        document.body.style.overflow = shouldOpen ? "hidden" : "";
    };

    openAboutModal.addEventListener("click", () => toggleAboutModal(true));
    closeAboutModal.addEventListener("click", () => toggleAboutModal(false));
    aboutModal.addEventListener("click", (e) => {
        if (e.target === aboutModal) toggleAboutModal(false);
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && aboutModal.classList.contains("open")) toggleAboutModal(false);
    });
}

/* ═══════════════════════════════════════
   PROJECT MODAL
═══════════════════════════════════════ */
if (projectModal && closeProjectBtn && projectButtons.length > 0) {
    const toggleProjectModal = (shouldOpen) => {
        projectModal.classList.toggle("open", shouldOpen);
        projectModal.setAttribute("aria-hidden", String(!shouldOpen));
        document.body.style.overflow = shouldOpen ? "hidden" : "";
    };

    projectButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const { projectType, projectTitle, projectImage, projectAlt, projectDescription } = button.dataset;
            if (projectModalType)  projectModalType.textContent  = projectType;
            if (projectModalTitle) projectModalTitle.textContent = projectTitle;
            if (projectModalImage) {
                projectModalImage.src = projectImage;
                projectModalImage.alt = projectAlt;
            }
            if (projectModalDesc)  projectModalDesc.textContent  = projectDescription;
            toggleProjectModal(true);
        });
    });

    closeProjectBtn.addEventListener("click", () => toggleProjectModal(false));
    projectModal.addEventListener("click", (e) => {
        if (e.target === projectModal) toggleProjectModal(false);
    });
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && projectModal.classList.contains("open")) toggleProjectModal(false);
    });
}

/* ═══════════════════════════════════════
   CONTACT FORM
═══════════════════════════════════════ */
if (contactForm && contactStatus) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.reportValidity()) {
            contactStatus.textContent = "Please complete the required fields first.";
            return;
        }

        const formData  = new FormData(contactForm);
        const fullName  = String(formData.get("full_name") || "").trim();
        const email     = String(formData.get("email") || "").trim();
        const phone     = String(formData.get("phone") || "").trim();
        const subject   = String(formData.get("subject") || "").trim();
        const message   = String(formData.get("message") || "").trim();

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
