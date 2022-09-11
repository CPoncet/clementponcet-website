const getFeather = new Promise((resolve, reject) => {
  const featherScript = document.createElement('script');
  document.body.appendChild(featherScript);
  featherScript.onload = resolve;
  featherScript.onerror = reject;
  featherScript.async = true;
  featherScript.src = 'https://unpkg.com/feather-icons';
});

const getHighlight = new Promise((resolve, reject) => {
  const highlightScript = document.createElement('script');
  document.body.appendChild(highlightScript);
  highlightScript.onload = resolve;
  highlightScript.onerror = reject;
  highlightScript.async = true;
  highlightScript.src =
    'https://unpkg.com/@highlightjs/cdn-assets@11.6.0/highlight.min.js';
});

getFeather.then(() => {
  feather.replace();
});

getHighlight.then(() => {
  hljs.highlightAll();
});
