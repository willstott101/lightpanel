<script>
    import Canvas from "./Canvas.svelte";
</script>

<style>
    .root {
        background-color: black;
        display: flex;
        flex-direction: column;
        align-items: center;
        height: 100%;
        transform: rotate(180deg);
        border-radius:  3px;
    }
</style>

<div class="root">
    <Canvas id="a"></Canvas>
    <!-- <Canvas id="b"></Canvas> -->
</div>