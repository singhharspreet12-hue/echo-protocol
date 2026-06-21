const App = {

    currentScene: null,

    scenes: {}

};

function registerScene(name, element) {

    App.scenes[name] = element;

}

function showScene(name) {

    Object.values(App.scenes).forEach(scene => {

        scene.classList.add("hidden");

    });

    App.scenes[name].classList.remove("hidden");

    App.currentScene = name;

}

document.addEventListener("DOMContentLoaded", () => {

    const app = document.getElementById("app");

    app.innerHTML = `

<section id="boot" class="scene"></section>

<section id="logo" class="scene hidden">

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

    <div class="menu-container">

        <h1 class="menu-title">
            ECHO PROTOCOL
        </h1>

        <button id="beginButton" class="menu-button">
            BEGIN TRIAL
        </button>

        <button class="menu-button">
            SYSTEM LOGS
        </button>

        <button class="menu-button">
            SETTINGS
        </button>

        <button class="menu-button">
            EXIT
        </button>

    </div>

</section>

<section id="candidate" class="scene hidden">

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

    </div>

</section>

<section id="difficulty" class="scene hidden">

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

    </div>

</section>

<section id="game" class="scene hidden"></section>

<section id="results" class="scene hidden"></section>

`;

    registerScene("boot", document.getElementById("boot"));
    registerScene("logo", document.getElementById("logo"));
    registerScene("menu", document.getElementById("menu"));
    registerScene("candidate", document.getElementById("candidate"));
    registerScene("difficulty", document.getElementById("difficulty"));
    registerScene("game", document.getElementById("game"));
    registerScene("results", document.getElementById("results"));

    showScene("boot");

    startBoot();

});