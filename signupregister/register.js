// ==========================================
// FITTRACK - REGISTER & LOGIN JAVASCRIPT
// ==========================================
const signupForm = document.querySelector(".form-part1");
const forms = document.querySelectorAll("form");
const signupPart1 = document.querySelectorAll(".form-part1")[0];
const loginPart1 = document.querySelectorAll(".form-part1")[1];
const allInputs = document.querySelectorAll(
    ".form-part1 input"
);
if (signupPart1) {
    signupPart1.addEventListener("submit", function (event) {
        event.preventDefault();
        const inputs = signupPart1.querySelectorAll("input");
        const nickname = inputs[0].value.trim();
        const age = inputs[1].value.trim();
        const height = inputs[3].value.trim();
        const weight = inputs[4].value.trim();
        const email = inputs[5].value.trim();
        const password = inputs[6].value;
        const confirmPassword = inputs[7].value;
        if (nickname === "") {
            alert("Please enter your nickname.");
            return;
        }
        if (age === "" || isNaN(age)) {
            alert("Please enter a valid age.");
            return;
        }
        if (Number(age) < 13 || Number(age) > 100) {
            alert("Please enter an age between 13 and 100.");
            return;
        }
        const gender = document.querySelector(
            'input[name="gender"]:checked'
        );
        if (!gender) {
            alert("Please select your gender.");
            return;
        }
        if (height === "" || isNaN(height)) {
            alert("Please enter a valid height.");
            return;
        }
        if (Number(height) < 50 || Number(height) > 250) {
            alert("Please enter a valid height between 50 and 250 cm.");
            return;
        }
        if (weight === "" || isNaN(weight)) {
            alert("Please enter a valid weight.");
            return;
        }
        if (Number(weight) < 20 || Number(weight) > 300) {
            alert("Please enter a valid weight between 20 and 300 kg.");
            return;
        }
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (password.length < 8) {
            alert("Password must contain at least 8 characters.");
            return;
        }
        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }
        const experience = document.querySelector(
            'input[name="stand"]:checked'
        );
        if (!experience) {
            alert("Please select your experience level.");
            return;
        }
        const goal = document.querySelector(
            'input[name="goal"]:checked'
        );
        if (!goal) {
            alert("Please select your fitness goal.");
            return;
        }
        const heightInMeters =
            Number(height) / 100;
        const bmi =
            Number(weight) /
            (heightInMeters * heightInMeters);
        alert(
            "Registration successful!\n\n" +
            "Welcome to FitTrack, " + nickname + "!\n\n" +
            "Your BMI is: " + bmi.toFixed(1)
        );
        signupPart1.reset();
        document.querySelector(
            ".form-part2"
        ).reset();
    });
}
if (loginPart1) {
    loginPart1.addEventListener("submit", function (event) {
        event.preventDefault();
        const loginInputs =
            loginPart1.querySelectorAll("input");
        const email =
            loginInputs[0].value.trim();
        const password =
            loginInputs[1].value;
        if (email === "") {
            alert("Please enter your email.");
            return;
        }
        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (password === "") {
            alert("Please enter your password.");
            return;
        }
        if (password.length < 8) {
            alert(
                "Password must contain at least 8 characters."
            );
            return;
        }
        alert(
            "Login successful!\n\n" +
            "Welcome back to FitTrack!"
        );
    });
}
const passwordInputs =
    document.querySelectorAll('input[type="password"]');
passwordInputs.forEach(function (input) {
    const toggleButton =
        document.createElement("button");
    toggleButton.type = "button";
    toggleButton.innerText = "Show";
    toggleButton.style.marginLeft = "5px";
    toggleButton.style.padding = "4px 8px";
    input.parentNode.insertBefore(
        toggleButton,
        input.nextSibling
    );
    toggleButton.addEventListener(
        "click",
        function () {
            if (input.type === "password") {
                input.type = "text";
                toggleButton.innerText = "Hide";
            } else {
                input.type = "password";
                toggleButton.innerText = "Show";
            }
        }
    );
});
const resetButtons =
    document.querySelectorAll(
        'button[type="reset"]'
    );
resetButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
        const confirmReset =
            confirm(
                "Are you sure you want to clear the form?"
            );
        if (!confirmReset) {
            event.preventDefault();
        }
    });
});
const navbar =
    document.querySelector(".navbar");
window.addEventListener("scroll", function () {
    if (window.scrollY > 20) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});
const navLinks =
    document.querySelectorAll(".nav-links a");
navLinks.forEach(function (link) {
    link.addEventListener(
        "mouseenter",
        function () {
            link.classList.add("nav-hover");

        }
    );
    link.addEventListener(
        "mouseleave",
        function () {
            link.classList.remove("nav-hover");

        }
    );
});
const footerText =
    document.querySelector("footer p");
if (footerText) {
    const currentYear =
        new Date().getFullYear();
    footerText.innerHTML =
        "© " + currentYear +
        " FitTrack | Your Fitness Companion";

}
window.addEventListener("load", function () {
    const accountPages =
        document.querySelectorAll(".account-page");
    accountPages.forEach(function (page, index) {
        page.style.opacity = "0";
        page.style.transform =
            "translateY(25px)";
        setTimeout(function () {
            page.style.transition =
                "opacity 0.7s ease, transform 0.7s ease";
            page.style.opacity = "1";
            page.style.transform =
                "translateY(0)";
        }, index * 200);
    });
});
console.log(
    "FitTrack Registration/Login page loaded successfully!"
);
function gotodasboard(event) {
    event.preventDefault();
    window.open("../dashboard/dashboard.html", "_blank");
}