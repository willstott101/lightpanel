const canvases = {
    a: undefined,
    b: undefined,
};

export function canvasReady(canvas) {
    canvases[canvas.id] = canvas;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}