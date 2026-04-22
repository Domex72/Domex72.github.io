// Handle Contact Form Submission
const contactForm = document.getElementById("contactForm");
const responseMessage = document.getElementById("responseMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        // Prevents the page from reloading
        event.preventDefault(); 
        
        // Hide the form and show the thank you message
        contactForm.style.display = "none";
        responseMessage.style.display = "block";
        
        // Optional: Log the data to console to see it working
        const name = document.getElementById("userName").value;
        console.log("Form submitted by:", name);
    });
}