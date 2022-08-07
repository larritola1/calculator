inputs.forEach((button) => {
    button.addEventListener("click", () => {
        deselectButton();
        
        if (button.className !== "active") {
            button.classList.add("active");
        }
    });
});

function deselectButton() {
    inputs.forEach((button) => {
        if (button.className == "active") {
            button.classList.remove("active");
        }
    });
}