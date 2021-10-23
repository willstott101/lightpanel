<script>
    export let enabled = false;
    export let iconSize = "large";
</script>

<style lang="scss">
    .base {
        background-color: #d9d6d0;
        box-sizing: border-box;
        background-clip: padding-box;
        padding: 15%;
        border: 3px solid transparent;
        border-radius: 10px;
        display: inline-block;
    }
    .base:active:hover {
        box-shadow: inset 1px 2px 6px 0px #00000052;
    }
    .knob {
        width: 100%;
        height: 100%;
        margin: 0;
        border-radius: 50%;
        box-shadow:
            8px 1px 20px 0px rgb(0 0 0 / 20%),
            2px 4px 5px 1px rgb(0 0 0 / 20%),
            inset 1px 2px 3px 0px #ffffff57;
    }
    .icon {
        text-align: center;
        box-sizing: border-box;
        padding: 5%;
        line-height: 0;
        color: grey;
        user-select: none;
    }
    .enabled {
        color: white;
        filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.1));
    }
    .smallIcon {
        padding: 15%;
    }
</style>

<div class="base" on:click on:mousedown>
    <div class="knob icon" class:enabled={enabled} class:smallIcon={iconSize == "small"}>
        <slot></slot>
    </div>
</div>