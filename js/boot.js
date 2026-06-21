const bootLines = [
    "Echo Protocol v1.0",
    "",
    "> Initializing...",
    "> Loading Audio...",
    "> Loading Assets...",
    "> Synchronizing Resonance Database...",
    "> Loading Voiceprints...",
    "> Recognition Engine Ready...",
    "> Opening Session..."
];

function startBoot(){

    const boot = document.getElementById("boot");

    boot.innerHTML = `
        <div id="terminal"></div>
    `;

    const terminal = document.getElementById("terminal");

    let index = 0;

    function nextLine(){

        if(index >= bootLines.length){

            setTimeout(()=>{

                showScene("menu");

            },1000);

            return;

        }

        const line = document.createElement("p");

        line.textContent = bootLines[index];

        terminal.appendChild(line);

        terminal.scrollTop = terminal.scrollHeight;

        index++;

        setTimeout(nextLine,450);

    }

    nextLine();

}