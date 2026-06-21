const Animation = {

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },

    fadeIn(element, duration = 400) {

        element.style.display = "";
        element.style.opacity = 0;

        element.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration,
            fill: "forwards",
            easing: "ease"
        });

    },

    fadeOut(element, duration = 400) {

        const anim = element.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration,
            fill: "forwards",
            easing: "ease"
        });

        anim.onfinish = () => {
            element.style.display = "none";
        };

    },

    shake(element, duration = 250) {

        element.animate([
            { transform: "translate(0px,0px)" },
            { transform: "translate(-3px,2px)" },
            { transform: "translate(3px,-2px)" },
            { transform: "translate(-2px,1px)" },
            { transform: "translate(2px,-1px)" },
            { transform: "translate(0px,0px)" }
        ], {
            duration,
            easing: "linear"
        });

    },

    flash(duration = 120) {

        let flash = document.getElementById("screenFlash");

        if (!flash) {

            flash = document.createElement("div");
            flash.id = "screenFlash";

            document.body.appendChild(flash);

        }

        flash.animate([
            { opacity: 0 },
            { opacity: 0.95 },
            { opacity: 0 }
        ], {
            duration,
            easing: "ease-out"
        });

    },

    glitch(element, duration = 350) {

        element.classList.add("glitch");

        setTimeout(() => {

            element.classList.remove("glitch");

        }, duration);

    }

};