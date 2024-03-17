window.WebSocketOriginal = window.WebSocket;
(function () {
  function CustomWebSocket(url) {
    const ws = new window.WebSocketOriginal(url);
    Object.getOwnPropertyNames(window.WebSocket.prototype).forEach(methodName => {
      if (methodName !== 'constructor') {
        CustomWebSocket.prototype[methodName] = ws[methodName].bind(ws);
      }
    });
  }
  window.WebSocket = CustomWebSocket;
})();
t
