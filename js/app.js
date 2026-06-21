const App = {

    currentScene:null,

    scenes:{}

};

function registerScene(name,element){

    App.scenes[name]=element;

}

function showScene(name){

    Object.values(App.scenes).forEach(scene=>{

        scene.classList.add("hidden");

    });

    App.scenes[name].classList.remove("hidden");

    App.currentScene=name;

}

document.addEventListener("DOMContentLoaded",()=>{

    const app=document.getElementById("app");

    app.innerHTML=`

<section id="boot" class="scene">

<h1>Echo Protocol</h1>

</section>

<section id="menu" class="scene hidden">

<h2>Main Menu</h2>

</section>

`;

    registerScene("boot",document.getElementById("boot"));

    registerScene("menu",document.getElementById("menu"));

showScene("boot");

startBoot();

});