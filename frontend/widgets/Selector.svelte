<script>
  import * as patterns from "../../patterns/index.js";

  export let valueIn = "solid";
  export let valueOut = "solid";

  const names = Object.keys(patterns);
</script>

<select on:change={(e) => valueOut = e.target.value}>
  {#each names as name}
    <option value={name} selected={name === valueIn}>{name}</option>
  {/each}
</select>