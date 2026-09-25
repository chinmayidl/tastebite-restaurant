// =========================
// TASTEBITE RESTAURANT
// MAIN JAVASCRIPT
// =========================


// =========================
// MOBILE NAVBAR
// =========================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {

        navLinks.classList.toggle("active");

        const isOpen = navLinks.classList.contains("active");

        menuToggle.setAttribute("aria-expanded", isOpen);

        menuToggle.textContent = isOpen ? "✕" : "☰";
    });
}


// Close mobile menu when clicking a navigation link

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (item) {

    item.addEventListener("click", function () {

        if (navLinks) {
            navLinks.classList.remove("active");
        }

        if (menuToggle) {
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        }

    });

});


// =========================
// BOOKING FORM
// =========================

const bookingForm = document.getElementById("bookingForm");
const formStatus = document.getElementById("formStatus");


// Set minimum date to today

const dateInput = document.getElementById("date");

if (dateInput) {

    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    dateInput.min = `${year}-${month}-${day}`;
}


// Booking form submit

if (bookingForm) {

    bookingForm.addEventListener("submit", function (event) {

        event.preventDefault();


        // Get form values

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const guests = document.getElementById("guests").value;
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const message = document.getElementById("message").value.trim();


        // Validate required fields

        if (!name || !phone || !guests || !date || !time) {

            if (formStatus) {
                formStatus.textContent =
                    "Please fill in all required details.";

                formStatus.className = "form-status error";
            } else {
                alert("Please fill in all required details.");
            }

            return;
        }


        // Validate Indian mobile number

        const phonePattern = /^[6-9][0-9]{9}$/;

        if (!phonePattern.test(phone)) {

            if (formStatus) {
                formStatus.textContent =
                    "Please enter a valid 10-digit mobile number.";

                formStatus.className = "form-status error";
            } else {
                alert("Please enter a valid 10-digit mobile number.");
            }

            return;
        }


        // Convert date into readable format

        const selectedDate = new Date(date + "T00:00:00");

        const formattedDate = selectedDate.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }
        );


        // Create WhatsApp message

        let whatsappMessage =
            `Hello TasteBite!%0A%0A` +
            `I would like to book a table.%0A%0A` +
            `Name: ${encodeURIComponent(name)}%0A` +
            `Phone: ${encodeURIComponent(phone)}%0A` +
            `Guests: ${encodeURIComponent(guests)}%0A` +
            `Date: ${encodeURIComponent(formattedDate)}%0A` +
            `Time: ${encodeURIComponent(time)}`;


        // Add special request if entered

        if (message) {

            whatsappMessage +=
                `%0ASpecial Request: ${encodeURIComponent(message)}`;

        }


        // Demo TasteBite WhatsApp number

        const whatsappNumber = "919876543210";


        // WhatsApp URL

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;


        // Show success message

        if (formStatus) {

            formStatus.textContent =
                "Your booking request is ready. Opening WhatsApp...";

            formStatus.className = "form-status success";

        }


        // Open WhatsApp

        window.open(whatsappURL, "_blank");


        // Reset form

        bookingForm.reset();

    });

}


// =========================
// SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(".reveal");

if (revealElements.length > 0) {

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.classList.add("visible");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    revealElements.forEach(function (element) {

        revealObserver.observe(element);

    });

}


// =========================
// BACK TO TOP BUTTON
// =========================

const backToTop = document.getElementById("backToTop");

if (backToTop) {

    window.addEventListener("scroll", function () {

        if (window.scrollY > 500) {

            backToTop.classList.add("show");

        } else {

            backToTop.classList.remove("show");

        }

    });


    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


// =========================
// CURRENT YEAR
// =========================

const currentYear = document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent = new Date().getFullYear();

}


// =========================
// SMOOTH SCROLL
// =========================

document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") {
            return;
        }

        const target = document.querySelector(targetId);

        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

});