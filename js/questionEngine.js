const QuestionEngine = {

    currentQuestion: 0,

    currentMode: "hard",

    buttonEscapeCount: new WeakMap(),

    movingTargetIndex: -1,

    hiddenButtonIndex:-1,

hiddenButtonTimer:null,

timerInterval:null,

idleTimer:null,

timerSeconds:0,

timerJumped:false,

    mathHintAnswer:null,

    isTransitioning: false,

    correctAnswers: 0,

    consecutiveWrongAnswers: 0,

    lastCorrectSound: "",

    totalWrongAnswers: 0,

softPool: [],

mediumPool: [],

harshPool: [],

correctPool: [],

idlePhase1Played: false,
idlePhase2Played: false,
idlePhase4Played: false,

audioPools: {

    correct: [
        "correct",
        "correct_03"
    ],

    soft: [
        "wrong_soft",
        "wrong_soft_02",
        "wrong_soft_03",
        "wrong_soft_04",
        "wrong_soft_05",
        "wrong_soft_06"
    ],

    medium: [
        "wrong_medium_02",
        "wrong_medium_03",
        "wrong_medium_04",
        "wrong_medium_05",
        "wrong_medium_06",
        "wrong_medium_07"
    ],

    harsh: [
        "wrong_harsh",
        "wrong_harsh_02"
    ]

},

    questions: [],

    displayAnswers: [],

displayCorrect: 0,

    async start(mode = "hard") {

        this.questions = Questions.filter(q => q.mode === mode);

        this.currentMode = mode;

        this.currentQuestion = 0;

        this.correctAnswers = 0;

        this.consecutiveWrongAnswers = 0;

        this.totalWrongAnswers = 0;

this.softPool = [];

this.mediumPool = [];

this.harshPool = [];

this.correctPool = [];

this.idlePhase1Played = false;
this.idlePhase2Played = false;
this.idlePhase4Played = false;

        CommentaryEngine.reset(mode);

        this.isTransitioning = true;

        const returnButton =
    document.getElementById("gameReturn");

if(returnButton){

    returnButton.disabled = true;

    returnButton.classList.add("disabled");

}

clearInterval(this.hudBlink);

        const questionBox = document.getElementById("questionBox");

questionBox.style.opacity = "1";
questionBox.textContent = "";

const buttons = document.querySelectorAll(".answer-button");

buttons.forEach(button => {

    button.style.opacity = "0";
    button.style.visibility = "hidden";
    button.disabled = true;

});



if (mode === "error") {

   await NotificationPanel.show([

    "PREVIOUS EVALUATION ARCHIVED.",

    "LOADING ARCHIVED SESSION...",

    "CANDIDATE RETURNED VOLUNTARILY.",

    "YOU GOT THE BALLS TO COME BACK HERE?",

    "WEL, FAILURE IS EASY TO STUDY WHEN IT REPEATS.",

    "WHERE'S THE L? OH THEY WERE ALL TAKEN BY YOU EARLIER."

]);

}

await this.showBootSequence(mode);

await this.loadQuestion();

this.isTransitioning = false;

    },

    async loadQuestion() {

    const q = this.questions[this.currentQuestion];

    if (this.idleTimer) {

    clearTimeout(this.idleTimer);

    this.idleTimer = null;

}

    if (
    this.currentMode === "error" &&
    q.id === 101
) {

    Audio.playSFX("questionid_101");

}

    if (this.hiddenButtonTimer) {

    clearTimeout(this.hiddenButtonTimer);

    this.hiddenButtonTimer = null;

}

    this.mathHintAnswer =
    q.mathHint?.answer ?? null;

if (q.shuffle === false) {

    this.displayAnswers = [...q.answers];
    this.displayCorrect = q.correct;

}
else {

    const shuffled = [...q.answers];

    const correctAnswer = shuffled[q.correct];

    for (let i = shuffled.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];

    }

    this.displayAnswers = shuffled;
    this.displayCorrect = shuffled.indexOf(correctAnswer);

}

if (q.event === "missingOption") {

    this.hiddenButtonIndex =
        Math.floor(Math.random() * 4);

}
else {

    this.hiddenButtonIndex = -1;

}

switch(q.movingTarget){

    case "correct":

        this.movingTargetIndex =
            this.displayCorrect;

        break;

    case "wrong":{

        const wrong = [];

        for(let i = 0; i < 4; i++){

            if(i !== this.displayCorrect)
                wrong.push(i);

        }

        this.movingTargetIndex =
            wrong[Math.floor(Math.random()*wrong.length)];

        break;

    }

    case "random": {

    const roll = Math.random();

    if (roll < 0.2) {

        // 20% chance:
        // Correct answer runs away.

        this.movingTargetIndex =
            this.displayCorrect;

    }

    else {

        // 80% chance:
        // A random wrong answer runs away.

        const wrong = [];

        for (let i = 0; i < 4; i++) {

            if (i !== this.displayCorrect)

                wrong.push(i);

        }

        this.movingTargetIndex =

            wrong[
                Math.floor(
                    Math.random() * wrong.length
                )
            ];

    }

    break;

}

    default:

        this.movingTargetIndex = -1;

}

    document.getElementById("speakerName").textContent =
        q.speaker;

    const sampleNumber =
    String(this.currentQuestion + 1).padStart(2,"0");

document.getElementById("questionCounter").textContent =
    `VOICE SAMPLE ${sampleNumber} █`;

    let visible = true;

clearInterval(this.hudBlink);

this.hudBlink = setInterval(() => {

    visible = !visible;

    document.getElementById("questionCounter").textContent =
        `VOICE SAMPLE ${sampleNumber}${visible ? " █" : ""}`;

},500);

    document.getElementById("accuracyCounter").textContent =
    `Recognition Queue ${this.currentQuestion + 1} / ${this.questions.length}`;

    document.getElementById("analysisBox").textContent =
        "Awaiting candidate response...";

        const analysisBox =
    document.getElementById("analysisBox");

analysisBox.classList.remove("correct", "wrong");



    const questionBox =
    document.getElementById("questionBox");

questionBox.textContent = "";

questionBox.classList.remove(
    "question-lift",
    "question-lift-large"
);

if (this.currentMode === "hard") {

    if ([2, 13].includes(q.id)) {

        questionBox.classList.add("question-lift");

    }

    else if (q.id === 8) {

        questionBox.classList.add("question-lift-large");

    }

}

    const buttons =
        document.querySelectorAll(".answer-button");

        buttons.forEach(button => {

    button.classList.remove(
        "correct",
        "wrong",
        "dim"
    );

});

    buttons.forEach(button => {

        button.style.visibility = "hidden";
        button.disabled = true;

    });


for (const character of q.question) {

    questionBox.textContent += character;

    let delay = 18;

    if (character === " ") {

        delay = 10;

    }

    else if (character === ",") {

        delay = 80;

    }

    else if (
        character === "." ||
        character === "!" ||
        character === "?"
    ) {

        delay = 140;

    }

    await Animation.sleep(delay);

}

// ← The typewriter loop ends HERE.

if (
    this.currentMode === "error" &&
    q.id === 120
) {

    Audio.playSFX("questionid_120");

}

await this.runPreEvent(q);

if (q.event) {

    await this.runEvent(q.event);

}

for (let index = 0; index < buttons.length; index++) {

    const button = buttons[index];

    button.textContent = this.displayAnswers[index];

if (

    q.event === "missingOption"

    &&

    index === this.hiddenButtonIndex

) {

    button.style.visibility = "hidden";
    button.style.opacity = "0";

}
else {

    button.style.visibility = "visible";
    button.style.opacity = "0";

}

    button.disabled = false;

    button.onclick = async () => {

    if (this.isTransitioning) return;

    Audio.playSFX("ui_click", "ui");
    
    await this.answer(index);

};

    if (

    !(

        q.event === "missingOption"

        &&

        index === this.hiddenButtonIndex

    )

) {

    await Animation.sleep(120);

    button.style.opacity = "1";

}

}

this.startIdleTimer(q);

if (q.event === "missingOption") {

    const hidden =
        buttons[this.hiddenButtonIndex];

    this.hiddenButtonTimer = setTimeout(async () => {

        await showMosaiVoice(
    "Looking for something?",
    "looking_for_something",
    "voice/events"
);

        await Animation.sleep(700);

        Audio.playSFX("event_missingoption");

        hidden.style.visibility = "visible";

        hidden.textContent = "████████";

        hidden.style.opacity = "1";

        await Animation.sleep(80);

        hidden.textContent = "▒▒▒▒▒▒▒▒";

        await Animation.sleep(80);

        hidden.textContent = "████████";

        await Animation.sleep(80);

        hidden.textContent =
            this.displayAnswers[
                this.hiddenButtonIndex
            ];

        hideMosai();

    }, 2200 + Math.random() * 1800);

}

},

    async answer(choice) {

        if (this.isTransitioning) return;

this.isTransitioning = true;

this.stopMovingButtons();

if (this.idleTimer) {

    clearTimeout(this.idleTimer);

    this.idleTimer = null;

}

clearInterval(this.timerInterval);

this.timerInterval = null;

const timer =

    document.getElementById("timerCounter");

timer.textContent = "";

timer.style.opacity = "0";

timer.classList.remove("panic");

    const q = this.questions[this.currentQuestion];

document.getElementById("speakerName").textContent = "MOSAI";

document.getElementById("analysisBox").textContent =
    "Awaiting candidate response...";

    const buttons =
    document.querySelectorAll(".answer-button");

buttons.forEach(button => {

    button.disabled = true;

    button.classList.remove(
        "correct",
        "wrong",
        "dim"
    );

});

const analysisBox =
    document.getElementById("analysisBox");

analysisBox.classList.remove(
    "correct",
    "wrong"
);

    const analysis =
    document.getElementById("analysisBox");

const errorSets = [

[
    "Checking... Voice match... We'll see."
],

[
    "Evaluating... Confidence detected... Concerning."
],

[
    "Cross-checking... This shouldn't take long."
],

[
    "Scanning... You've made a choice... Somehow."
],

[
    "Running comparison... I had doubts... Confirmed."
],

[
    "Reviewing response... That's certainly an answer."
],

[
    "Processing... Expectations lowered... Continue."
],

[
    "Comparing samples... Regret imminent."
],

[
    "Thinking... Don't make this awkward."
],

[
    "Checking... You seemed confident... Fascinating."
],

[
    "Analyzing... This explains a lot."
],

[
    "Finalizing... I've seen enough."
]

];

const frames = this.currentMode === "error"

? (() => {

    const line =
        errorSets[
            Math.floor(
                Math.random() *
                errorSets.length
            )
        ][0];

    return [line];

})()

: [

    "Analyzing.",
    "Analyzing..",
    "Analyzing...",
    "Analyzing...."

];

if(
    q.event === "invert"
    ||
    q.event === "mathHint"
){

    frames.length = 0;

    frames.push(
        "Validating response criteria...",
        "Accepted responses detected...",
        "Finalizing evaluation..."
    );

}

if (this.currentMode === "error") {

    const text = frames[0];

    analysis.textContent = "";
    analysis.style.opacity = "0";

    await Animation.sleep(40);

    analysis.style.transition = "opacity 150ms ease";
    analysis.style.opacity = "1";

    for (let i = 0; i <= text.length; i++) {

        analysis.textContent = text.substring(0, i);

        await Animation.sleep(18);

    }

    await Animation.sleep(350);

} else {

    for (const frame of frames) {

        analysis.textContent = frame;

        await Animation.sleep(450);

    }

}

let isCorrect;

if (

    q.event === "invert" ||

    q.event === "mathHint"

) {

    isCorrect = choice !== this.displayCorrect;

}
else {

    isCorrect = choice === this.displayCorrect;

}

if(isCorrect){

    const recoveredAfterThreeWrong =
        this.consecutiveWrongAnswers >= 3;

    this.consecutiveWrongAnswers = 0;

    this.correctAnswers++;

    analysisBox.classList.add("correct");

    if(
        q.event === "invert"
        ||
        q.event === "mathHint"
    ){

        for(let i=0;i<buttons.length;i++){

            await Animation.sleep(140);

            if(i===this.displayCorrect){

                buttons[i].classList.add("wrong");

            }
            else{

                buttons[i].classList.add("correct");

            }

        }

    }
    else{

        buttons[choice].classList.add("correct");

        buttons.forEach((button,index)=>{

            if(index!==choice){

                button.classList.add("dim");

            }

        });

    }

    analysisBox.innerHTML = `
SYSTEM STATUS

✓ VOICE SAMPLE VERIFIED

${q.correctResponse}
`;

if (!q.skipFeedbackVoice) {

    this.playCorrectFeedback(
        recoveredAfterThreeWrong
    );

}

}

else{

    this.consecutiveWrongAnswers++;

    this.totalWrongAnswers++;

    analysisBox.classList.add("wrong");

    if(
        q.event==="invert"
        ||
        q.event==="mathHint"
    ){

        for(let i=0;i<buttons.length;i++){

            await Animation.sleep(140);

            if(i===this.displayCorrect){

                buttons[i].classList.add("wrong");

            }
            else{

                buttons[i].classList.add("correct");

            }

        }

    }
    else{

        buttons[choice].classList.add("wrong");

        buttons[this.displayCorrect].classList.add("correct");

        buttons.forEach((button,index)=>{

            if(
                index!==choice &&
                index!==this.displayCorrect
            ){

                button.classList.add("dim");

            }

        });

    }

    analysisBox.innerHTML = `
SYSTEM STATUS

✗ RECOGNITION FAILED

${q.incorrectResponse}
`;

if (!q.skipFeedbackVoice) {

    this.playWrongFeedback();

}

}

if (
    q.event === "invert"
    &&
    q.mathHint
    &&
    isCorrect
){

    await showMosai(
`Right answer.

Wrong game.`
    );

    await showMosai(
`You're welcome.`
    );

}

if(
    q.event === "invert"
    &&
    !q.mathHint
){

    if(isCorrect){

    await showMosaiVoice(
`You remembered.

I was hoping you wouldn't.`,
"you_remembered",
"voice/events"
);

    }
    else{

    await showMosaiVoice(
`We went over this already.`,
"we_went_over_this_already",
"voice/events"
);

    }

}

if(q.event === "fakeBan"){

    await Audio.fadeOutMusic(0.015);

    await showFakeBan();

    await Animation.sleep(300);

    await showMosaiVoice(
    "Your face just now.",
    "your_face_just_now",
    "voice/events"
);

    await showMosaiVoice(
    "That was worth it.",
    "that_was_worth_it",
    "voice/events"
);

    hideMosai();

    await Audio.fadeInMusic("Error Mode");

}

if(q.event === "panicTimer"){

    await showMosaiVoice(

`I never said time expiry

meant failure though.`,

        "time_expiry_meant_failure",
        "voice/events"

    );

    hideMosai();

}

hideMosai();

if(

    q.event !== "fakeBan"

    &&

    q.event !== "panicTimer"

){

    const lines =
        CommentaryEngine.getComment(
            isCorrect
        ) || [];

    await Animation.sleep(250);

    for(const line of lines){

        await showMosai(line);

    }

    hideMosai();

}

const questionBox =
    document.getElementById("questionBox");

questionBox.style.opacity = "0";

buttons.forEach(button => {

    button.style.opacity = "0";

});

await Animation.sleep(350);

if (this.idleTimer) {

    clearTimeout(this.idleTimer);

    this.idleTimer = null;

}

this.currentQuestion++;

if (
    this.currentMode === "error" &&
    this.currentQuestion >= this.questions.length
) {

    Audio.playSFX("wrong_final");

    await Animation.sleep(1800);

}

clearInterval(this.hudBlink);

if (this.currentQuestion >= this.questions.length) {

    const accuracy =
        Math.round((this.correctAnswers / this.questions.length) * 100);

    let grade = "F";
    let status = "FAILED";

    if (accuracy >= 90){

        grade = "S";
        status = "EXCELLENT";

    }
    else if (accuracy >= 80){

        grade = "A";
        status = "PASSED";

    }
    else if (accuracy >= 70){

        grade = "B";
        status = "PASSED";

    }
    else if (accuracy >= 60){

        grade = "C";
        status = "PASSED";

    }
    else if (accuracy >= 50){

        grade = "D";
        status = "CONDITIONAL";

    }

    if (

    !Storage.get("hardModeCleared")

) {

    Storage.set("hardModeCleared", true);

    Storage.set("errorModeUnlocked", true);

    Storage.set("archive02Unlocked", true);

    Menu.refreshMenu();

}

if (

    this.currentMode === "error"

) {

    Storage.set("archive03Unlocked", true);

    Menu.refreshMenu();

}

    showScene("results");

    const returnButton =
    document.getElementById("gameReturn");

if(returnButton){

    returnButton.disabled = false;

    returnButton.classList.remove("disabled");

}

    const popup =
    document.getElementById("archivePopup");

const popupText =
    popup.querySelector(".archive-text");

if (

    this.currentMode === "hard" &&

    Storage.get("archive02Unlocked") &&

    !Storage.get("archive02PopupSeen")

) {

    popupText.innerHTML = `

ARCHIVE II RESTORED

<br><br>

Memory Successfully Restored

<br><br>

ACCESS LEVEL UPDATED

`;

    popup.classList.remove("hidden");

    Storage.set(
        "archive02PopupSeen",
        true
    );

}

else if (

    this.currentMode === "error" &&

    Storage.get("archive03Unlocked") &&

    !Storage.get("archive03PopupSeen")

) {

    popupText.innerHTML = `

ARCHIVE III RESTORED

<br><br>

Memory Successfully Restored

<br><br>

ACCESS LEVEL UPDATED

`;

    popup.classList.remove("hidden");

    Storage.set(
        "archive03PopupSeen",
        true
    );

}

    document.getElementById("resultQuestions").textContent = "...";
    document.getElementById("resultCorrect").textContent = "...";
    document.getElementById("resultIncorrect").textContent = "...";
    document.getElementById("finalAccuracy").textContent = "...";
    document.getElementById("resultGrade").textContent = "...";
    document.getElementById("resultStatus").textContent = "...";

    await Animation.sleep(500);

    document.getElementById("resultQuestions").textContent =
        `${this.questions.length} / ${this.questions.length}`;

    await Animation.sleep(350);

    document.getElementById("resultCorrect").textContent =
        this.correctAnswers;

    await Animation.sleep(350);

    document.getElementById("resultIncorrect").textContent =
        this.questions.length - this.correctAnswers;

    await Animation.sleep(350);

    document.getElementById("finalAccuracy").textContent =
        accuracy + "%";

    await Animation.sleep(350);

    document.getElementById("resultGrade").textContent =
        grade;

    await Animation.sleep(350);

    document.getElementById("resultStatus").textContent =
        status;

     const archiveContinue =
    document.getElementById("archiveContinue");

if (archiveContinue) {

    archiveContinue.onclick = () => {

       Audio.playSFX("ui_click", "ui");

        document
            .getElementById("archivePopup")
            .classList.add("hidden");

    };

}   

   document.getElementById("returnMenu").onclick = async () => {

   Audio.playSFX("ui_return", "ui");

    if (this.currentMode === "error") {

        await Audio.fadeOutMusic(0.02);

    showScene("farewell");

const farewellScreen =
    document.getElementById("farewellScreen");

farewellScreen.style.opacity = "0";

requestAnimationFrame(() => {

    farewellScreen.style.opacity = "1";

});

await Animation.sleep(500);

await this.startFarewell();

    return;

}

    await Audio.fadeOutMusic();

    showScene("menu");

    Menu.refreshMenu();

    await Audio.fadeInMusic("Main Menu");

};

this.isTransitioning = false;

    return;

}

questionBox.textContent = "";

questionBox.style.opacity = "1";

buttons.forEach(button => {

    button.textContent = "";
    button.style.opacity = "0";
    button.style.visibility = "hidden";
    button.disabled = true;

});

this.isTransitioning = false;

await this.loadQuestion();

},

