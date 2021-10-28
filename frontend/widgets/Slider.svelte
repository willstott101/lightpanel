<script>
    import { remap, clamp } from "../../engine/math.js";

    export let value = 0.5;
    let track;

    function moveSlider(event) {
        if (event.pressure > 0.1) {
            let rect = track.getBoundingClientRect();
            let v = remap(event.clientY, rect.bottom, rect.top, 0, 1);
            value = clamp(v, 0, 1);
        }
    }
</script>

<style>
    .base {
        display: inline-block;
        box-sizing: border-box;
        background-clip: padding-box;
        width: 90%;
        height: 100%;
        border: 3px solid transparent;
        border-radius: 10px;
        padding: 20% 10%;
        background-color: #d9d6d0;
        touch-action: none;
        user-select: none;
    }
    .knob {
        background-color: #d9d6d0;
        width: 100%;
        height: 1.2em;
        float: left;
        margin: 0;
        border-radius: 5px;
        box-shadow:
            8px 1px 20px 0px rgb(0 0 0 / 20%),
            2px 4px 5px 1px rgb(0 0 0 / 20%),
            inset 1px 2px 3px 0px #ffffff57;
        cursor: pointer;
        position: relative;
        transform: translateY(-50%);
    }
    .knob:after {
        width: 80%;
        height: 0.2em;
        margin: auto;
        margin-top: 0.5em;
    }
    .track {
        height: 100%;
        width: 100%;
        margin: auto;
    }
    .track:after {
        height: 100%;
        width: 4px;
        background: #0002;
        margin: auto;
        border-radius: 4px;
    }
    .knob:after, .track:after {
        content: "";
        display: block;
        box-shadow: inset 1px 2px 3px 0px #0004;
    }
</style>

<div class="base" on:pointermove="{moveSlider}" on:pointerout="{moveSlider}">
    <div class="track" bind:this={track}>
        <div class="knob" style="top:{(1 - value) * 100}%;" />
    </div>
</div>