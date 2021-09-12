<script>
    import { onMount } from 'svelte';
    import { renderer } from './globals';
    export let id;
    let canvas;
    onMount(() => {
        renderer.getView(id).canvasReady(canvas);
    });
</script>

<style>
    canvas {
        height: 40px;
        image-rendering: pixelated;
        filter:  blur(4px);
    }

    div {
        border: solid #848484 3px;
        margin:  10px;
    }
</style>

<div>
    <canvas id={id} bind:this={canvas} width="60" height="10">
        Get a canvas compatible browser please.
    </canvas>
</div>