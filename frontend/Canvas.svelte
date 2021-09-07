<script>
    import { onMount } from 'svelte';
    import { renderer } from './globals';
    export let id;
    let canvas;
    onMount(() => {
        renderer.getView(id).canvasReady(canvas);
    });
</script>

<canvas id={id} bind:this={canvas} width="60" height="10">
    Get a canvas compatible browser please.
</canvas>