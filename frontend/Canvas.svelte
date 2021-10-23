<script>
    import { onMount } from 'svelte';
    import { executor } from './globals';
    export let id;
    let canvas;
    onMount(() => {
        executor.getView(id).canvasReady(canvas);
    });
</script>

<style>
    canvas {
        height: 100%;
        image-rendering: pixelated;
    }

    div {
        border: 3px solid transparent;
        box-sizing: border-box;
        height: 100%;
    }
</style>

<div>
    <canvas id={id} bind:this={canvas} width="48" height="25">
        Get a canvas compatible browser please.
    </canvas>
</div>