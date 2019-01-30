const canvas = document.getElementById('draw');
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
ctx.strokeStyle = '#BADA55';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = '50';
// See mdn for various types of effect
ctx.globalCompositeOperation = 'source-over';

// isDrawing becomes true when mouse is down and false when mouseout or mouseup
let isDrawing = false;

// Initialize variables to be used to keep track of last point on canvas
let lastX = 0;
let lastY = 0;
// Initialize hue to be used in hsl color of line
hue = 0;

// If true lineWidth will increment by 1, otherwise decrement by 1
direction = true;

function draw(e){
    if(!isDrawing){
        return
    }
    ctx.strokeStyle = `hsl(${hue},100%,50%)`;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    // Destructuring Assignment
    [lastX, lastY] = [e.offsetX, e.offsetY];
    hue++
    
    // Reset hue when reaches 360 (not required)
    if(hue >=360){
        hue = 0;
    } 

    // If line gets too thin or too fat change switch direction of lineWidth change
    if(ctx.lineWidth >= 100 || ctx.lineWidth <= 1){
        direction = !direction;
    }
    if(direction){
        ctx.lineWidth++;
    } else {
        ctx.lineWidth--;
    }
}
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mousedown', (e) => {
    [lastX, lastY] = [e.offsetX, e.offsetY];
    isDrawing = true;
});
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
