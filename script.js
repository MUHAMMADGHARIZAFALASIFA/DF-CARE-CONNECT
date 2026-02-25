// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Fade-in animation
const sections = document.querySelectorAll("section");

window.addEventListener("scroll", () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if(sectionTop < window.innerHeight - 100){
            section.classList.add("show");
        }
    });
});

// ===== CHALLENGE SYSTEM =====
let users = JSON.parse(localStorage.getItem("users")) || {};
let currentUser = "";
let previousLevel = 1;

function setUser(){
    const name = document.getElementById("username").value.trim();
    if(!name) return alert("Masukkan nama!");

    currentUser = name;

    if(!users[name]){
        users[name] = {xp:0};
    }

    previousLevel = getLevel(users[name].xp);

    document.getElementById("userArea").style.display="block";
    saveData();
    updateUI();
}

function addXP(amount){
    if(!currentUser) return alert("Masukkan nama dulu!");

    users[currentUser].xp += amount;

    const newLevel = getLevel(users[currentUser].xp);

    if(newLevel > previousLevel){
        showLevelUp();
        previousLevel = newLevel;
    }

    saveData();
    updateUI();
}

function getLevel(xp){
    return Math.floor(xp/100)+1;
}

function updateUI(){
    const xp = users[currentUser].xp;
    const level = getLevel(xp);
    const percent = xp % 100;

    document.getElementById("xp").innerText = xp;
    document.getElementById("level").innerText = level;

    const bar = document.getElementById("xpBar");
    bar.style.width = percent+"%";
    bar.innerText = percent+"%";

    updateLeaderboard();
}

function updateLeaderboard(){
    const sorted = Object.entries(users)
        .sort((a,b)=>b[1].xp - a[1].xp)
        .slice(0,5);

    const list = document.getElementById("leaderboard");
    list.innerHTML="";

    sorted.forEach(u=>{
        const li=document.createElement("li");
        li.innerText=u[0]+" - "+u[1].xp+" XP";
        list.appendChild(li);
    });
}

function showLevelUp(){
    const popup = document.getElementById("levelUpAnimation");
    popup.classList.add("show");
    setTimeout(()=> popup.classList.remove("show"),2000);
}

function saveData(){
    localStorage.setItem("users", JSON.stringify(users));
}