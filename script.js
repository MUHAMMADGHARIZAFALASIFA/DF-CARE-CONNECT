// Smooth Scroll Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in animation saat scroll
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight - 100;

        if(sectionTop < triggerPoint){
            section.classList.add("show");
        }
    });
});

// Efek header berubah saat scroll
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if(window.scrollY > 50){
        header.style.background = "#1e3c72";
    } else {
        header.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    }
});