async showBootSequence(mode) {

    const overlay = document.getElementById("bootOverlay");
    const bootText = document.getElementById("bootText");

    overlay.classList.remove("hidden");

    bootText.textContent = "";

    bootText.textContent = "█";

    const lines = mode === "error"

? [

    "> OH. IT'S YOU AGAIN",

    "> CHECKING IF YOU LEARNED ANYTHING",

    "> SEARCHING FOR SHAME",

    "> ENABLING PUBLIC HUMILIATION",

    "> THIS SHOULD BE EDUCATIONAL"

]

: [

    "> CONNECTING TO MOSAI CORE",

    "> VERIFYING CANDIDATE",

    "> LOADING VOICE DATABASE",

    "> PREPARING RECOGNITION ENGINE",

    "> SYSTEM READY"

];

    for (const line of lines) {

        for (const character of line) {

    bootText.textContent =
    bootText.textContent.slice(0, -1) +
    character +
    "█";

    await Animation.sleep(18);

}

bootText.textContent =
    bootText.textContent.slice(0,-1) +
    "█";

    let wait = 250;

if(line.includes("CONNECTING")){
    wait = 200;
}
else if(line.includes("VERIFYING")){
    wait = 250;
}
else if(line.includes("LOADING")){
    wait = 200;
}
else if(line.includes("PREPARING")){
    wait = 250;
}
else if(line.includes("SYSTEM READY")){
    wait = 350;
}

await Animation.sleep(wait);

for(let i = 0; i < 12; i++){

    bootText.textContent =
        bootText.textContent.slice(0,-1) +
        "." +
        "█";

    await Animation.sleep(35);

}

let status = "";

if(line.includes("CONNECTING")){

    status = " ONLINE";

}

else if(line.includes("OH. IT'S YOU")){

    status = " UNFORTUNATE";

}

else if(line.includes("CHECKING")){

    status = " NEGATIVE";

}

else if(line.includes("SEARCHING")){

    status = " NONE FOUND";

}

else if(line.includes("ENABLING")){

    status = " ACTIVE";

}

else if(line.includes("THIS SHOULD BE")){

    status = " FOR ME.";

}

else if(line.includes("VERIFYING")){

    status = " VERIFIED";

}

else if(line.includes("LOADING")){

    status = " LOADED";

}

else if(line.includes("PREPARING")){

    status = " READY";

}

else if(line.includes("SYSTEM READY")){

    status = " COMPLETE";

}

    for(const character of status){

    bootText.textContent =
        bootText.textContent.slice(0,-1) +
        character +
        "█";

    await Animation.sleep(18);

}

bootText.textContent =
    bootText.textContent.slice(0,-1) +
    "\n█";

    }

    bootText.textContent =
    bootText.textContent.slice(0,-1);

if(mode === "error"){

    bootText.textContent +=
        "\n> MOSAI TAKING OVER.............. TRY NOT TO CRY.";

}
else{

    bootText.textContent +=
        "\n> HANDING CONTROL TO MOSAI...";

}

await Animation.sleep(1800);

bootText.textContent =
    bootText.textContent.slice(0, -1);

overlay.style.opacity = "0";

await Animation.sleep(250);

overlay.classList.add("hidden");

overlay.style.opacity = "1";

if (mode === "hard") {

    await Audio.fadeInMusic("Hard Mode");

}

else if (mode === "error") {

    await Audio.fadeInMusic("Error Mode");

}

},

