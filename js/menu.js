const Menu = {

    initialize() {

        this.beginButton = document.getElementById("beginButton");
        this.verifyButton = document.getElementById("confirmCandidate");
        this.nameInput = document.getElementById("candidateName");

        this.easyCard = document.getElementById("easyCard");
        this.normalCard = document.getElementById("normalCard");
        this.hardCard = document.getElementById("hardCard");
        this.errorCard = document.getElementById("errorCard");

        this.dialog = document.getElementById("systemDialog");
        this.dialogTitle = document.getElementById("dialogTitle");
        this.dialogMessage = document.getElementById("dialogMessage");
        this.dialogButton = document.getElementById("dialogButton");

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

            this.showDialog(
                "HARD MODE",
                "Hard Mode will be implemented\nin the next milestone."
            );

        });

        this.errorCard.addEventListener("click", () => {

            this.showDialog(
                "ACCESS DENIED",
                "Protocol EV-??\nAuthorization Required\n\nReason:\nHard Evaluation Incomplete"
            );

        });

        this.dialogButton.addEventListener("click", () => {

            this.hideDialog();

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

        card.style.background = "#320909";
        card.style.borderColor = "#ff5757";

        card.innerHTML = `
            <h3>ACCESS DENIED</h3>
            <p>${reason}</p>
        `;

        await Animation.sleep(1700);

        card.style.opacity = "0";

        await Animation.sleep(400);

        card.style.opacity = "1";

        card.style.background = "#071725";
        card.style.borderColor = "#284656";
        card.style.borderStyle = "dashed";
        card.style.cursor = "not-allowed";

        card.innerHTML = `
            <h3>PROTOCOL REMOVED</h3>
            <p>This evaluation is no longer available.</p>
        `;

    },

    showDialog(title, message) {

        this.dialogTitle.textContent = title;
        this.dialogMessage.textContent = message;

        this.dialog.classList.remove("hidden");

    },

    hideDialog() {

        this.dialog.classList.add("hidden");

    }

};

document.addEventListener("DOMContentLoaded", () => {

    Menu.initialize();

});