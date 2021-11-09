<script>
    import Visualization from "./Visualization.svelte";
    import Button from "./widgets/Button.svelte";
    import Slider from "./widgets/Slider.svelte";
    import MdPlay from "svelte-icons/md/MdPlayArrow.svelte";
    import MdStop from "svelte-icons/md/MdStop.svelte";
    import FaPowerOff from 'svelte-icons/fa/FaPowerOff.svelte'
    import { executor } from './globals';

    let running = true;
    function togglePause () {
        running = !running;
        if (running)
            executor.start();
        else
            executor.stop();
    }

    let off = false;
    const defaultBrightness = executor.maxBrightness;
    let brightness = defaultBrightness;
    let balance = executor.whiteBalance;

    function updateBrightness () {
        if (off)
            executor.maxBrightness = 0;
        else
            executor.maxBrightness = brightness;
    }

    function toggleOff () {
        off = !off;
        if (!off && brightness === 0)
            brightness = defaultBrightness;
        updateBrightness();
        if (!running) executor.runOnce();
    }

    function brightnessChanged() {
        if (brightness <= 0)
            off = true;
        else
            off = false;
        updateBrightness();
        if (!running) executor.runOnce();
    }

    $: brightnessChanged(brightness);
    $: executor.whiteBalance = balance;
</script>

<style>
    .root {
        background-color: #353535;
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .grid {
        display: inline-grid;
        grid-template-columns: auto 6em 6em 6em;
        grid-template-rows: 6em 6em;
    }
</style>

<div class="root">
    <div class="grid">
        <div style="
            /*grid-column-start: 1;*/
            /*grid-column-end: 1;*/
            grid-row-start: 1;
            grid-row-end: 3;
        ">
            <Visualization/>
        </div>
        <div style="
            grid-column-start: 2;
            grid-column-end: 2;
            /*grid-row-start: 1;*/
            /*grid-row-end: 1;*/
        ">
            <Button on:mousedown={toggleOff} enabled={!off} iconSize="small">
                <FaPowerOff/>
            </Button>
        </div>
        <div style="
            grid-column-start: 2;
            grid-column-end: 2;
            grid-row-start: 2;
            /*grid-row-end: 2;*/
        ">
            <Button on:mousedown={togglePause} enabled={running}>
                {#if running}
                    <MdPlay/>
                {:else}
                    <MdStop/>
                {/if}
            </Button>
        </div>
        <div style="
            grid-column-start: 3;
            grid-column-end: 3;
            grid-row-start: 1;
            grid-row-end: 3;
        ">
            <Slider bind:value={brightness}/>
        </div>
        <div style="
            grid-column-start: 4;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 3;
        ">
            <Slider bind:value={balance}/>
        </div>
    </div>
</div>