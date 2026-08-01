const Storage = {

    key: "EchoProtocolSave",

    defaultData: {

    hardModeCleared: false,

    errorModeUnlocked: false,

    archive02Unlocked: false,
    archive03Unlocked: false,
    archive04Unlocked: false,

    archive02PopupSeen: false,
    archive03PopupSeen: false,
    archive04PopupSeen: false,

    musicEnabled: true,

musicVolume: 35,

sfxEnabled: true,

sfxVolume: 100,

},

    load() {

        const save = localStorage.getItem(this.key);

        if (!save) {

            localStorage.setItem(
                this.key,
                JSON.stringify(this.defaultData)
            );

            return { ...this.defaultData };

        }

        return {

            ...this.defaultData,

            ...JSON.parse(save)

        };

    },

    save(data) {

        localStorage.setItem(
            this.key,
            JSON.stringify(data)
        );

    },

    get(property) {

        return this.load()[property];

    },

    set(property, value) {

        const data = this.load();

        data[property] = value;

        this.save(data);

    }

};