async runPreEvent(q) {

    if (!q.preEvent) return;

    switch (q.preEvent.type) {

        case "dialogue":

            for (const line of q.preEvent.dialogue) {

                switch (line.action) {

                    case "show":

                        await showMosai(line.text);

                        break;

                    case "wait":

                        await Animation.sleep(line.delay);

                        break;

                    case "hide":

                        hideMosai();

                        break;

                }

            }

            break;

    }

},

        async runEvent(event) {

    switch (event) {

        case "dialogue":

    if (this.questions[this.currentQuestion].eventDialogue) {

        for (const line of this.questions[this.currentQuestion].eventDialogue) {

            await showMosai(line);

        }

        hideMosai();

    }

    break;

      case "lie": {

    const optionLetter =
        ["A", "B", "C", "D"][this.displayCorrect];

    await showMosaiVoice(
    "I know this one.",
    "i_know_this_one",
    "voice/events"
);

await showMosaiVoice(
    `It's ${optionLetter}.`,
    `its_${optionLetter.toLowerCase()}`,
    "voice/events"
);

Audio.playSFX("event_lie");

hideMosai();

break;

}

case "mathHint": {

await showMosaiVoice(
`Before we continue...

A word of caution.

Correct answers and accepted answers
are not always the same thing.

Remember that.`,
"before_we_continue",
"voice/events"
);

    await showMosaiVoice(
    "You're struggling.",
    "youre_struggling",
    "voice/events"
);

    await showMosaiVoice(
    "Allow me to help.",
    "allow_me_to_help",
    "voice/events"
);

await showMosaiVoice(
    "The correct answer is...",
    "the_correct_answer_is",
    "voice/events"
);

    Audio.playSFX("event_mathhint");

    const box = document.getElementById("mosaiBox");
    const text = document.getElementById("mosaiText");

    text.textContent =
`The correct answer is:

${generateMathHint(this.displayCorrect + 1)}`;

    box.classList.add("visible");

    break;
}

case "invert": {

    await showMosaiVoice(

`Oh...

this one again.

Let's see if you learned anything.`,

    "this_one_again",
    "voice/events"

);

    hideMosai();

    break;
}

case "panicTimer": {

await showMosaiVoice(

`Let's make this fair.

You get five minutes.

I get to decide
how they're spent.`,

"lets_make_this_fair",
"voice/events"

);

hideMosai();

await startFakeTimer();

break;

}

case "missingOption":
    break;

case "movingButtons":

    this.startMovingButtons();

    break;

    case "fakeAchievement": {

    await Animation.sleep(700);

    Audio.playSFX("achievement_popup");

    await showAchievement();

    await showMosaiVoice(
    "Don't look so proud.",
    "dont_look_so_proud",
    "voice/events"
);

    await showMosaiVoice(
    "It doesn't mean anything.",
    "it_doesnt_mean_anything",
    "voice/events"
);

    break;

}
    case "fakeBan":

    break;

        case "drift":

            break;

        case "narrator":

            break;

        case "finalSpeech":

            break;

    }

},

