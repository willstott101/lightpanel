<script>
    import Visualization from "./Visualization.svelte";
    import Color from "./widgets/Color.svelte";
    import Button from "./widgets/Button.svelte";
    import Slider from "./widgets/Slider.svelte";
    import Selector from "./widgets/Selector.svelte";
    import MdPlay from "svelte-icons/md/MdPlayArrow.svelte";
    import MdStop from "svelte-icons/md/MdStop.svelte";
    import FaPowerOff from 'svelte-icons/fa/FaPowerOff.svelte'
    import { executor } from './globals';
    import { controller } from './globals';

    let running = executor.running;
    let on = executor.on;
    let brightnessDemand = executor.maxBrightness;
    let brightnessActual = brightnessDemand;
    let balanceDemand = executor.whiteBalance;
    let balanceActual = balanceDemand;
    let patchDemand = executor.patchName;
    let patchActual = patchDemand;
    let paletteDemand = executor.paletteName;
    let paletteActual = paletteDemand;
    executor.addListener((msg) => {
        if (msg.type === "change") {
            if (msg.data.field === "maxBrightness") {
                brightnessActual = Math.sqrt(msg.data.value);
            } else if (msg.data.field === "on") {
                on = msg.data.value;
            } else if (msg.data.field === "whiteBalance") {
                balanceActual = msg.data.value;
            } else if (msg.data.field === "running") {
                running = msg.data.value;
            } else if (msg.data.field === "patchName") {
                patchActual = msg.data.value;
            } else if (msg.data.field === "paletteName") {
                paletteActual = msg.data.value;
            }
        }
    });

    function togglePause () {
        if (!running)
            controller.start();
        else
            controller.stop();
    }

    function toggleOff () {
        controller.on = !on;
    }

    // but async... so binding is weird
    $: controller.maxBrightness = Math.pow(brightnessDemand, 2);
    $: controller.whiteBalance = balanceDemand;
    $: controller.patchName = patchDemand;
    $: controller.paletteName = paletteDemand;
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
        grid-template-rows: 6em 6em 6em 6em;
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
            <Button on:mousedown={toggleOff} enabled={on} iconSize="small">
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
            <Slider bind:valueIn={brightnessActual} bind:valueOut={brightnessDemand}/>
        </div>
        <!-- <div style="
            grid-column-start: 4;
            grid-column-end: 4;
            grid-row-start: 1;
            grid-row-end: 3;
        ">
            <Slider bind:valueIn={balanceActual} bind:valueOut={balanceDemand}/>
        </div> -->
        <div style="
            grid-column-start: 1;
            grid-column-end: 1;
            grid-row-start: 3;
            grid-row-end: 3;
        ">
            <Selector bind:valueIn={patchActual} bind:valueOut={patchDemand}/>
        </div>
        <div style="
            grid-column-start: 2;
            grid-column-end: 2;
            grid-row-start: 3;
            grid-row-end: 3;
        ">
            <Color bind:valueIn={paletteActual} bind:valueOut={paletteDemand}/>
        </div>
    </div>
</div>