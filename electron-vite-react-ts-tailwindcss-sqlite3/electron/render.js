// src/renderer/render.ts
window.electron.receive("channel", (data) => {
  console.log(data);
});

window.electron.send("channel", "Hello from renderer");
