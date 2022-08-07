inputs.forEach((button) => {
    button.addEventListener("click", () => {
        deselectButton();
        
        if (button.className !== "active") {
            button.classList.add("active");
        }
    });
});

window.addEventListener("keydown", (key) => {    
    inputs.forEach((button) => {
        const calcButton = button.textContent;
        let inputKey = key.key;

        if (inputKey === "Enter") {
            inputKey = "=";
        }

        if (calcButton === inputKey) {
            deselectButton();
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