
// ===============================
// FITTRACK - ABOUT PAGE JAVASCRIPT
// ===============================
// --------------------------------
// 1. Navbar effect while scrolling
// --------------------------------
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", function () {

    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});
// --------------------------------
// 2. Scroll reveal animation
// --------------------------------
const sections = document.querySelectorAll(
    ".about-introduction, .about-features, .our-goal"
);
const cards = document.querySelectorAll(".about-card");
const observer = new IntersectionObserver(
    function (entries) {

        entries.forEach(function (entry) {

            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }

        });

    },
    {
        threshold: 0.15
    }
);
// Observe sections
sections.forEach(function (section) {
    section.classList.add("hidden");
    observer.observe(section);
});
// Observe feature cards
cards.forEach(function (card, index) {

    card.classList.add("hidden");

    // Slight delay between cards
    card.style.transitionDelay = (index * 0.1) + "s";

    observer.observe(card);

});
//-------------------------------
// 3. Back to top button
// --------------------------------
const backToTop = document.createElement("button");
backToTop.innerHTML = "↑";
backToTop.className = "back-to-top";
backToTop.title = "Back to top";
document.body.appendChild(backToTop);
// Show button after scrolling
window.addEventListener("scroll", function () {

    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }

});
// Scroll to top
backToTop.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});
// --------------------------------
// 4. Feature card interaction
// --------------------------------
cards.forEach(function (card) {

    card.addEventListener("click", function () {

        // Remove active class from other cards
        cards.forEach(function (otherCard) {
            if (otherCard !== card) {
                otherCard.classList.remove("active");
            }
        });

        // Toggle current card
        card.classList.toggle("active");

    });

});
// --------------------------------
// 5. Smooth navigation
// --------------------------------
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const href = link.getAttribute("href");

        // Only apply smooth behavior to
        // links pointing to the current page
        if (href && href.startsWith("#")) {

            event.preventDefault();

            const target = document.querySelector(href);

            if (target) {

                target.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }

    });

});
// --------------------------------
// 6. Dynamic footer year
// --------------------------------
const footerText = document.querySelector("footer p");
if (footerText) {

    const currentYear = new Date().getFullYear();

    footerText.innerHTML =
        "© " + currentYear + " FitTrack | Your Fitness Companion";

}
// --------------------------------
// 7. Welcome animation
// --------------------------------
const header = document.querySelector(".about-header");
if (header) {

    header.classList.add("header-animation");

}
// --------------------------------
// 8. Login / Sign Up button effect
// --------------------------------
const buttons = document.querySelectorAll(
    ".login-btn, .signup-btn"
);
buttons.forEach(function (button) {

    button.addEventListener("mouseenter", function () {
        button.style.transform = "translateY(-2px)";
    });

    button.addEventListener("mouseleave", function () {
        button.style.transform = "translateY(0)";
    });

});
// --------------------------------
// 9. Console message
// --------------------------------
console.log("FitTrack About Us page loaded successfully!");

