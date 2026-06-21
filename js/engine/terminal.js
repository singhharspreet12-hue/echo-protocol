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

        this.element.appendChild(this.cursor);

    },

    async print(text, className = "") {

        this.hideCursor();

        const line = document.createElement("div");

        if (className)
            line.className = className;

        this.element.appendChild(line);

        for (const character of text) {

            line.textContent += character;

            await Animation.sleep(this.typingSpeed);

        }

        this.showCursor();

        this.scroll();

        return line;

    },

    async instant(text, className = "") {

        this.hideCursor();

        const line = document.createElement("div");

        if (className)
            line.className = className;

        line.textContent = text;

        this.element.appendChild(line);

        this.showCursor();

        this.scroll();

        return line;

    },

    async ok(text) {

        return await this.print("[ OK ] " + text, "terminal-ok");

    },

    async warn(text) {

        return await this.print("[ WARN ] " + text, "terminal-warn");

    },

    async error(text) {

        return await this.instant("[ ERROR ] " + text, "terminal-error");

    },

    async message(text) {

        return await this.print(text);

    },

    async pause(ms) {

        await Animation.sleep(ms);

    },

    clear() {

        this.element.innerHTML = "";
        this.element.appendChild(this.cursor);

    },

    hideCursor() {

        if (this.cursor.parentNode) {

            this.cursor.remove();

        }

    },

    showCursor() {

        if (!this.cursor.parentNode) {

            this.element.appendChild(this.cursor);

        }

        this.cursor.style.display = "inline-block";

    },

    flash() {

        Animation.flash();

    },

    shake() {

        Animation.shake(this.element);

    },

    getLines() {

        return Array.from(this.element.querySelectorAll("div"));

    },

    async corrupt() {

        const chars = "@#$%&01XZ!?▓▒█";

        const lines = this.getLines();

        for (const line of lines) {

            const original = line.textContent;

            let corrupted = "";

            for (const ch of original) {

                if (Math.random() > 0.7) {

                    corrupted += chars[Math.floor(Math.random() * chars.length)];

                } else {

                    corrupted += ch;

                }

            }

            line.textContent = corrupted;

            await Animation.sleep(80);

        }

    },

    scroll() {

        this.element.scrollTop = this.element.scrollHeight;

    }

};