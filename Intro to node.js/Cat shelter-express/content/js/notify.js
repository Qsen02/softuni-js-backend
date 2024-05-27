window.addEventListener("load", start);

function start() {
    let divEl = document.querySelector(".notification")
    divEl.style.display = "block";
    divEl.addEventListener("click", closing);

    setTimeout(() => divEl.style.display = "none", 3000);

    function closing(event) {
        divEl.style.display = "none";
    }
}