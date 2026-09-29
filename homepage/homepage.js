// ------------------------------------------
// 1. Navbar scroll effect
// ------------------------------------------
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", function () {

    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
// ------------------------------------------
// 2. Hero section entrance animation
// ------------------------------------------
const hero = document.querySelector(".hero");
window.addEventListener("load", function () {
    if (hero) {
        hero.classList.add("hero-show");
    }
});
// ------------------------------------------
// 3. Feature cards scroll animation
// ------------------------------------------
const featureCards = document.querySelectorAll(".feature-card");
const cardObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add("card-show");
            }
        });
    },
    {
        threshold: 0.2
    }
);
featureCards.forEach(function (card, index) {
    card.classList.add("card-hidden");
    // Small delay between cards
    card.style.transitionDelay = (index * 0.15) + "s";
    cardObserver.observe(card);
});
// ------------------------------------------
// 4. Feature card click interaction
// ------------------------------------------
featureCards.forEach(function (card) {
    card.addEventListener("click", function () {
        // Remove active state from other cards
        featureCards.forEach(function (otherCard) {
            if (otherCard !== card) {
                otherCard.classList.remove("active-card");
            }
        });
        // Toggle current card
        card.classList.toggle("active-card");
    });
});
// ------------------------------------------
// 5. GET STARTED button effect
// ------------------------------------------
const getStarted = document.querySelector(".get-started");
if (getStarted) {
    getStarted.addEventListener("mouseenter", function () {
        getStarted.classList.add("button-hover");
    });
    getStarted.addEventListener("mouseleave", function () {
        getStarted.classList.remove("button-hover");
    });
}
// ------------------------------------------
// 6. Back to top button
// ------------------------------------------
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
// ------------------------------------------
// 7. Dynamic copyright year
// ------------------------------------------
const footerCopyright = document.querySelector(".footpanel3 p");
if (footerCopyright) {
    const currentYear = new Date().getFullYear();
    footerCopyright.innerHTML =
        "© " + currentYear +
        " FitTrack | Your Fitness Companion";
}
// ------------------------------------------
// 8. Navigation link effect
// ------------------------------------------
const navigationLinks = document.querySelectorAll(".nav-links a");
navigationLinks.forEach(function (link) {
    link.addEventListener("mouseenter", function () {

        link.classList.add("nav-hover");
    });
    link.addEventListener("mouseleave", function () {
        link.classList.remove("nav-hover");
    });
});
// ------------------------------------------
// 9. Footer link interaction
// ------------------------------------------
const footerLinks = document.querySelectorAll(".footpanel1 a");
footerLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        // Prevent empty links from jumping to top
        if (!link.getAttribute("href")) {
            alert("This feature will be available soon!");
        }
    });

});
// ------------------------------------------
// 10. Page load message
// ------------------------------------------
console.log("FitTrack Homepage loaded successfully!");