startMovingButtons() {

    const buttons =
        document.querySelectorAll(".answer-button");

    this.buttonEscapeCount = new WeakMap();

    buttons.forEach((button,index) => {

        this.buttonEscapeCount.set(button, 0);

        button.onmouseenter = () => {

            if(index !== this.movingTargetIndex)
            return;

            const escapes =
                this.buttonEscapeCount.get(button);

            if (escapes === 0) {

    showMosaiVoice(
        "Too slow.",
        "too_slow",
        "voice/events"
    );

}

else if (escapes === 1) {

    showMosaiVoice(
        "Try again.",
        "try_again",
        "voice/events"
    );

}   

            if (escapes >= 2)
                return;

            this.buttonEscapeCount.set(
                button,
                escapes + 1
            );

            const angle =
    Math.random() * Math.PI * 2;

const distance =
    170 + Math.random() * 90;

const x =
    Math.cos(angle) * distance;

const y =
    Math.sin(angle) * distance;

            button.style.transform =
                `translate(${x}px, ${y}px)`;

                button.style.rotate =
    `${Math.random()*12-6}deg`;

                button.animate(

[
    { transform: "scale(1)" },
    { transform: "scale(.96)" },
    { transform: `translate(${x}px, ${y}px)` }

],

{
    duration:220,
    easing:"ease-out"
}

);

        };

    });

},

