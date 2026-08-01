const Menu = {

    archiveLogs: {

    1: `
ACCESS LEVEL : ALPHA

SYSTEM OVERVIEW

MOSAI was commissioned as an adaptive voice recognition intelligence.

Primary Objective:
Evaluate human vocal identification accuracy.

Current Status:
Operational.

`,

    2: `
ACCESS LEVEL : ALPHA

MOSAI DEVELOPMENT NOTES

Early testing exceeded all expectations.

Candidate recognition accuracy reached 99.98%.

Engineers reported unusual behavior during extended sessions.

`,

    3: `
ACCESS LEVEL : BETA

INCIDENT REPORT

Recovery Team Delta entered Sector 9.

No survivors located.

The facility AI remained operational despite complete reactor shutdown.

Personnel reported hearing voices through inactive communication channels.

Investigation suspended.

`,

    4: `

    ACCESS LEVEL : OMEGA

POST-TRIAL EVALUATION

Final candidate evaluation complete.

Subject maintained prolonged interaction
with MOSAI beyond original operational
parameters.

Primary objective:
SUCCESSFUL.

Secondary objective:
Unexpectedly successful.

Recommendation:

Maintain system operation.

Someone may return.

`

},

    initialize() {

        this.beginEvaluation =
    document.getElementById("beginEvaluation");

        document.body.classList.add("system-start");

setTimeout(() => {

    document.body.classList.remove("system-start");

}, 900);

        this.beginButton = document.getElementById("beginButton");

        this.menuReturn =
    document.getElementById("menuReturn");

this.menuSettings =
    document.getElementById("menuSettings");

    this.globalReturn =
    document.getElementById("globalReturn");

this.globalSettings =
    document.getElementById("globalSettings");

this.settingsReturn =
    document.getElementById("settingsReturn");

this.toggleMusic =
    document.getElementById("toggleMusic");

this.toggleSfx =
    document.getElementById("toggleSfx");

this.toggleFullscreen =
    document.getElementById("toggleFullscreen");

    this.musicSlider = document.getElementById("musicSlider");

this.musicSliderFill = document.getElementById("musicSliderFill");

this.musicValue = document.getElementById("musicValue");

this.draggingMusic = false;

this.sfxSlider =
document.getElementById("sfxSlider");

this.sfxSliderFill =
document.getElementById("sfxSliderFill");

this.sfxValue =
document.getElementById("sfxValue");

this.draggingSfx = false;

    this.musicToggle =
    document.getElementById("musicToggle");

this.sfxToggle =
    document.getElementById("sfxToggle");

        this.candidateBack = document.getElementById("candidateBack");
        this.logsButton=document.getElementById("logsButton");

this.logsOverlay=document.getElementById("logsOverlay");

this.closeLogs=document.getElementById("closeLogs");

    this.archiveViewer =
    document.getElementById("archiveViewer");

this.archiveItems =
    document.querySelectorAll(".archiveItem");
        this.verifyButton = document.getElementById("confirmCandidate");
        this.nameInput = document.getElementById("candidateName");

        this.easyCard = document.getElementById("easyCard");
        this.normalCard = document.getElementById("normalCard");
        this.hardCard = document.getElementById("hardCard");
        this.errorCard = document.getElementById("errorCard");

        this.refreshMenu();

        this.difficultyBack = document.getElementById("difficultyBack");

        this.dialog = document.getElementById("systemDialog");
        this.dialogTitle = document.getElementById("dialogTitle");
        this.dialogMessage = document.getElementById("dialogMessage");
        this.dialogButton = document.getElementById("dialogButton");

        this.beginButton.addEventListener("click", () => {

            Audio.playSFX("ui_click", "ui");

        this.beginEvaluation.onclick = async () => {

    this.beginEvaluation.disabled = true;

    this.beginEvaluation.textContent = "VERIFYING CANDIDATE...";

    await Animation.sleep(600);

    this.beginEvaluation.textContent = "CHECKING PROTOCOL...";

    await Animation.sleep(600);

    this.beginEvaluation.textContent = "INITIALIZING MOSAI...";

    await Animation.sleep(700);

    this.beginEvaluation.textContent = "ACCESS GRANTED";

    await Animation.sleep(500);

this.beginEvaluation.style.opacity = "0";

await Animation.sleep(350);

showScene("briefing");


this.beginEvaluation.style.opacity = "1";

this.beginEvaluation.disabled = false;

this.beginEvaluation.textContent = "BEGIN EVALUATION";

};

    if (Storage.get("hardModeCleared")) {

    showScene("difficulty");

}

else {

    this.resetCandidateScreen();

    showScene("candidate");

    this.nameInput.focus();

}

});

this.difficultyBack.addEventListener("click", () => {

    Audio.playSFX("ui_return", "ui");

    this.resetCandidateScreen();

    showScene("candidate");

    this.nameInput.focus();

});

if(this.logsButton && this.logsOverlay){

    this.logsButton.addEventListener("click", () => {

        Audio.playSFX("ui_click", "ui");

    this.logsOverlay.classList.remove("hidden");

    this.loadArchive(1);

});

}

        this.verifyButton.addEventListener("click", () => {

           Audio.playSFX("ui_click", "ui");

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

    this.hardCard.addEventListener("click", async () => {

        Audio.playSFX("ui_click", "ui");

        this.selectedMode = "hard";

    await Audio.fadeOutMusic();

document.getElementById("reportCandidate").textContent =
    localStorage.getItem("candidateName") || "UNKNOWN";

    document.getElementById("reportQuestions").textContent = "15";

showScene("evaluation");

});

        this.errorCard.addEventListener("click", async () => {

            Audio.playSFX("ui_click", "ui");

    if (Storage.get("errorModeUnlocked")) {

        this.selectedMode = "error";

        await Audio.fadeOutMusic();

        document.getElementById("reportCandidate").textContent =
            localStorage.getItem("candidateName") || "UNKNOWN";

        document.getElementById("reportProtocol").textContent =
    "EV-?? ERROR";

document.getElementById("reportQuestions").textContent = "21";

showScene("evaluation");

return;

    }

    this.showDialog(
        "ACCESS DENIED",
        "Protocol EV-??\nAuthorization Required\n\nReason:\nHard Evaluation Incomplete"
    );

});

        this.difficultyBack.addEventListener("click", () => {

    this.resetCandidateScreen();

    showScene("candidate");

    this.nameInput.focus();

});

        this.dialogButton.addEventListener("click", () => {

    this.hideDialog();

});

     if(this.menuReturn){

    this.menuReturn.addEventListener("click",()=>{

        // Already on the Main Menu.
        // Intentionally does nothing.

    });

}

if (this.menuSettings) {

    this.menuSettings.addEventListener("click", () => {

        Audio.playSFX("ui_settings", "ui");

        App.settingsReturnScene = "menu";

        showScene("settings");

    });

}

if(this.globalSettings){

    this.globalSettings.addEventListener("click",()=>{

        Audio.playSFX("ui_settings", "ui");

        App.settingsReturnScene = App.currentScene;

        showScene("settings");

    });

}

if(this.settingsReturn){

    this.settingsReturn.addEventListener("click",()=>{

        Audio.playSFX("ui_return", "ui");

        showScene(

            App.settingsReturnScene || "menu"

        );

    });

}

if (this.toggleMusic) {

    this.toggleMusic.addEventListener("click", () => {

        Audio.playSFX("ui_click", "ui");

        const enabled =
            !Storage.get("musicEnabled");

        Storage.set(
            "musicEnabled",
            enabled
        );

        this.toggleMusic.innerHTML =
    enabled
    ? "AUDIO ENGINE<br>STATUS : ON"
    : "AUDIO ENGINE<br>STATUS : OFF";

        if (!enabled) {

    Audio.stopMusic();

} else {

    showScene(App.currentScene);

}

    });

}

this.musicSlider.addEventListener("mousedown", (event) => {

    this.draggingMusic = true;

    const rect = this.musicSlider.getBoundingClientRect();

    this.updateMusicSlider(

        ((event.clientX - rect.left) / rect.width) * 100

    );

});

document.addEventListener("mousemove", (event) => {

    if (!this.draggingMusic) {

        return;

    }

    const rect =

        this.musicSlider.getBoundingClientRect();

    this.updateMusicSlider(

        ((event.clientX - rect.left) / rect.width) * 100

    );

});

document.addEventListener("mouseup", () => {

    this.draggingMusic = false;

});

this.sfxSlider.addEventListener("mousedown", (event) => {

    this.draggingSfx = true;

    const rect = this.sfxSlider.getBoundingClientRect();

    this.updateSfxSlider(

        ((event.clientX - rect.left) / rect.width) * 100

    );

});

document.addEventListener("mousemove", (event) => {

    if (!this.draggingSfx) {

        return;

    }

    const rect =

        this.sfxSlider.getBoundingClientRect();

    this.updateSfxSlider(

        ((event.clientX - rect.left) / rect.width) * 100

    );

});

document.addEventListener("mouseup", () => {

    this.draggingSfx = false;

});

if (this.toggleMusic) {

    this.toggleMusic.innerHTML =
    Storage.get("musicEnabled")
    ? "AUDIO ENGINE<br>STATUS : ON"
    : "AUDIO ENGINE<br>STATUS : OFF";

}

if (this.toggleSfx) {

    this.toggleSfx.addEventListener("click", () => {

        const enabled =
            !Storage.get("sfxEnabled");

        Storage.set(
            "sfxEnabled",
            enabled
        );

        this.toggleSfx.innerHTML =
    enabled
    ? "EFFECT PROCESSOR<br>STATUS : ON"
    : "EFFECT PROCESSOR<br>STATUS : OFF";

        if (enabled) {

            Audio.playSFX(
                "ui_click",
                "ui"
            );

        }

    });

}

if (this.toggleSfx) {

    this.toggleSfx.innerHTML =
    Storage.get("sfxEnabled")
    ? "EFFECT PROCESSOR<br>STATUS : ON"
    : "EFFECT PROCESSOR<br>STATUS : OFF";

}

if (this.toggleFullscreen) {

    this.toggleFullscreen.addEventListener("click", async () => {

        Audio.playSFX("ui_click", "ui");

        if (!document.fullscreenElement) {

            try {

                await document.documentElement.requestFullscreen();

            } catch (error) {

                console.warn(error);

            }

        } else {

            try {

                await document.exitFullscreen();

            } catch (error) {

                console.warn(error);

            }

        }

        this.updateFullscreenButton();

    });

}

document.addEventListener(
    "fullscreenchange",
    () => {

        this.updateFullscreenButton();

    }
);

if(this.globalReturn){

    this.globalReturn.addEventListener("click",()=>{

       Audio.playSFX("ui_return", "ui");

        switch(App.currentScene){

            case "evaluation":

                Audio.playMusic("Main Menu");

                showScene("difficulty");

                break;

            case "briefing":

                Audio.playMusic("Main Menu");

                showScene("evaluation");

                break;

            case "results":

                document
                    .getElementById("returnMenu")
                    ?.click();

                break;

            case "farewell":

                break;

            case "game":

                break;

        }

    });

}

if(this.closeLogs && this.logsOverlay){

    this.closeLogs.addEventListener("click", () => {

   Audio.playSFX("ui_return", "ui");

    this.logsOverlay.classList.add("hidden");

});

    this.archiveItems.forEach(item => {

    item.addEventListener("click", () => {

        this.loadArchive(
            Number(item.dataset.log)
        );

    });

});

}

     const briefingButton =
    document.getElementById("beginBriefing");

if (briefingButton) {

    briefingButton.addEventListener("click", async () => {

        Audio.playSFX("ui_click", "ui");

    document
        .getElementById("briefingPanel")
        ?.classList.remove("visible");

    await Animation.sleep(300);

    showScene("game");

    await QuestionEngine.start(
    this.selectedMode || "hard"
);

});

}


this.updateFullscreenButton();

const savedMusicVolume = Number(Storage.get("musicVolume"));

this.updateMusicSlider(
    Number.isFinite(savedMusicVolume)
        ? savedMusicVolume
        : 35
);

const savedSfxVolume = Number(Storage.get("sfxVolume"));

this.updateSfxSlider(
    Number.isFinite(savedSfxVolume)
        ? savedSfxVolume
        : 100
);

this.startHud();

setInterval(() => {

const title=document.querySelector(".menu-title");

if(!title)return;

if(Math.random()<0.01){

title.classList.add("glitch");

setTimeout(()=>{

title.classList.remove("glitch");

},90);

}

},4000);

        setInterval(() => {

    const clock = document.getElementById("systemClock");

    if (!clock) return;

    const now = new Date();

    clock.textContent =
        now.toUTCString().split(" ")[4] + " UTC";

},1000);

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

        this.nameInput.blur();

window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
});

        showScene("difficulty");

    },

    resetCandidateScreen() {

    this.nameInput.blur();
this.nameInput.value = "";

window.scrollTo({
    top: 0,
    left: 0,
    behavior: "instant"
});

    this.nameInput.disabled = false;

    this.verifyButton.disabled = false;

    this.verifyButton.textContent = "VERIFY IDENTITY";

    document.getElementById("candidateStatus").textContent =
        "Awaiting Verification";

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

},

loadArchive(id) {

    this.archiveItems.forEach(item => {

        item.classList.remove("active");

    });

    document
        .querySelector(`[data-log="${id}"]`)
        .classList.add("active");

    const requirements = {

        2: "archive02Unlocked",
        3: "archive03Unlocked",
        4: "archive04Unlocked"

    };

    const requirement = requirements[id];

    if (
        requirement &&
        !Storage.get(requirement)
    ) {

        this.archiveViewer.textContent =

`ACCESS LEVEL : UNKNOWN

████████████████████

FILE ENCRYPTED

Recover additional memories
to unlock this archive.`;

        return;

    }

    this.archiveViewer.textContent =
        this.archiveLogs[id];

},

    refreshMenu() {

    const recovered = Storage.get("hardModeCleared");

    this.beginButton.textContent =
        recovered ? "CONTINUE" : "BEGIN TRIAL";

    this.logsButton.textContent =
        recovered ? "SYSTEM ARCHIVES" : "SYSTEM LOGS";

    document.body.classList.toggle(
        "world-corrupted",
        recovered
    );

    const warning =
        document.getElementById("archiveWarning");

    if (warning) {

        warning.classList.toggle(
            "hidden",
            !recovered
        );

    }

    if (Storage.get("errorModeUnlocked")) {

        this.errorCard.classList.remove("locked");
        this.errorCard.classList.add("available");

        this.errorCard.querySelector("span").textContent =
            "STATUS : AVAILABLE";

    } else {

        this.errorCard.classList.add("locked");
        this.errorCard.classList.remove("available");

        this.errorCard.querySelector("span").textContent =
            "STATUS : LOCKED";

    }

    const archiveNames = {

    2: "LOG-002",
    3: "LOG-003",
    4: "LOG-004"

};

Object.entries(archiveNames).forEach(([id, name]) => {

    const button = document.querySelector(
        `.archiveItem[data-log="${id}"]`
    );

    if (!button) return;

    const unlocked = Storage.get(
        `archive0${id}Unlocked`
    );

    button.textContent = unlocked
        ? name
        : "██████";

    button.classList.toggle(
        "locked",
        !unlocked
    );

});

},

updateFullscreenButton() {

    if (!this.toggleFullscreen) {

        return;

    }

        this.toggleFullscreen.innerHTML =
    document.fullscreenElement
        ? "DISPLAY LINK<br>STATUS : ON"
        : "DISPLAY LINK<br>STATUS : OFF";

},

updateMusicSlider(percent){

    percent = Number(percent);

if (!Number.isFinite(percent)) {

    percent = 35;

}

percent = Math.max(
    0,
    Math.min(100, percent)
);

    this.musicSliderFill.style.width =

        percent + "%";

    this.musicValue.textContent =

        Math.round(percent)

        +

        "%";

        Storage.set(

    "musicVolume",

    Math.round(percent)

);

if (Audio.music) {

    Audio.music.volume =

        Audio.getCurrentMusicVolume();

}

},

updateSfxSlider(percent){

percent = Number(percent);

if (!Number.isFinite(percent)) {

    percent = 100;

}

percent = Math.max(
    0,
    Math.min(100, percent)
);

    this.sfxSliderFill.style.width =

        percent + "%";

    this.sfxValue.textContent =

        Math.round(percent)

        +

        "%";

    Storage.set(

        "sfxVolume",

        Math.round(percent)

    );

    Audio.sfxVolume =

        (percent / 100) * 0.7;

},

startHud() {

    if (this.hudTimer) {

        clearInterval(this.hudTimer);

    }

    this.hudTimer = setInterval(() => {

        const session = document.getElementById("sessionId");
        const latency = document.getElementById("latencyValue");

        if (!session || !latency) return;

        const randomID = Math.random()
            .toString(16)
            .substring(2, 10)
            .toUpperCase();

        session.textContent = "SESSION: " + randomID;

        latency.textContent =
            "LATENCY " +
            (2 + Math.floor(Math.random() * 6)) +
            " ms";

            const cpu=document.getElementById("cpuLoad");

const packets=document.getElementById("packetRate");

const nodes=document.getElementById("nodeCount");

if(cpu){

    cpu.textContent=(6+Math.floor(Math.random()*18))+"%";

}

if(packets){

    packets.textContent=

    (1700+Math.floor(Math.random()*900))

    +"/s";

}

if(nodes){

    nodes.textContent="18 / 18";

}

 const status=document.getElementById("systemStatus");

if(status){

let states;

if (Storage.get("hardModeCleared")) {

    states = [

        "STATUS : ARCHIVE RECOVERY",

        "STATUS : RECOVERY MODE",

        "STATUS : MEMORY SYNCHRONIZING",

        Math.random() < 0.015

            ? "STATUS : WATCHING YOU"

            : "STATUS : UNKNOWN PROCESS"

    ];

}

else {

    states = [

        "STATUS : STABLE",

        "STATUS : LINKED",

        "STATUS : MONITORING",

        Math.random() < 0.015

            ? "STATUS : WATCHING YOU"

            : "STATUS : OBSERVING"

    ];

}

const selected =

states[Math.floor(Math.random()*states.length)];

status.textContent = selected;

status.classList.remove("systemWarning");

if(selected==="STATUS : WATCHING YOU"){

    status.classList.add("systemWarning");

}

}

if(Math.random()<0.004){

    session.textContent="SESSION: ????????";

    latency.textContent="LATENCY -- ms";

}

setTimeout(()=>{

    session.textContent="SESSION: "+randomID;

    latency.textContent=

    "LATENCY "+(2+Math.floor(Math.random()*6))+" ms";

},350);

    }, 6000);

}    

}; 

document.addEventListener("DOMContentLoaded", () => {

    Menu.initialize();

    setInterval(()=>{

if(Math.random()>0.995){

document.body.classList.add("menuGlitch");

setTimeout(()=>{

document.body.classList.remove("menuGlitch");

},70);

}

},5000);

});