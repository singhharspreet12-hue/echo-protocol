const App = {

    currentScene: null,

    previousScene: null,

    settingsReturnScene: null,

    scenes: {}

};

function registerScene(name, element) {

    App.scenes[name] = element;

}

function showScene(name) {

    Object.values(App.scenes).forEach(scene => {

        scene.classList.add("hidden");

        scene
            .querySelectorAll(".scenePanel")
            .forEach(panel => {

                panel.classList.remove("visible");

            });

    });

    App.scenes[name].classList.remove("hidden");

    requestAnimationFrame(() => {

        App.scenes[name]
            .querySelectorAll(".scenePanel")
            .forEach(panel => {

                panel.classList.add("visible");

            });

    });

    if(name !== "settings"){

    App.previousScene = App.currentScene;

}

App.currentScene = name;

switch (name) {

    case "menu":
    case "candidate":
    case "difficulty":
    case "settings":

        Audio.playMusic("Main Menu");

        break;

    case "evaluation":
    case "briefing":
    case "game":

        if (Menu.selectedMode === "error") {

            Audio.playMusic("Error Mode");

        } else {

            Audio.playMusic("Hard Mode");

        }

        break;

}

    const nav = document.getElementById("globalNavigation");

const visibleScenes = [

    "evaluation",

    "briefing",

    "game"

];

const showNavigation = visibleScenes.includes(name);

if(nav){

    nav.classList.toggle(

        "hidden",

        !showNavigation

    );

}

const returnButton = document.getElementById("globalReturn");

if(returnButton){

    const lockedScenes = [

        "game"

    ];

    returnButton.disabled =

        lockedScenes.includes(name);

}

document

    .querySelectorAll(

        ".system-hud .hud-top-left, .system-hud .hud-top-right"

    )

    .forEach(hud=>{

        hud.style.visibility =

            showNavigation

                ? "hidden"

                : "visible";

    });

}

