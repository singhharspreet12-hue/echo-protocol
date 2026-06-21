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

    await Terminal.pause(1000);

    showScene("menu");

}