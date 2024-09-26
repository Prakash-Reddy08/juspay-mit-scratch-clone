class CommandsHandler {
    constructor(sprite) {
        this.sprite = sprite;
        this.intervalId = null;
    }


    get move() {
        return ({ steps }) => {
            const radians = (this.sprite.rotation * Math.PI) / 180;
            this.sprite.position.x += Math.cos(radians) * steps;
            this.sprite.position.y += Math.sin(radians) * steps;
        };
    }


    get rotate() {
        return ({ degrees }) => {
            this.sprite.rotation += degrees;
        };
    }

    get goTo() {
        return ({ x, y }) => {
            this.sprite.position.x = x;
            this.sprite.position.y = y;
        };
    }

    get repeat() {
        return (interval = 1000) => {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
            this.intervalId = setInterval(() => {
                if (!this.sprite || !this.sprite.actions) return;
                this.sprite.actions.forEach(action => {
                    this.executeCommand(action);
                });
            }, interval);
        };
    }

    stopRepeat() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    executeCommand(action) {
        if (this[action.type.toLowerCase()]) {
            this[action.type.toLowerCase()](action.payload);
        }
    }
}

export default CommandsHandler;