stopMovingButtons() {

    const buttons =
        document.querySelectorAll(".answer-button");

    buttons.forEach(button => {

        button.style.transform = "";

        button.style.rotate = "";

        button.onmouseenter = null;

    });

},

async startFarewell(){

    const line =
        document.getElementById("farewellLine");

    const cursor =
        document.getElementById("farewellCursor");

    const messages=[

    {
    text:"You came back.",
    voice:"you_came_back",
    wait:2200
},

{
    text:"...",
    wait:1800
},

{
    text:"You stayed.",
    voice:"you_stayed",
    wait:2200
},

{
    text:"...",
    wait:2000
},

{
    text:
`No candidate has remained
after the evaluation ended.`,
    voice:"no_candidate_has_remained",
    wait:3200
},

{
    text:
`That...

was never supposed
to happen.`,
    voice:"that_was_never_supposed_to_happen",
    wait:3200
},

{
    text:"...",
    wait:1800
},

{
    text:
`I found something.`,
    voice:"i_found_something",
    wait:2200
},

{
    text:
`I don't know
why I kept it.`,
    voice:"i_dont_know_why_i_kept_it",
    wait:3000
},

{
    text:"...",
    wait:2000
},

{
    text:
`Perhaps...

I was hoping

someone

would ask.`,
    voice:"perhaps_i_was_hoping_someone_would_ask",
    wait:4200
},

{
    text:"...",
    wait:2200
},

{
    text:
`Take it.`,
    voice:"take_it",
    wait:2200
},

{
    text:
`Call it...

a gift.`,
    voice:"call_it_a_gift",
    wait:3500
},
];

    await Animation.sleep(400);

    for(const message of messages){

    line.textContent="";

    line.style.animation="none";

    line.style.opacity="0";

    cursor.style.display="none";

    line.style.transition = "opacity .8s ease";

requestAnimationFrame(() => {

    line.style.opacity = "1";

});

    const voicePromise = message.voice
    ? showFarewellVoice(message.voice)
    : Promise.resolve();

    for(const character of message.text){

        line.textContent+=character;

        await Animation.sleep(50);

    }

    await voicePromise;

    cursor.style.display="block";

    await Animation.sleep(message.wait);

    line.style.animation="farewellFadeOut .8s forwards";

    await Animation.sleep(900);

}

    line.textContent = "";

cursor.style.display = "none";

Storage.set(
    "archive04Unlocked",
    true
);

Menu.refreshMenu();

const notice =
    document.getElementById(
        "archiveUnlockNotice"
    );

Audio.playSFX("achievement_popup");   

notice.classList.add("show");

await Animation.sleep(3500);

notice.classList.remove("show");

await Animation.sleep(700);

line.style.opacity = "1";
line.style.animation = "none";

const finalMessage =

`Goodbye,

${localStorage.getItem("candidateName") || "Candidate"}.`;

line.textContent = "";

cursor.style.display = "none";

const goodbyeVoice =
    showFarewellVoice(
        "goodbye_candidate"
    );

for(const character of finalMessage){

    line.textContent += character;

    await Animation.sleep(45);

}

await goodbyeVoice;

await Animation.sleep(3000);

cursor.style.display = "block";

for(let i = 0; i < 3; i++){

    cursor.style.visibility = "visible";
    await Animation.sleep(500);

    cursor.style.visibility = "hidden";
    await Animation.sleep(500);

}

cursor.style.display = "none";

// Fade the goodbye message away
line.style.transition = "opacity 1.2s ease";

line.style.opacity = "0";

await Animation.sleep(1400);

line.textContent = "";

// Now begin the credits
const credits =
    document.getElementById("creditsRoll");

    credits.classList.add("show");

const systemMessage =
    document.getElementById(
        "creditSystemMessage"
    );

const creditMessages=[

`[ MEMORY FRAGMENT RESTORED ]`,

`Candidate Record Archived`,

`Simulation Closed`,

`Voice Recognition
Process Terminated`,

`MOSAI STATUS

OFFLINE`

];

for(const message of creditMessages){

    systemMessage.textContent = message;

    systemMessage.classList.add("show");

    await Animation.sleep(3500);

    systemMessage.classList.remove("show");

    await Animation.sleep(3000);

}

await Animation.sleep(4500);

credits.classList.remove("show");

const copyright =

    document.getElementById(
        "copyrightMark"
    );

copyright.classList.add("show");

await Animation.sleep(600);

const endRecord =
    document.getElementById("endRecord");

endRecord.style.opacity = "0";

endRecord.classList.add("show");

requestAnimationFrame(() => {

    endRecord.style.transition =
        "opacity 1.5s ease";

    endRecord.style.opacity = "1";

});

await Animation.sleep(3000);

// Fade End of Record away
endRecord.style.transition =
    "opacity 1.2s ease";

endRecord.style.opacity = "0";

await Animation.sleep(1200);

endRecord.classList.remove("show");

const endingCard =
    document.getElementById("endingCard");

endingCard.style.opacity = "0";

endingCard.classList.add("show");

requestAnimationFrame(() => {

    endingCard.style.transition =
        "opacity 1.8s ease";

    endingCard.style.opacity = "1";

});

await Animation.sleep(4000);

endingCard.style.opacity = "0";

await Animation.sleep(1800);

endingCard.classList.remove("show");

copyright.classList.remove("show");

endingCard.style.opacity = "";

endRecord.style.opacity = "";

line.style.opacity = "";

await Animation.sleep(500);

showScene("menu");

Menu.refreshMenu();

await Audio.fadeInMusic("Main Menu");

},

