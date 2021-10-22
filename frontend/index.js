/* Add JavaScript code here! */
import App from "./App.svelte";

const root = document.getElementById("app-root");
// Clear previous additions (via HMR)
while (root.lastChild)
    root.removeChild(root.lastChild);

const app = new App({
  target: root,
});

export default app;