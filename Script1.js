/**
 * DBIT Mumbai | SGPA Engine Logic
 * This script handles the Mumbai University Choice Based Grading System (CBGS).
 */

// 1. Mumbai University Grade Point Table
// Maps marks (out of 100) to the corresponding Grade Points (GP)
function getGradePoint(marks) {
    if (marks >= 80) return 10; // O (Outstanding)
    if (marks >= 75) return 9;  // A (Excellent)
    if (marks >= 70) return 8;  // B (Very Good)
    if (marks >= 60) return 7;  // C (Good)
    if (marks >= 50) return 6;  // D (Fair)
    if (marks >= 45) return 5;  // E (Average)
    if (marks >= 40) return 4;  // P (Pass)
    return 0; // F (Fail)
}

// 2. Main Calculation Function
function calculateSGPA() {
    // Subject configuration based on DBIT Sem-I (Comp. Engg)
    const subjects = [
        { id: "maths", cr: 4.0 },
        { id: "physics", cr: 2.0 },
        { id: "chemistry", cr: 2.0 },
        { id: "eg", cr: 3.0 },
        { id: "bede", cr: 3.0 }
    ];

    let totalPoints = 0;
    let totalCredits = 0;
    let errorDetected = false;

    subjects.forEach(sub => {
        const inputElement = document.getElementById(sub.id);
        const marks = parseFloat(inputElement.value);

        // Validation: Ensure marks are between 0 and 100
        if (isNaN(marks) || marks < 0 || marks > 100) {
            inputElement.style.borderColor = "#ef4444"; // Highlight error in red
            errorDetected = true;
        } else {
            // Use the CSS variable for the border to maintain theme consistency
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

    // SGPA Formula: Σ(Grade Points * Credits) / Σ(Total Credits)
    const sgpa = (totalPoints / totalCredits).toFixed(2);
    
    // 3. UI Updates with Feedback
    const display = document.getElementById("resultValue");
    const label = document.getElementById("resultLabel");
    
    label.innerText = "YOUR FINAL POINTER";
    display.innerText = sgpa;

    // Color code the result based on performance
    if (sgpa >= 9.0) {
        display.style.color = "#fbbf24"; // Gold for toppers
    } else if (sgpa >= 7.5) {
        display.style.color = "#38bdf8"; // DBIT Blue
    } else if (sgpa >= 4.0) {
        display.style.color = "var(--text)"; // Normal text color
    } else {
        display.style.color = "#f87171"; // Red for concern
    }
}

// 4. Theme Toggle Logic
function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById("theme-icon");
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    // Update attribute and save to local storage
    html.setAttribute("data-theme", newTheme);
    localStorage.setItem("sgpa-theme", newTheme);
    
    // Change icon based on theme
    icon.innerText = newTheme === "dark" ? "🌙" : "☀️";
}

// 5. Initialize Theme on Load
// This prevents the "flash" of light mode if the user prefers dark mode
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem("sgpa-theme") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
    
    const icon = document.getElementById("theme-icon");
    if(icon) {
        icon.innerText = savedTheme === "dark" ? "🌙" : "☀️";
    }
});