document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("app");

    app.innerHTML = `

<section id="fullscreen" class="scene">

    <div class="background-grid"></div>

    <div class="background-glow"></div>

    <div class="background-particles"></div>

    <div class="intro-container">

        <h1 class="logo-title">

            DISPLAY INITIALIZATION

        </h1>

        <p class="logo-subtitle">

            Echo Protocol is designed for Fullscreen Mode.

        </p>

        <button
            id="fullscreenButton"
            class="menu-button">

            ENTER FULLSCREEN

        </button>

        <button
            id="windowButton"
            class="menu-button">

            CONTINUE IN WINDOW

        </button>

    </div>

</section>

<section id="intro" class="scene hidden">

    <div class="background-grid"></div>

    <div class="background-glow"></div>

    <div class="background-particles"></div>

    <div class="intro-container">

        <h1 class="logo-title">

            ECHO PROTOCOL

        </h1>

        <button
            id="beginSession"
            class="menu-button">

            BEGIN SESSION

        </button>

    </div>

</section>

<section id="boot" class="scene hidden"></section>

<section id="logo" class="scene hidden">

     <div class="background-grid"></div>

     <div class="background-glow"></div>

     <div class="background-rays"></div>

     <div class="background-particles"></div>

     <div class="background-fog"></div>

<div class="background-aircraft">
    <span></span>
    <span></span>
    <span></span>
</div>

<div class="city-blink"></div>

     <div class="system-hud">

    <div class="hud-top-left">

        NODE-04

    </div>

    <div class="hud-top-right">

        BUILD 2.14

    </div>

    <div class="hud-bottom-left" id="sessionId">

        SESSION: A91C-72D4

    </div>

    <div class="hud-bottom-right" id="latencyValue">

        LATENCY 03 ms

    </div>

</div>

    <div class="logo-container">

        <h1 class="logo-title">
            ECHO PROTOCOL
        </h1>

        <p class="logo-subtitle">
            Voice Recognition Initiative
        </p>

    </div>

</section>

<section id="menu" class="scene hidden">
 
     <div class="background-grid"></div>

     <div class="background-glow"></div>

     <div class="background-clouds"></div>

     <div class="background-rays"></div>

     <div class="background-particles"></div>

     <div class="background-fog"></div>

<div class="background-aircraft">
    <span></span>
    <span></span>
    <span></span>
</div>

<div class="city-blink"></div>

     <div class="system-hud">

    <div class="hud-top-left">

    NODE-04

    <br>

    <span id="systemStatus">

        STATUS : STABLE

    </span>

</div>

    <div class="hud-top-right">

        BUILD 2.14

    </div>

    <div class="hud-bottom-left" id="sessionId">

        SESSION: A91C-72D4

    </div>

    <div class="hud-bottom-right" id="latencyValue">

        LATENCY 03 ms

    </div>

</div>


    <div class="menu-container">

    <h1 class="menu-title">
        ECHO PROTOCOL
    </h1>

        <button id="beginButton" class="menu-button">
            BEGIN TRIAL
        </button>

        <button
id="logsButton"
class="menu-button">

SYSTEM LOGS

</button>

        <button
    id="menuSettings"
    class="menu-button">

    SETTINGS

</button>

        <button class="menu-button">
            EXIT
        </button>

        <div id="archiveWarning" class="archive-warning hidden">

    <div class="warning-title">

        ARCHIVE STATUS

    </div>

    <div class="warning-text">

        RECOVERED MEMORY DETECTED

        <br><br>

        SYSTEM ARCHIVES NOW AVAILABLE

        <br><br>

        INTERFACE UPDATED

    </div>

</div>

    </div>

<div id="logsOverlay" class="logsOverlay hidden">

    <div class="logsWindow">

<div class="archiveHeader">

    <button
        id="closeLogs"
        class="archiveReturn">

        ← RETURN

    </button>

    <h2>SYSTEM ARCHIVES</h2>

</div>

        <div class="archiveLayout">

            <div class="archiveSidebar">

                <div class="archiveSidebarTitle">
                    ARCHIVE INDEX
                </div>

                <div class="archiveList">

                    <button class="archiveItem active" data-log="1">
    LOG-001
</button>

<button class="archiveItem locked" data-log="2">
    ██████
</button>

<button class="archiveItem locked" data-log="3">
    ██████
</button>

<button class="archiveItem locked" data-log="4">
    ██████
</button>

                </div>

            </div>

            <div class="archiveContent">

                <div class="archiveViewerTitle">
                    ARCHIVE VIEWER
                </div>

                <div id="archiveViewer">

                    Select an archive entry.

                </div>

            </div>

        </div>

    </div> 

</div> 

</section>

<section id="settings" class="scene hidden">

    <div class="background-grid"></div>

    <div class="background-glow"></div>

    <div class="background-rays"></div>

    <div class="background-particles"></div>

    <div class="background-fog"></div>

    <div class="background-aircraft">

        <span></span>

        <span></span>

        <span></span>

    </div>

    <div class="city-blink"></div>

    <div class="menu-container">

        <h2 class="menu-title">

            SYSTEM SETTINGS

        </h2>

        <div class="settingCard">

    <button
        id="toggleMusic"
        class="menu-button">

        AUDIO ENGINE
        <br>
        STATUS : ON

    </button>

    <div class="sliderRow">

    <div
        class="systemSlider"
        id="musicSlider">

        <div
            class="systemSliderFill"
            id="musicSliderFill">

        </div>

    </div>

    <div
        class="sliderValue"
        id="musicValue">

        35%

    </div>

</div>

</div>

        <div class="settingCard">

    <button
        id="toggleSfx"
        class="menu-button">

        EFFECT PROCESSOR
        <br>
        STATUS : ON

    </button>

    <div class="sliderRow">

    <div
        class="systemSlider"
        id="sfxSlider">

        <div
            class="systemSliderFill"
            id="sfxSliderFill">

        </div>

    </div>

    <div
        class="sliderValue"
        id="sfxValue">

        100%

    </div>

</div>

</div>

        <button
    id="toggleFullscreen"
    class="menu-button">

    DISPLAY LINK
    <br>
    STATUS : OFF

</button>

        <div class="settingsFooter">

    <button
        id="settingsReturn"
        class="headerButton">

        ← RETURN

    </button>

</div>

    </div>

</section>

<section id="candidate"

class="scene hidden">

     <div class="background-grid"></div>

     <div class="background-glow"></div>

     <div class="background-rays"></div>

     <div class="background-particles"></div>

     <div class="background-fog"></div>

<div class="background-aircraft">
    <span></span>
    <span></span>
    <span></span>
</div>

<div class="city-blink"></div>

     <div class="background-noise"></div>

     <div class="left-telemetry">

    <div>VOICE LINK</div>
    <div id="voiceState">ONLINE</div>

    <br>

    <div>NODES</div>
    <div id="nodeCount">18 / 18</div>

    <br>

    <div>SECURITY</div>
    <div>LEVEL V</div>

</div>

     <div class="right-telemetry">

    <div>CPU LOAD</div>

    <div id="cpuLoad">08%</div>

    <br>

    <div>PACKETS</div>

    <div id="packetRate">1820/s</div>

    <br>

    <div>UPLINK</div>

    <div>STABLE</div>

</div>

     <div class="system-hud">

    <div class="hud-top-left">

        NODE-04

    </div>

    <div class="hud-top-right">

    <div>BUILD 2.14</div>

    <div id="systemClock">
        00:00:00 UTC
    </div>

</div>

    <div class="hud-bottom-left" id="sessionId">

        SESSION: A91C-72D4

    </div>

    <div class="hud-bottom-right" id="latencyValue">

        LATENCY 03 ms

    </div>

</div>

    <div class="menu-container">

        <h2 class="menu-title">
            CANDIDATE REGISTRATION
        </h2>

        <p class="logo-subtitle">
            Please state your legal designation.
        </p>

        <div class="candidate-label">
            IDENTITY
        </div>

        <input
            id="candidateName"
            class="candidate-input"
            placeholder="Designation"
        >

        <div class="candidate-status">

            <span>Status</span>

            <strong id="candidateStatus">
                Awaiting Verification
            </strong>

        </div>

        <button
            id="confirmCandidate"
            class="menu-button"
        >
            VERIFY IDENTITY
        </button>

        <button
    id="candidateBack"
    class="returnButton">

    <span>← RETURN</span>

</button>

    </div>

</section>

<section id="difficulty" class="scene hidden">

     <div class="background-grid"></div>

     <div class="background-glow"></div>

     <div class="background-rays"></div>

     <div class="background-particles"></div>

     <div class="background-fog"></div>

<div class="background-aircraft">
    <span></span>
    <span></span>
    <span></span>
</div>

<div class="city-blink"></div>

     <div class="system-hud">

    <div class="hud-top-left">

        NODE-04

    </div>

    <div class="hud-top-right">

        BUILD 2.14

    </div>

    <div class="hud-bottom-left" id="sessionId">

        SESSION: A91C-72D4

    </div>

    <div class="hud-bottom-right" id="latencyValue">

        LATENCY 03 ms

    </div>

</div>

    <div class="menu-container">

        <h2 class="menu-title">
            SELECT EVALUATION
        </h2>

        <p class="logo-subtitle">
            Choose your evaluation protocol.
        </p>

        <div id="difficultyCards">

            <div class="difficulty-card available" id="easyCard">

                <div class="difficulty-id">
                    EV-01
                </div>

                <h3>EASY</h3>

                <p>Beginner Friendly</p>

                <p>Low Stress Evaluation</p>

                <span>STATUS : AVAILABLE</span>

            </div>

            <div class="difficulty-card available" id="normalCard">

                <div class="difficulty-id">
                    EV-02
                </div>

                <h3>NORMAL</h3>

                <p>Standard Evaluation</p>

                <p>Recommended</p>

                <span>STATUS : AVAILABLE</span>

            </div>

            <div class="difficulty-card available" id="hardCard">

                <div class="difficulty-id">
                    EV-03
                </div>

                <h3>HARD</h3>

                <p>Advanced Evaluation</p>

                <p>15 Questions</p>

                <span>STATUS : AVAILABLE</span>

            </div>

            <div class="difficulty-card locked" id="errorCard">

                <div class="difficulty-id">
                    EV-??
                </div>

                <h3>ERROR</h3>

                <p>Internal Build</p>

                <p>Unknown Evaluation</p>

                <span>STATUS : LOCKED</span>

            </div>

        </div>

    </div> <!-- menu-container -->

<button
     id="difficultyBack"
     class="returnButton">

    ← RETURN

</button>

    <div id="systemDialog" class="dialog hidden">

        <div class="dialog-window">

            <h3 id="dialogTitle">
                ACCESS DENIED
            </h3>

            <p id="dialogMessage">
                Placeholder
            </p>

            <button
                id="dialogButton"
                class="menu-button"
            >
                ACKNOWLEDGE
            </button>

        </div>

    </div>

</section>

<section id="evaluation" class="scene hidden">

    <div class="background-grid"></div>

    <div class="background-glow"></div>

    <div class="background-rays"></div>

    <div class="background-particles"></div>

    <div class="background-fog"></div>

    <div class="background-aircraft">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="city-blink"></div>

    <div class="evaluation-container scenePanel" id="evaluationPanel">

        <h2 class="menu-title">
            MOSAI EVALUATION TERMINAL
        </h2>

        <div id="evaluationReport">

    <div class="reportRow">

        <span>CANDIDATE</span>

        <strong id="reportCandidate">
            UNKNOWN
        </strong>

    </div>

    <div class="reportRow">

        <span>PROTOCOL</span>

        <strong id="reportProtocol">
            EV-03 HARD
        </strong>

    </div>

    <div class="reportRow">

        <span>QUESTIONS</span>

        <strong id="reportQuestions">
            15
        </strong>

    </div>

    <div class="reportRow">

        <span>ARCHIVE ACCESS</span>

        <strong id="reportArchive">
            LEVEL 01
        </strong>

    </div>

    <div class="reportRow">

        <span>STATUS</span>

        <strong id="reportStatus" style="color:#66ffb8;">
            READY
        </strong>

    </div>

</div>

        <button
            id="beginEvaluation"
            class="menu-button">

            BEGIN EVALUATION

        </button>

    </div>

</section>

<section id="briefing" class="scene hidden">

    <div class="background-grid"></div>
    <div class="background-glow"></div>
    <div class="background-rays"></div>
    <div class="background-particles"></div>
    <div class="background-fog"></div>

    <div class="background-aircraft">
        <span></span>
        <span></span>
        <span></span>
    </div>

    <div class="city-blink"></div>

    <div class="evaluation-container scenePanel" id="briefingPanel">

        <h2 class="menu-title">

            EVALUATION BRIEFING

        </h2>

        <p class="logo-subtitle">

            HOST : MOSAI

        </p>

        <div id="briefingLog">

    <p class="briefParagraph">

        This evaluation is not limited to standard voice lines.

    </p>

    <p class="briefParagraph">

        Questions may be selected from any recorded voice category, including:

    </p>

    <ul class="briefList">

        <li>Idle</li>

        <li>Combat</li>

        <li>Intro Skills</li>

        <li>Resonance Skills</li>

        <li>Resonance Liberation</li>

        <li>Echo Skills</li>

        <li>Dodge Counters</li>

        <li>Injury</li>

        <li>Defeat</li>

        <li>Miscellaneous Voice Lines</li>

    </ul>

    <p class="briefWarning">

        Every recorded sample is considered valid evaluation material.

    </p>

    <p class="briefGoodLuck">

    Evaluation will begin upon confirmation.

</p>

</div>

        <button
            id="beginBriefing"
            class="menu-button">

            BEGIN EVALUATION

        </button>

    </div>

</section>

<section id="game" class="scene hidden">

<div class="background-grid"></div>

<div class="background-glow"></div>

<div class="background-rays"></div>

<div class="background-particles"></div>

<div class="background-fog"></div>

<div class="background-aircraft">
    <span></span>
    <span></span>
    <span></span>
</div>

<div class="city-blink"></div>

<div class="background-grid"></div>

<div class="background-glow"></div>

<div class="background-rays"></div>

<div class="background-particles"></div>

<div class="background-fog"></div>

<div class="background-aircraft">
    <span></span>
    <span></span>
    <span></span>
</div>

<div class="city-blink"></div>

<div class="system-hud">

    <div class="hud-top-left">
        NODE-04
    </div>

    <div class="hud-top-right">
        BUILD 2.14
    </div>

    <div class="hud-bottom-left" id="sessionIdGame">
        SESSION: A91C-72D4
    </div>

    <div class="hud-bottom-right" id="latencyValueGame">
        LATENCY 03 ms
    </div>

</div>

    <div
    id="gamePanel"
    class="game-container scenePanel">
      
        <div id="bootOverlay" class="bootOverlay hidden">

    <div class="bootWindow">

        <div id="bootText"></div>

    </div>

</div>

        <div class="game-header">

    <div id="questionCounter">
        Question 1 / 15
    </div>

    <div id="accuracyCounter">
        Accuracy 100%
    </div>

</div>

        <div class="speaker-box">

            <span id="speakerName">
                MOSAI
            </span>

        </div>

        <div id="timerCounter"></div>

        <div id="questionBox">

            Waiting for evaluation...

        </div>

        <div id="answerContainer">

            <button class="answer-button">
                Answer A
            </button>

            <button class="answer-button">
                Answer B
            </button>

            <button class="answer-button">
                Answer C
            </button>

            <button class="answer-button">
                Answer D
            </button>

        </div>

        <div id="mosaiBox" class="mosai-box">

    <div class="mosai-header">

        MOSAI

    </div>

    <div id="mosaiText">

        ...

    </div>

</div>

        <div id="analysisBox">

            Awaiting candidate response...

        </div>  

    </div>

</section>

<section id="results" class="scene hidden">
   
     <div class="background-grid"></div>
     <div class="background-glow"></div>
     <div class="background-particles"></div>
     <div class="system-hud">

    <div class="hud-top-left">

        NODE-04

    </div>

    <div class="hud-top-right">

        BUILD 2.14

    </div>

    <div class="hud-bottom-left" id="sessionId">

        SESSION: A91C-72D4

    </div>

    <div class="hud-bottom-right" id="latencyValue">

        LATENCY 03 ms

    </div>

</div>

    <div class="menu-container">

        <h1 class="menu-title">
            EVALUATION COMPLETE
        </h1>

        <div id="resultsPanel">

            <div class="result-row">
                <span>Questions Answered</span>
                <strong id="resultQuestions">0 / 0</strong>
            </div>

            <div class="result-row">
                <span>Correct</span>
                <strong id="resultCorrect">0</strong>
            </div>

            <div class="result-row">
                <span>Incorrect</span>
                <strong id="resultIncorrect">0</strong>
            </div>

            <div class="result-row">
                <span>Accuracy</span>
                <strong id="finalAccuracy">0%</strong>
            </div>

            <div class="result-row">
                <span>Grade</span>
                <strong id="resultGrade">F</strong>
            </div>

            <div class="result-row">
                <span>Status</span>
                <strong id="resultStatus">FAILED</strong>
            </div>

        </div>

        <button
            id="returnMenu"
            class="menu-button">

            RETURN TO MENU

        </button>

        <div id="archivePopup" class="hidden">

    <div class="archive-popup-box">

        <div class="archive-title">

            SYSTEM ARCHIVE RECOVERED

        </div>

        <div class="archive-text">

    ARCHIVE II RESTORED

    <br><br>

    Memory Successfully Restored

    <br><br>

    ACCESS LEVEL UPDATED

</div>

        <button
    id="archiveContinue"
    class="menu-button archive-button">

    CONTINUE

</button>

    </div>

</div>

    </div>

</section>

<section id="farewell" class="scene hidden">

    <div id="farewellScreen">

    <div id="archiveUnlockNotice">

    <div class="archiveTitle">

    SYSTEM NOTICE

</div>

<div class="archiveBody">

    ARCHIVE IV RESTORED

</div>

<div class="archiveLog">

    Memory Successfully Restored

</div>

</div>

        <div id="farewellLine"></div>

        <div id="farewellCursor">█</div>

        <div id="creditsRoll">

    <div id="creditSystemMessage"></div>

    <div class="credit divider"></div>

    <div class="credit role">
        CREATED BY ............. Error
    </div>

    <div class="credit role">
        GAME DESIGN ............ Error
    </div>

    <div class="credit role">
        PROGRAMMING ............ Error
    </div>

    <div class="credit role">
        WRITING ................ Error
    </div>

    <div class="credit role">
        VISUAL DESIGN .......... Error
    </div>

    <div class="credit role">
        USER INTERFACE ......... Error
    </div>

    <div class="credit role">
        AUDIO DESIGN ........... Error
    </div>

    <div class="credit divider"></div>

    <div class="credit role">
        VOICE OF THE SYSTEM .... MOSAI
    </div>

    <div class="credit role">
        QUALITY ASSURANCE ...... Every Candidate
    </div>

    <div class="credit role">
        SPECIAL THANKS ......... You.
    </div>

    <div class="credit divider"></div>

    <div class="credit ending">
        End of Record
    </div>

</div>

<div id="endRecord">

    End of Record

</div>

    <div id="endingCard">

    <div class="endingTitle">
        ECHO PROTOCOL
    </div>

    <div class="endingVersion">
        Version 1.0
    </div>

    <div class="endingThanks">
        Thank you for participating.
    </div>

</div>

</div>

    </div>

</section>

<div id="globalNavigation" class="globalNavigation hidden">

    <button
        id="globalReturn"
        class="headerButton">

        ← RETURN

    </button>

    <button
        id="globalSettings"
        class="headerButton">

        SETTINGS

    </button>

</div>

`;
 
    registerScene("fullscreen", document.getElementById("fullscreen"));
    registerScene("intro", document.getElementById("intro"));
    registerScene("boot", document.getElementById("boot"));
    registerScene("logo", document.getElementById("logo"));
    registerScene("menu", document.getElementById("menu"));
    registerScene("candidate", document.getElementById("candidate"));
    registerScene("difficulty", document.getElementById("difficulty"));
    registerScene("evaluation", document.getElementById("evaluation"));
    registerScene("briefing", document.getElementById("briefing"));
    registerScene("game", document.getElementById("game"));
    registerScene("results", document.getElementById("results"));

registerScene("settings", document.getElementById("settings"));

registerScene(
    "farewell",
    document.getElementById("farewell")
);

    showScene("fullscreen");

    document
    .getElementById("fullscreenButton")
    .addEventListener("click", async () => {

        try{

            await document.documentElement.requestFullscreen();

        }catch(e){}

        setTimeout(() => {

    showScene("intro");

}, 500);

    });

document
    .getElementById("windowButton")
    .addEventListener("click", () => {

        showScene("intro");

    });

    document
    .getElementById("beginSession")
    .addEventListener("click", () => {

        showScene("boot");

        startBoot();

    });

});