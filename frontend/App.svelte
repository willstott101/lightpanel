<script>
    import Visualization from "./Visualization.svelte";
    import Button from "./widgets/Button.svelte";
    import MdPlay from "svelte-icons/md/MdPlayArrow.svelte";
    import MdStop from "svelte-icons/md/MdStop.svelte";
    import { executor } from './globals';

    let running = true;
    function togglePause () {
        running = !running;
        if (running)
            executor.start();
        else
            executor.stop();
    }
</script>

<style>
    .root {
        background-color: #353535;
        width: 100vw;
        height: 100vh;
    }
</style>

<div class="root">
    <Visualization></Visualization>
    <Button on:click={togglePause}>
        {#if running}
            <MdStop/>
        {:else}
            <MdPlay/>
        {/if}
    </Button>
</div>