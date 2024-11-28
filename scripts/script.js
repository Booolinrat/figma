// Predefined valid class codes for demonstration
const validClassCodes = ["CLASS1", "CLASS2", "CLASS3"];

document.getElementById("validateCode").addEventListener("click", function () {
    const classCodeInput = document.getElementById("classCode").value.trim();
    const questionSection = document.getElementById("questionSection");
    const codeMessage = document.getElementById("codeMessage");

    // Check if the entered code is valid
    if (validClassCodes.includes(classCodeInput)) {
        // Hide the error message (if shown)
        codeMessage.style.display = "none";
        // Show the question input section
        questionSection.style.display = "block";
    } else {
        // Display an error message
        codeMessage.style.display = "block";
        codeMessage.textContent = "Invalid class code. Please try again.";
        // Hide the question input section
        questionSection.style.display = "none";
    }
});

// Handle form submission without refreshing the page
document.getElementById("questionForm").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission

    const classCode = document.getElementById("classCode").value.trim();
    const question = document.getElementById("question").value.trim();

    // Simulate sending data to a server
    fetch("http://localhost:3000/submit-question", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ classCode, question }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Show confirmation message
                document.getElementById("confirmationMessage").style.display = "block";
                document.getElementById("questionSection").style.display = "none";

                // Clear the question textarea
                document.getElementById("question").value = "";
            } else {
                alert("Something went wrong. Please try again.");
            }
        })
        .catch(err => console.error("Error submitting question:", err));
});

// Handle "Submit Another Question" button
document.getElementById("newQuestion").addEventListener("click", function () {
    document.getElementById("confirmationMessage").style.display = "none";
    document.getElementById("questionSection").style.display = "block";
});
