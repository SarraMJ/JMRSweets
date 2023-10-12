$(function () {
  // Bouton "Execute Hello.py"
  $('#executeHelloButton').on('click', function () {
    $.get('/run-hello', function (data) {
      // Affichez la sortie du script Python dans l'élément avec l'ID "helloResult"
      $('#helloResult').text(data.result);
    });
  });
});
