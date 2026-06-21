const Menu = {

    initialize() {

        this.beginButton = document.getElementById("beginButton");
        this.verifyButton = document.getElementById("confirmCandidate");
        this.nameInput = document.getElementById("candidateName");

        this.easyCard = document.getElementById("easyCard");
        this.normalCard = document.getElementById("normalCard");
        this.hardCard = document.getElementById("hardCard");
        this.errorCard = document.getElementById("errorCard");

        this.beginButton.addEventListener("click", () => {

            showScene("candidate");
            this.nameInput.focus();

        });

        this.verifyButton.addEventListener("click", () => {

            this.verifyCandidate();

        });

        this.easyCard.addEventListener("click", () => {

            this.removeProtocol(
                this.easyCard,
                "Insufficient Courage."
            );

        });

        this.normalCard.addEventListener("click", () => {

            this.removeProtocol(
                this.normalCard,
                "Average candidates rarely survive."
            );

        });

        this.hardCard.addEventListener("click", () => {

            alert("Hard Mode will be implemented in the next milestone.");

        });

        this.errorCard.addEventListener("click", () => {

            alert("ERROR MODE LOCKED");

        });

    },

    async verifyCandidate() {

        const candidate = this.nameInput.value.trim();

        if (candidate.length === 0) {

            this.verifyButton.textContent = "IDENTITY NOT DETECTED";

            await Animation.sleep(1200);

            this.verifyButton.textContent = "VERIFY IDENTITY";

            return;

        }

        this.verifyButton.disabled = true;
        this.nameInput.disabled = true;

        document.getElementById("candidateStatus").textContent =
            "Verifying...";

        this.verifyButton.textContent = "VERIFYING...";

        await Animation.sleep(1000);

        document.getElementById("candidateStatus").textContent =
            "Checking Voice Registry...";

        await Animation.sleep(1000);

        document.getElementById("candidateStatus").textContent =
            "Checking Candidate Database...";

        await Animation.sleep(1000);

        document.getElementById("candidateStatus").textContent =
            "Identity Accepted";

        this.verifyButton.textContent = "VERIFIED";

        await Animation.sleep(1200);

        showScene("difficulty");

    },

    async removeProtocol(card, reason) {

        card.style.pointerEvents = "none";

        card.style.transition = "all .25s";

        card.style.background = "#320909";

        card.style.borderColor = "#ff5757";

        card.innerHTML = `

            <h3>ACCESS DENIED</h3>

            <p>${reason}</p>

        `;

        await Animation.sleep(1700);

        card.style.opacity = "0";

        card.style.transform = "scale(.95)";

        await Animation.sleep(400);

        card.innerHTML = `

            <h3>PROTOCOL REMOVED</h3>

            <p>This evaluation is no longer available.</p>

        `;

        card.style.opacity = "1";

        card.style.background = "#071725";

        card.style.borderStyle = "dashed";

        card.style.borderColor = "#284656";

        card.style.cursor = "not-allowed";

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Menu.initialize();

});