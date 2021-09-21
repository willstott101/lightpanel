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
        height: 100px;
        image-rendering: pixelated;
        /*filter:  blur(4px);*/
    }

    div {
        border: solid #848484 3px;
        margin:  10px;
        height: 100px;
    }
</style>

<div>
    <canvas id={id} bind:this={canvas} width="48" height="25">
        Get a canvas compatible browser please.
    </canvas>
</div>