<script>
    import { onMount } from 'svelte';
    import { canvasReady } from './engine';
    export let id;
    let canvas;
    onMount(() => {
        canvasReady(canvas);
    });
</script>

<canvas id={id} bind:this={canvas} width="60" height="10">
    Get a canvas compatible browser please.
</canvas>