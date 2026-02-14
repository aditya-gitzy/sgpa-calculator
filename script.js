
function getGradePoint(percentage) {
    if (percentage >= 90) return 10; 
    if (percentage >= 80) return 9;  
    if (percentage >= 75) return 8;  
    if (percentage >= 70) return 7;  
    if (percentage >= 60) return 6;  
    if (percentage >= 50) return 5;  
    if (percentage >= 40) return 4;  
    return 0; 
}


function calculateSGPA() {
   
    const subjects = [
        // Mathematics-I (Total 4.0 Cr)
        { id: "maths_th", max: 100, cr: 3.0 },
        { id: "maths_tw", max: 25, cr: 1.0 },
        
        // Physics-I (Total 2.5 Cr)
        { id: "phy_th", max: 100, cr: 2.0 },
        { id: "phy_lab", max: 25, cr: 0.5 },
        
        // Chemistry-I (Total 2.5 Cr)
        { id: "chem_th", max: 100, cr: 2.0 },
        { id: "chem_lab", max: 25, cr: 0.5 },
        
        // Graphics (Total 3.0 Cr)
        { id: "eg_th", max: 100, cr: 2.0 },
        { id: "eg_lab", max: 25, cr: 1.0 },

        // BEDE (Total 3.0 Cr)
        { id: "bede_th", max: 100, cr: 2.0 },
        { id: "bede_lab", max: 50, cr: 1.0 },
        
        // C Programming (Total 2.0 Cr)
        { id: "cp_th", max: 25, cr: 1.0 },
        { id: "cp_lab", max: 25, cr: 1.0 },

        // UHV (Total 2.0 Cr)
        { id: "uhv", max: 50, cr: 2.0 },

        // Workshop-1 (Total 2.0 Cr)
        { id: "workshop", max: 50, cr: 2.0 }
    ];

    let totalPoints = 0;
    let totalCredits = 0;
    let errorDetected = false;

    subjects.forEach(sub => {
        const inputElement = document.getElementById(sub.id);
        const marks = parseFloat(inputElement.value);

       
        if (isNaN(marks) || marks < 0 || marks > sub.max) {
            inputElement.style.borderColor = "#ef4444";
            errorDetected = true;
        } else {
            inputElement.style.borderColor = "var(--glass-border)";
            
           
            const percentage = (marks / sub.max) * 100;
            const gp = getGradePoint(percentage);
            
            totalPoints += (gp * sub.cr);
            totalCredits += sub.cr;
        }
    });

    if (errorDetected) {
        alert("Please check your entries. Marks cannot exceed the maximum for that subject.");
        return;
    }

    
    const sgpa = (totalPoints / totalCredits).toFixed(2);
    
    
    const display = document.getElementById("resultValue");
    const label = document.getElementById("resultLabel");
    
    label.innerText = "YOUR ESTIMATED POINTER";
    display.innerText = sgpa;

    
    if (sgpa >= 9.0) {
        display.style.color = "#fbbf24"; 
    } else if (sgpa >= 7.5) {
        display.style.color = "#38bdf8"; 
    } else if (sgpa >= 4.0) {
        display.style.color = "var(--text)"; 
    } else {
        display.style.color = "#f87171"; 
    }
}


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
    if(icon) {
        icon.innerText = savedTheme === "dark" ? "🌙" : "☀️";
    }
});

