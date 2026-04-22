document.addEventListener("DOMContentLoaded", function () {

    // SELECT AMOUNT
    document.querySelectorAll(".donate").forEach(button => {
        button.addEventListener("click", function () {
            let card = this.closest(".card");
            let amount = card.querySelector("h3").textContent.replace("$", "");
            document.getElementById("amount").value = amount;
        });
    });

    // SUBMIT FORM
    document.getElementById("submit").addEventListener("click", function () {
        let name = document.getElementById("name").value;
        let amount = document.getElementById("amount").value;
        let message = document.getElementById("message");

        if (name === "" || amount === "") {
            message.textContent = "Fill all fields";
        } else {
            message.textContent = `Thanks ${name}! 🌱`;
        }
    });

});