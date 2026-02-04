/**
 * DBIT Mumbai | SGPA Engine Logic
 * Corrected Credits for Sem I: Maths (4), Physics (2.5), Chemistry (2.5)
 */

// 1. Mumbai University Grade Point Table
function getGradePoint(marks) {
    if (marks >= 80) return 10;
    if (marks >= 75) return 9;
    if (marks >= 70) return 8;
    if (marks >= 60) return 7;
    if (marks >= 50) return 6;
    if (marks >= 45) return 5;
    if (marks >= 40) return 4;
    return 0; 
}

// 2. Main Calculation Function
function calculateSGPA() {
    // UPDATED CREDITS: Physics and Chemistry changed to 2.5
    const subjects = [
        { id: "maths", cr: 4.0 },
        { id: "physics", cr: 2.5 },
        { id: "chemistry", cr: 2.5 },
        { id: "eg", cr: 3.0 },
        { id: "bede", cr: 3.0 }
    ];

    let totalPoints = 0;
    let totalCredits = 0;
    let errorDetected = false;

    subjects.forEach(sub => {
        const inputElement = document.getElementById(sub.id);
        const marks = parseFloat(inputElement.value);

        if (isNaN(marks) || marks < 0 || marks > 100) {
            inputElement.style.borderColor = "#ef4444"; 
            errorDetected = true;
        } else {
            inputElement.style.borderColor = "var(--glass-border)";
            const gp = getGradePoint(marks);
            totalPoints += (gp * sub.cr);
            totalCredits += sub.cr;
        }
    });

    if (errorDetected) {
        alert("Please enter valid marks (0-100) for all subjects.");
        return;
    }

    const sgpa = (totalPoints / totalCredits).toFixed(2);
    
    const display = document.getElementById("resultValue");
    const label = document.getElementById("resultLabel");
    
    label.innerText = "YOUR FINAL POINTER";
    display.innerText = sgpa;

    if (sgpa >= 9.0) display.style.color = "#fbbf24";
    else if (sgpa >= 7.5) display.style.color = "#38bdf8";
    else display.style.color = "#f87171";
}

// 3. Theme Toggle Logic
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById("theme-icon");
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("sgpa-theme", newTheme);
    icon.innerText = newTheme === "dark" ? "🌙" : "☀️";
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("sgpa-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    const icon = document.getElementById("theme-icon");
    if(icon) icon.innerText = savedTheme === "dark" ? "🌙" : "☀️";
});
