<script>
  import patterns from "../../patterns/index.js";

  export let valueIn = "solid";
  export let valueOut = "solid";

  const names = Object.keys(patterns);
</script>

<style>
  option, select {
    text-align: center;
    font-weight: bold;
    border-radius: 10px;
    background-color: #d9d6d0;
  }
  select {
    width: 100%;
    height: 100%;
    font-size: 3em;
    color: gray;
  }
  option {
    font-size: 0.7em;
    padding:  0.2em;
  }
</style>

<select on:change={(e) => valueOut = e.target.value}>
  {#each names as name}
    <option value={name} selected={name === valueIn}>{name}</option>
  {/each}
</select>