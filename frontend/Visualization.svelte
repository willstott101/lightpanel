<script>
    import Canvas from "./Canvas.svelte";
</script>

<style>
    .root {
        background-color: #353535;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        transform: rotate(180deg);
    }
</style>

<div class="root">
    <Canvas id="a"></Canvas>
    <!-- <Canvas id="b"></Canvas> -->
</div>