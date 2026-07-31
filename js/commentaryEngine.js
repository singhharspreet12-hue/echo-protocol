const CommentaryEngine = {

    state: {

        mode: "hard",

        firstCorrect: false,

        firstWrong: false,

        correctStreak: 0,

        wrongStreak: 0,

        protocolDriftSeen: false,

        perfectRun: true

    },

    reset(mode = "hard") {

        this.state.mode = mode;

        this.state.firstCorrect = false;

        this.state.firstWrong = false;

        this.state.correctStreak = 0;

        this.state.wrongStreak = 0;

        this.state.protocolDriftSeen = false;

        this.state.perfectRun = true;

    },

    answered(correct) {

        if (correct) {

            this.state.correctStreak++;

            this.state.wrongStreak = 0;

        } else {

            this.state.wrongStreak++;

            this.state.correctStreak = 0;

            this.state.perfectRun = false;

        }

    },

    markProtocolDrift() {

        this.state.protocolDriftSeen = true;

    },

    getComment(correct) {

    const table = Commentary[this.state.mode];

    const question = QuestionEngine.questions[QuestionEngine.currentQuestion];

if (
    question &&
    question.event === "dialogue" &&
    Array.isArray(question.eventDialogue)
) {
    return question.eventDialogue;
}

    this.answered(correct);

    if (
    QuestionEngine.currentQuestion ===
    QuestionEngine.questions.length - 1
) {

    return [
    "Final voice sample."
];

}

    if (this.state.correctStreak === 3) {

    return [
        table.streak3[
            Math.floor(Math.random() * table.streak3.length)
        ]
    ];

}

if (this.state.wrongStreak === 3) {

    return [
    "Recognition quality declining."
];

}

    if (correct && !this.state.firstCorrect) {

        this.state.firstCorrect = true;

       return [
    table.firstCorrect[
        Math.floor(Math.random() * table.firstCorrect.length)
    ]
];

    }

    if (!correct && !this.state.firstWrong) {

        this.state.firstWrong = true;

        return [
    table.firstWrong[
        Math.floor(Math.random() * table.firstWrong.length)
    ]
];

    }

    if (correct && table.randomCorrect.length) {

        return [
    table.randomCorrect[
        Math.floor(Math.random() * table.randomCorrect.length)
    ]
];

    }

    if (!correct && table.randomWrong.length) {

        return [
    table.randomWrong[
        Math.floor(Math.random() * table.randomWrong.length)
    ]
];

    }

    const result = "...";

return Array.isArray(result)
    ? result
    : [result];

}

};