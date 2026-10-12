
// ===============================
// FITTRACK - ABOUT PAGE JAVASCRIPT
// ===============================
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {

    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
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
sections.forEach(function (section) {
    section.classList.add("hidden");
    observer.observe(section);
});
cards.forEach(function (card, index) {
    card.classList.add("hidden");
    // Slight delay between cards
    card.style.transitionDelay = (index * 0.1) + "s";
    observer.observe(card);
});
const backToTop = document.createElement("button");
backToTop.innerHTML = "↑";
backToTop.className = "back-to-top";
backToTop.title = "Back to top";
document.body.appendChild(backToTop);
window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        backToTop.classList.add("visible");
    } else {
        backToTop.classList.remove("visible");
    }
});
backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
cards.forEach(function (card) {
    card.addEventListener("click", function () {
        cards.forEach(function (otherCard) {
            if (otherCard !== card) {
                otherCard.classList.remove("active");
            }
        });
        card.classList.toggle("active");
    });
});
const navLinks = document.querySelectorAll(".nav-links a");
navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
        const href = link.getAttribute("href");
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
const footerText = document.querySelector("footer p");
if (footerText) {
    const currentYear = new Date().getFullYear();
    footerText.innerHTML =
        "© " + currentYear + " FitTrack | Your Fitness Companion";
}
const header = document.querySelector(".about-header");
if (header) {

    header.classList.add("header-animation");
}
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
console.log("FitTrack About Us page loaded successfully!");