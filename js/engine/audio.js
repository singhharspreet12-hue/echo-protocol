const Audio = {

    music: null,

    musicVolume: 0.35,

    sfxVolume: 0.7,

    getCurrentMusicVolume() {

    const saved = Storage.get("musicVolume") ?? 35;

    return (saved / 100) * this.musicVolume;

},

    currentVoice: null,

    currentMusic: null,

    playMusic(file) {

    if (!Storage.get("musicEnabled")) {

        return;

    }

    if (this.music) {

        this.music.pause();

        this.music.currentTime = 0;

        this.music.src = "";

        this.music.load();

        this.music = null;

    }

    this.currentMusic = file;

    this.music = new window.Audio(
        `assets/music/${file}.mp3`
    );

    this.music.loop = true;

    const volume =

    Storage.get("musicVolume") ?? 35;

this.music.volume = this.getCurrentMusicVolume();

    return this.music.play();

},

    stopMusic() {

    if (!this.music) {

        return;

    }

    this.music.pause();

    this.music.currentTime = 0;

    this.music.src = "";

    this.music.load();

    this.music = null;

},

    playSFX(file, folder = "system") {

    if (!Storage.get("sfxEnabled")) {

        return;

    }

    const sound = new window.Audio(
        `assets/audio/${folder}/${file}.mp3`
    );

    const volume =
    Storage.get("sfxVolume") ?? 100;

const baseVolume =
    this.sfxVolume ?? 0.7;

sound.volume =
    (volume / 100) * baseVolume;

    sound.play().catch(() => {});

sound.addEventListener("ended", () => {

    sound.src = "";

    sound.load();

});

},

playVoice(file, folder = "voice") {

    if (!Storage.get("sfxEnabled")) {

        return Promise.resolve();

    }

    if (this.currentVoice) {

        this.currentVoice.pause();

        this.currentVoice.currentTime = 0;

    }

    const voice = new window.Audio(
        `assets/audio/${folder}/${file}.mp3`
    );

    const volume =
    Storage.get("sfxVolume") ?? 100;

const baseVolume =
    this.sfxVolume ?? 0.7;

voice.volume =
    (volume / 100) * baseVolume;

    this.currentVoice = voice;

    return new Promise((resolve) => {

        voice.addEventListener("ended", () => {

            if (this.currentVoice === voice) {

                this.currentVoice = null;

            }

            resolve();

        });

        voice.addEventListener("error", () => {

            if (this.currentVoice === voice) {

                this.currentVoice = null;

            }

            resolve();

        });

        voice.play().catch(() => {

            if (this.currentVoice === voice) {

                this.currentVoice = null;

            }

            resolve();

        });

    });

},

    async fadeOutMusic(speed = 0.03) {

    if (!this.music) return;

    while (this.music.volume > 0) {

        this.music.volume =
            Math.max(0, this.music.volume - speed);

        await Animation.sleep(80);

    }

    this.stopMusic();

},

async fadeInMusic(file, speed = 0.03) {

    this.playMusic(file);

    if (!this.music) {

        return;

    }

    this.music.volume = 0;

    const target =

    this.getCurrentMusicVolume();

    while (
        this.music &&
        this.music.volume < target
    ) {

        this.music.volume =
            Math.min(
                target,
                this.music.volume + speed
            );

        await Animation.sleep(80);

    }

}

};