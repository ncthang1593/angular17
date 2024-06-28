/// <reference lib="webworker" />

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  setTimeout(() => {
    postMessage(response);
  }, 3000);
});
