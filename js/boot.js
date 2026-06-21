window.addEventListener("load", () => {

    const boot = document.getElementById("bootScreen");
    const menu = document.getElementById("menuScreen");

    setTimeout(() => {

        boot.style.opacity = "0";

        setTimeout(() => {

            boot.classList.remove("active");
            menu.classList.add("active");

        },1200);

    },5000);

});