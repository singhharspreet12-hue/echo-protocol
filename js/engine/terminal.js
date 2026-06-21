const Terminal = {

    element: null,

    cursor: null,

    typingSpeed: 22,

    init(containerId) {

        this.element = document.getElementById(containerId);

        this.element.innerHTML = "";

        this.cursor = document.createElement("span");
        this.cursor.className = "terminal-cursor";
        this.cursor.textContent = "█";

    },

    async print(text, className = "") {

        const line = document.createElement("div");

        if (className)
            line.className = className;

        this.element.appendChild(line);

        for (const letter of text) {

            line.textContent += letter;

            await Animation.sleep(this.typingSpeed);

        }

        this.scroll();

    },

    async ok(text) {

        await this.print("[ OK ] " + text, "terminal-ok");

    },

    async warn(text) {

        await this.print("[ WARN ] " + text, "terminal-warn");

    },

    async error(text) {

        await this.print("[ ERROR ] " + text, "terminal-error");

    },

    async pause(ms) {

        await Animation.sleep(ms);

    },

    clear() {

        this.element.innerHTML = "";

    },

    scroll() {

        this.element.scrollTop = this.element.scrollHeight;

    }

};