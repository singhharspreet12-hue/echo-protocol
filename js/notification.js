const NotificationPanel = {

    async show(lines){

        const overlay =
            document.getElementById("systemNotification");

        const body =
            document.getElementById("notificationBody");

        const button =
            document.getElementById("notificationContinue");

        overlay.classList.remove("hidden");

        body.innerHTML = "";

        const cursor = document.createElement("span");

cursor.id = "notificationCursor";

cursor.textContent = "█";

        button.classList.remove("visible");

        for (const line of lines) {

    const row = document.createElement("div");

    row.className = "notification-line";

    row.textContent = line;

    body.appendChild(row);

    body.appendChild(cursor);

    requestAnimationFrame(() => {

        row.classList.add("visible");

    });

    await Animation.sleep(1100);

}

        return new Promise(resolve=>{

            button.classList.add("visible");

            button.onclick=()=>{

                overlay.classList.add("hidden");

                resolve();

            };

        });

    }

};