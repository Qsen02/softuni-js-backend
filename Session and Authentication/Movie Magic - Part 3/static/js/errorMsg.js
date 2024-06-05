window.addEventListener("load", start);

function start() {
    const divEl = document.querySelector(".error-container");
    if (divEl) {
        divEl.addEventListener("click", closing);

        if (divEl.style.display == "block") {
            setTimeout(() => divEl.style.display == "none", 5000);
        }

        function closing(event) {
            event.target.style.display = "none";
        }
    }
}