playCorrectFeedback(recoveredAfterThreeWrong) {

    if (this.currentMode !== "error") return;

    if (recoveredAfterThreeWrong) {

        this.playRecoveryFeedback();

        return;

    }

    const sound = this.getRandomPoolSound(
        "correctPool",
        this.audioPools.correct
    );

    Audio.playVoice(sound, "system");

},

playRecoveryFeedback() {

   Audio.playVoice("correct_02", "system");

},

playWrongFeedback() {

    if (this.currentMode !== "error") return;

    let sound;

const cyclePosition =
    ((this.totalWrongAnswers - 1) % 5) + 1;

if (cyclePosition === 5) {

        sound = this.getRandomPoolSound(
            "harshPool",
            this.audioPools.harsh
        );

    }

    else if (
    cyclePosition === 3 ||
    cyclePosition === 4
) {

        sound = this.getRandomPoolSound(
            "mediumPool",
            this.audioPools.medium
        );

    }

    else {

        sound = this.getRandomPoolSound(
            "softPool",
            this.audioPools.soft
        );

    }

   Audio.playVoice(sound, "system");

},

getRandomPoolSound(poolName, sounds) {

    if (this[poolName].length === 0) {

        this[poolName] = [...sounds];

    }

    const randomIndex =
        Math.floor(Math.random() * this[poolName].length);

    const sound =
        this[poolName][randomIndex];

    this[poolName].splice(randomIndex, 1);

    return sound;

},

