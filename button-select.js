inputs.forEach((button) => {
    button.addEventListener("click", () => {
        if (button.className !== "active") {
            button.classList.add("active");
        }
    });
});