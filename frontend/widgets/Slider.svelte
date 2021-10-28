<script>
    export let value = 0.5;
    let y = 80-(19.2/2);
    let track;

    function moveSlider(event) {
        if (event.pressure > 0.1) {
            let offsetY = track.offsetTop
            let bottomLimit = track.getBoundingClientRect().bottom
            let length = bottomLimit - offsetY
            if (event.clientY < bottomLimit && event.clientY > offsetY) {
                y = event.clientY - offsetY - (19.2/2);
            }
            value = (y+(19.2/2))/length
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
        padding: 12%;
        background-color: #d9d6d0;
        touch-action: none;
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
    }
    .knob:after {
        content: "";
        display: block;
        width: 80%;
        box-shadow: inset 1px 2px 3px 0px #0003;
        height: 0.2em;
        margin: auto;
        margin-top: 0.5em;
    }
    .track {
        height: 100%;
        background: #0002;
        width: 4px;
        box-shadow: inset 1px 2px 3px 0px #0004;
        margin: auto;
        border-radius: 4px;
    }
</style>

<div class="base" on:pointermove="{moveSlider}">
    <div class="knob" style="position:relative; top:{y}px;" />
    <div class="track" bind:this={track} />
</div>