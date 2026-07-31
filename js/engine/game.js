const FakeAchievements = [

{
    title: "Professional Guesser",
    subtitle: "Experience not required."
},

{
    title: "Wrong With Confidence",
    subtitle: "An impressive combination."
},

{
    title: "Task Failed Successfully",
    subtitle: "Somehow both."
},

{
    title: "Blind Optimism",
    subtitle: "Vision was optional."
},

{
    title: "Hope Is A Strategy",
    subtitle: "It wasn't."
},

{
    title: "Statistically Impressive",
    subtitle: "In all the wrong ways."
},

{
    title: "Certified Button Clicker",
    subtitle: "Accuracy pending."
}

];

async function showMosai(text){

    const box = document.getElementById("mosaiBox");
    const label = document.getElementById("mosaiText");

    text = String(text);

    label.textContent = text;

    box.classList.add("visible");

    const commas = (text.match(/,/g) || []).length;
    const pauses = (text.match(/[.!?]/g) || []).length;

    const time =
        900 +
        text.length * 45 +
        commas * 250 +
        pauses * 450;

    await Animation.sleep(time);

}

async function showMosaiVoice(text, voiceFile, folder = "voice") {

    try {

        const voicePromise = Audio.playVoice(voiceFile, folder);

        await showMosai(text);

        await voicePromise;

    } catch (error) {

        console.warn(`Voice "${voiceFile}" could not be played.`, error);

        await showMosai(text);

    }

}

async function showFarewellVoice(voiceFile, folder = "voice/farewell") {

    try {

        const voicePromise = Audio.playVoice(
            voiceFile,
            folder
        );

        await voicePromise;

    }

    catch (error) {

        console.warn(
            `Farewell voice "${voiceFile}" could not be played.`,
            error
        );

    }

}

function hideMosai() {

    document
        .getElementById("mosaiBox")
        .classList.remove("visible");

    document
        .getElementById("mosaiText")
        .textContent = "";

}

function generateMathHint(answer){

    const equations = {

        1:[

    "((18 ÷ 3) - 5)",

    "(15 - 9) ÷ 6",

    "((7 × 2) - 11) ÷ 3",

    "((20 ÷ 5) - 3)",

    "((28 ÷ 7) - 3)",

    "((13 - 5) ÷ 8)",

    "((9 × 2) - 15)",

    "((24 ÷ 6) - 3)"

],

        2:[

    "((24 ÷ 4) - 2) ÷ 2",

    "(32 ÷ 8) - 2",

    "(9 + 7) ÷ 8",

    "((5 × 4) - 16) ÷ 2",

    "((40 ÷ 5) - 6)",

    "((12 + 4) ÷ 8)",

    "((27 - 9) ÷ 9)",

    "((15 ÷ 3) - 3)"

],

        3:[

    "(16 + 8) ÷ 8",

    "(36 ÷ 6) - 3",

    "((5 × 4) - 11) ÷ 3",

    "((30 ÷ 2) - 6) ÷ 3",

    "((21 ÷ 3) - 4)",

    "((18 + 6) ÷ 8)",

    "((42 ÷ 7) - 3)",

    "((15 - 3) ÷ 4)"

],

        4:[

    "(20 - 4) ÷ 4",

    "(15 + 9) ÷ 6",

    "((7 × 4) - 12) ÷ 4",

    "((40 ÷ 2) - 4) ÷ 4",

    "((36 ÷ 6) + 2)",

    "((24 + 8) ÷ 8)",

    "((18 - 2) ÷ 4)",

    "((56 ÷ 7) - 4)"

],

    };

    const pool = equations[answer];

    return pool[
        Math.floor(Math.random() * pool.length)
    ];

}

async function showAchievement(){

    const popup =
        document.getElementById("achievementPopup");

    const title =
    document.getElementById("achievementName");

const achievement =

    FakeAchievements[

        Math.floor(

            Math.random() *
            FakeAchievements.length

        )

    ];

title.innerHTML =

`
${achievement.title}

<span class="achievementSubtitle">

${achievement.subtitle}

</span>
`;

    popup.classList.add("visible");

    await Animation.sleep(4300);

    popup.classList.remove("visible");

}

async function showFakeBan(){

    const popup =
        document.getElementById("banPopup");

        // TODO:
// Stop Error Mode music here
// once the audio engine is implemented.

const error =
    document.getElementById("banError");

const code =

    Math.floor(

        Math.random() * 65536

    )

    .toString(16)

    .toUpperCase()

    .padStart(4,"0");

error.textContent =

    `ERROR CODE: MOSAI-0x${code}`;

    await Animation.sleep(120);

    document.body.style.pointerEvents = "none";

await Animation.sleep(450);

    popup.classList.add("visible");

    await Animation.sleep(4500);

    popup.classList.remove("visible");

    document.body.style.pointerEvents = "";

    // TODO:
// Resume Error Mode music here.

}

async function startFakeTimer(){

    const timer =
        document.getElementById("timerCounter");

    clearInterval(QuestionEngine.timerInterval);

    QuestionEngine.timerSeconds = 300;
    QuestionEngine.timerJumped = false;

    timer.classList.remove("panic");
    timer.style.opacity = "1";

    timer.textContent = "████████";
    await Animation.sleep(120);

    timer.textContent = "▒▒▒▒▒▒▒▒";
    await Animation.sleep(120);

    timer.textContent = "05:00";

    const jumpAt =
        292 + Math.floor(Math.random()*5);

    QuestionEngine.timerInterval = setInterval(()=>{

        QuestionEngine.timerSeconds--;

        if(
            !QuestionEngine.timerJumped &&
            QuestionEngine.timerSeconds === jumpAt
        ){

            QuestionEngine.timerJumped = true;

            timer.textContent = "TIME SYNC";

            timer.classList.add("panic");

        setTimeout(()=>{

    Audio.playSFX("event_panictimerglitch");

    QuestionEngine.timerSeconds = 15;

    const minutes = "00";

    const seconds = "15";

    timer.textContent = `${minutes}:${seconds}`;

},180);

        }

        if(timer.textContent !== "TIME SYNC"){

            const minutes =
                String(Math.floor(QuestionEngine.timerSeconds/60))
                .padStart(2,"0");

            const seconds =
                String(QuestionEngine.timerSeconds%60)
                .padStart(2,"0");

            timer.textContent =
                `${minutes}:${seconds}`;

        }

        if (QuestionEngine.timerSeconds === 3) {

    Audio.playSFX("timer_warning");

}

        if(QuestionEngine.timerSeconds<=0){

            clearInterval(QuestionEngine.timerInterval);

        }

    },1000);

}