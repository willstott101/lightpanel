<script>
    import { executor } from "../../engine/configured.js";
    import { styleStringFromPalette } from "../css.js";

    export let enabled = false;
    export let valueOut = executor.paletteName;

    let availablePalettes = [];
    function paletteChange() {
        availablePalettes = Object.entries(executor.palettes || {});
        availablePalettes = availablePalettes.filter((a) => typeof a[1] === "object");
    }
    executor.addListener(paletteChange);
    paletteChange();

    function mousedown(event) {
        event.stopPropagation();
    }

    function choosePalette(name) {
        valueOut = name;
        enabled = false;
    }
</script>

<style>
    .base {
        display: none;
        background-color: #d9d6d0;
        box-sizing: border-box;
        background-clip: padding-box;
        padding: 15%;
        border-radius: 10px;
        z-index: -100;
    }
    .base.enabled {
        display: block;
        position: absolute;
        box-shadow: 1px 5px 10px 0px #00000066;
    }

    .item {
        height: 4em;
        width: 4em;
        border-radius: 20%;
        box-shadow:
            8px 1px 30px 0px rgb(0 0 0 / 20%),
            inset 2px 4px 5px 1px rgb(0 0 0 / 20%),
            inset -2px -2px 10px 0px #ffffff57;
    }
</style>

<div class="base" class:enabled={enabled} on:mousedown={mousedown}>
    {#each availablePalettes as palette}
        <div
            class="item"
            style={styleStringFromPalette(palette[1])}
            on:mousedown={choosePalette.bind(null, palette[0])}
        ></div>
    {/each}
</div>