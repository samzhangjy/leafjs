const serverUrl = `ws://${window.location.host}/socket`;
const socket = new WebSocket(serverUrl);

socket.addEventListener('open', () => {
  console.log(`%c[leafjs-dev]%c connected to server ${serverUrl}.`, 'color: #10b981', '');
});

socket.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  if (data.msg === 'reload') {
    window.location.reload();
    console.log('%c[leafjs-dev]%c reloading...', 'color: #10b981', '');
  } else if (data.msg === 'error') {
    console.error(`%c[leafjs-dev]%c error: ${data.data.replace(/\u001b\[.*?m/g, '')}`, 'color: #10b981', '');
  }
});

socket.addEventListener('close', () => {
  console.log('%c[leafjs-dev]%c disconnected.', 'color: #10b981', '');
});
