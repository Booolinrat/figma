// Function to fetch and display questions for the teacher
function fetchQuestions() {
    fetch("http://localhost:3000/get-questions")
        .then(response => response.json())
        .then(data => {
            const questionsContainer = document.getElementById("questionsContainer");

            // Clear previous questions
            questionsContainer.innerHTML = "";

            // Loop through the questions and create elements to display them
            data.forEach((entry, index) => {
                const questionBox = document.createElement("div");
                questionBox.classList.add("question-box");

                const classCodeElement = document.createElement("p");
                classCodeElement.textContent = `Class Code: ${entry.classCode}`;
                questionBox.appendChild(classCodeElement);

                const questionElement = document.createElement("p");
                questionElement.textContent = `Question: ${entry.question}`;
                questionBox.appendChild(questionElement);

                // Append the question box to the container
                questionsContainer.appendChild(questionBox);
            });
        })
        .catch(error => {
            console.error("Error fetching questions:", error);
        });
}

// Fetch questions immediately when the page loads
window.onload = function() {
    fetchQuestions();  // Initial fetch when the page loads

    // Periodically fetch questions every 5 seconds (5000 milliseconds)
    setInterval(fetchQuestions, 5000);  // This will refresh the questions every 5 seconds
};
