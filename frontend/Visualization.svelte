<script>
    import Canvas from "./Canvas.svelte";
</script>

<style>
    .root {
        background-color: #353535;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>

<div class="root">
    <Canvas id="a"></Canvas>
    <Canvas id="b"></Canvas>
</div>