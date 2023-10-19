$(function () {
  // Modified function to handle form submission
  $('#uploadForm').on('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting in the traditional way

    var formData = new FormData($(this)[0]); // Create FormData object to send files
    $.ajax({
      url: '/upload',
      type: 'POST',
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        // Affichez le message dans l'élément avec l'ID "uploadMessage"
        $('#uploadMessage').text(data.message);
      },
      error: function (error) {
        console.error('Error uploading files:', error);
      }
    });
  });

  // Bouton "Execute Hello.py"
  $('#executeHelloButton').on('click', function () {
    $.get('/run-hello', function (data) {
      $('#helloResult').text(data.result);
    });
  });
});