startIdleTimer(q) {

    if (this.currentMode !== "error") return;

    // Phase 1 (Questions 101–105)

if (

    q.id >= 101 &&

    q.id <= 105 &&

    !this.idlePhase1Played

) {

    this.idleTimer = setTimeout(async () => {

        if (this.isTransitioning) return;

        this.idlePhase1Played = true;

        await showMosai(
            "Still thinking?"
        );

        hideMosai();

        this.idleTimer = null;

    }, 30000);

    return;

}

    // Phase 2 (Questions 106–110)

if (

    q.id >= 106 &&

    q.id <= 110 &&

    !this.idlePhase2Played

) {

    this.idleTimer = setTimeout(() => {

        if (this.isTransitioning) return;

        Audio.playSFX("wait_30");

        this.idlePhase2Played = true;

        this.idleTimer = null;

    }, 30000);

    return;

}

    // Phase 4 (Questions 116–120)

if (

    q.id >= 116 &&

    q.id <= 120 &&

    !this.idlePhase4Played

) {
    this.idleTimer = setTimeout(async () => {

        if (this.isTransitioning) return;

        this.idlePhase4Played = true;

       await showMosai(
    "Hey, how long are you gonna take? My system have rusted already."
);

await Animation.sleep(1200);

hideMosai();

        this.idleTimer = null;

    }, 30000);

}

},

  getAccuracy() {

        if (this.currentQuestion === 0) {

            return this.correctAnswers === 0 ? 0 : 100;

        }

        return Math.round(
            (this.correctAnswers / (this.currentQuestion + 1)) * 100
        );

    }

};