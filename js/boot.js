async function startBoot() {

    const boot = document.getElementById("boot");

    boot.innerHTML = `
        <div id="terminal"></div>
    `;

    Terminal.init("terminal");

    for (const step of bootSequence) {

        switch (step.type) {

            case "title":
                await Terminal.print(step.text);
                break;

            case "subtitle":
                await Terminal.print(step.text);
                break;

            case "blank":
                await Terminal.print("");
                break;

            case "ok":
                await Terminal.ok(step.text);
                break;

            case "warn":
                await Terminal.warn(step.text);
                break;

            case "error":
                await Terminal.error(step.text);
                break;

            case "pause":
                await Terminal.pause(step.time);
                break;

        }

    }

    // Keep the blinking cursor visible after boot
    Terminal.showCursor();

    // Dramatic pause before takeover
    await Terminal.pause(2000);

    // The actual takeover will happen in File 2
    showScene("menu");

    Audio.fadeInMusic("Main Menu");

}