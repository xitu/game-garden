window.addEventListener('message', function () {
  if (event.data == 'hello') {
    document.getElementById('#a').innerText = event.data;
  }
});
