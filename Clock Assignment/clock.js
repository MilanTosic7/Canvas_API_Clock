const canvas = document.getElementById('clock');
const ctx = canvas.getContext('2d');

let animationId;

function drawClock() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

   
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 150, 0, Math.PI * 2);
    ctx.fillStyle = 'white'; 
    ctx.fill();
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5;
    ctx.stroke();
    ctx.closePath();

    
    ctx.font = '24px Arial';
    ctx.fillStyle = 'black';

    for (let i = 1; i <= 12; i++) {
        const angle = (i - 3) * (Math.PI * 2) / 12;
        const x = canvas.width / 2 + 130 * Math.cos(angle); 
        const y = canvas.height / 2 + 130 * Math.sin(angle); 
        const textWidth = ctx.measureText(i.toString()).width;
        ctx.fillText(i.toString(), x - textWidth / 2, y + 10); 
    }

    
    const hourAngle = (hours % 12) * 30 + (minutes / 60) * 30;
    drawHand(hourAngle, 80, 10);

    
    const minuteAngle = minutes * 6 + (seconds / 60) * 6;
    drawHand(minuteAngle, 120, 5);

    
    const secondAngle = seconds * 6;
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    drawHand(secondAngle, 140, 2);

    
    seconds++;
    if (seconds === 60) {
        seconds = 0;
        minutes++;
        if (minutes === 60) {
            minutes = 0;
            hours++;
            if (hours === 12) {
                hours = 0;
            }
        }
    }

    animationId = requestAnimationFrame(drawClock);
}

function drawHand(angle, length, width) {
    const radians = (angle - 90) * (Math.PI / 180);
    const x = canvas.width / 2 + length * Math.cos(radians);
    const y = canvas.height / 2 + length * Math.sin(radians);

    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(x, y);
    ctx.strokeStyle = 'black';
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();
    ctx.closePath();
}

const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');

startButton.addEventListener('click', () => {
    if (!animationId) {
        animationId = requestAnimationFrame(drawClock);
    }
});

stopButton.addEventListener('click', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
        animationId = undefined;
    }
});


let hours = 11;
let minutes = 55;
let seconds = 0;


drawClock();
