// Canvas Constants
const canvasElement = document.getElementById('canvas-1');
const canvasContext = canvasElement.getContext('2d');

canvasElement.width = window.innerWidth;
canvasElement.height = window.innerHeight;

class Symbol {
    
    constructor(x , y, fontSize, canvasHeight) {
        this.characters = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        this.x = x;
        this.y = y;
        this.fontSize = fontSize;
        this.text = '';
        this.canvasHeight = canvasHeight;
    }

    draw(context) {
        this.text = this.characters.charAt(Math.floor(Math.random()*this.characters.length));
        context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
        if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.98) {
            this.y = 0;
        } else {
            this.y += 1;
        }
    }
}

class Effect {
    constructor(canvasElementWidth, canvasElementHeight) {
        this.canvasElementWidth = canvasElementWidth;
        this.canvasElementHeight = canvasElementHeight;
        this.fontSize = 25;
        this.columns = this.canvasElementWidth / this.fontSize;
        this.symbols = [];
        this.#initialize();
    }

    // private method
    #initialize() {
        for (let i = 0; i < this.columns; i++) {
            this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasElementHeight); // new triggers constructor
        }
    }

    resize(width, height) {
        this.canvasElementHeight = height;
        this.canvasElementWidth = width; 
        this.columns = this.canvasElementWidth / this.fontSize; 
        this.symbols = [];
        this.#initialize();
    }
}

// Frame rate settings
const effect = new Effect(canvasElement.width, canvasElement.height);
let lastTime = 0;
const FPS = 20;
const nextFrame = 1000/FPS;
let timer = 0;

// Gradient settings
// can also use createRadialGradient
let gradient = canvasContext.createLinearGradient(0, 0, canvasElement.width, canvasElement.height);
gradient.addColorStop(Math.random(), 'red');
gradient.addColorStop(Math.random(), 'yellow');
gradient.addColorStop(Math.random(), 'green');
gradient.addColorStop(Math.random(), 'orange');
gradient.addColorStop(Math.random(), 'blue');
gradient.addColorStop(Math.random(), 'magenta');

function animate(timeStamp) {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;
    if (timer > nextFrame) {
        canvasContext.fillStyle = 'rgba(0, 0, 0, 0.05)';
        canvasContext.textAlign = 'center';
        canvasContext.fillRect(0, 0, canvasElement.width, canvasElement.height);
        canvasContext.fillStyle =  gradient; // 'green';
        canvasContext.font = effect.fontSize + "px monospace";
        effect.symbols.forEach(symbol => symbol.draw(canvasContext));
        timer = 0;
    } else {
        timer += deltaTime;
    }

    requestAnimationFrame(animate);
}

animate(0);

window.addEventListener('resize', function() {
    // set the new canvas but still need to update effect
    canvasElement.width = window.innerWidth;
    canvasElement.height = window.innerHeight;
    effect.resize(canvasElement.width, canvasElement.height);
    gradient = canvasContext.createLinearGradient(0, 0, canvasElement.width, canvasElement.height);
    gradient.addColorStop(0, 'red');
    gradient.addColorStop(0.2, 'yellow');
    gradient.addColorStop(0.4, 'green');
    gradient.addColorStop(0.6, 'blue');
    gradient.addColorStop(0.8, 'orange');
    gradient.addColorStop(1, 'magenta');
})