<script>
    import ColorPicker from "./ColorPicker.svelte";
    import { executor } from "../../engine/configured.js";
    import { styleStringFromPalette } from "../css.js";

    export let enabled = false;
    export let valueIn = executor.paletteName;
    export let valueOut = executor.paletteName;

    let grad = styleStringFromPalette((executor.palettes || {})[valueIn]);

    function toggle() {
        enabled = !enabled;
    }

    $: grad = styleStringFromPalette((executor.palettes || {})[valueIn]);
</script>

<style>
    .base {
        background-color: #d9d6d0;
        box-sizing: border-box;
        background-clip: padding-box;
        padding: 15%;
        border: 3px solid transparent;
        border-radius: 10px;
        display: inline-block;
        height: 100%;
        width: 100%;
        z-index: 0;
        user-select: none;
    }
    .base.enabled {
        box-shadow: inset 1px 2px 6px 0px #00000052;
    }
    .knob {
        width: 100%;
        height: 100%;
        margin: 0;
        border-radius: 20%;
        box-shadow:
            8px 1px 30px 0px rgb(0 0 0 / 20%),
            inset 2px 4px 5px 1px rgb(0 0 0 / 20%),
            inset -2px -2px 10px 0px #ffffff57;
    }
    .enabled {
        color: white;
        filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
    }
</style>

<div class="base" on:mousedown={toggle} class:enabled={enabled}>
    <div class="knob" style={grad}/>
    <ColorPicker bind:enabled bind:valueOut/>
</div>