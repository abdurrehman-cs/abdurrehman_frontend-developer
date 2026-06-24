const body = document.body;
const themeBtn = document.getElementById("themeBtn");
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
const links = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("main section");
const topBtn = document.getElementById("topBtn");

/* Dark Mode + Local Storage */
if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark");
    themeBtn.textContent = "☀";
}

themeBtn.addEventListener("click", function () {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");

    if (isDark) {
        localStorage.setItem("theme", "dark");
        themeBtn.textContent = "☀";
    } else {
        localStorage.setItem("theme", "light");
        themeBtn.textContent = "☾";
    }
});

/* Mobile Navigation Menu */
menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("open");
});

/* Close mobile menu after clicking a link */
links.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("open");
    });
});

/* Active Navbar Link While Scrolling */
const sectionObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                links.forEach(function (link) {
                    const sectionId = "#" + entry.target.id;

                    if (link.getAttribute("href") === sectionId) {
                        link.classList.add("active");
                    } else {
                        link.classList.remove("active");
                    }
                });
            }
        });
    },
    {
        threshold: 0.45
    }
);

sections.forEach(function (section) {
    sectionObserver.observe(section);
});

/* Skills Progress Bar Animation */
const skillsSection = document.getElementById("skills");

const skillObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const progressBars = document.querySelectorAll(".bar i");

                progressBars.forEach(function (bar) {
                    bar.style.width = bar.dataset.width + "%";
                });

                skillObserver.unobserve(skillsSection);
            }
        });
    },
    {
        threshold: 0.3
    }
);

skillObserver.observe(skillsSection);

/* Back To Top Button */
window.addEventListener("scroll", function () {
    if (window.scrollY > 400) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
});

topBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});