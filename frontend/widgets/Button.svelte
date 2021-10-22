<style>
    .base {
        background-color: #d9d6d0;
        width: 3em;
        height: 3em;
        padding: 1em;
        border-radius: 0.3em;
        margin: 0.25em;
        display: block;
    }
    .base:active:hover {
        box-shadow: inset 1px 2px 6px 0px #00000052;
    }
    .knob {
        background-color: #d9d6d0;
        width: 100%;
        height: 100%;
        margin: 0;
        display: block;
        border-radius: 50%;
        box-shadow:
            8px 1px 20px 0px rgb(0 0 0 / 20%),
            2px 4px 5px 1px rgb(0 0 0 / 20%),
            inset 1px 2px 3px 0px #ffffff57;
    }
    .icon {
        text-align: center;
        padding: 0.2em;
        box-sizing: border-box;
        font-size: 1.6em;
        color: grey;
        user-select: none;
    }
</style>

<div class="base" on:click>
    <div class="knob icon">
        <slot></slot>
    </div>
</div>