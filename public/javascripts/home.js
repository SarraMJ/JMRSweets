$(function () {

    // Modified function to handle form submission
    $('#uploadForm').on('submit', function (event) {
      event.preventDefault(); // Prevent the form from submitting in the traditional way
      
      var formData = new FormData($(this)[0]); // Create FormData object to send files 
      // constructs a set of key/value pairs representing form fields and their values, here = collects the data from the selected files
      $.ajax({
        url: '/upload', //where request will be sent
        type: 'POST', //how = post method
        data: formData, //what= our uploaded files 
        contentType: false, // Don't set content type (it will be automatically set) because jquery does it
        processData: false, // Don't process the data (it will be automatically processed) because jquery does it
        success: function (data) {
          console.log('Files uploaded successfully:', data);
          // Handle the server response if needed
        },
        error: function (error) {
          console.error('Error uploading files:', error);
          // Handle errors if any
        }
      });
    });

  // Bouton "Execute Hello.py"
  $('#executeHelloButton').on('click', function () {
    $.get('/run-hello', function (data) {
      // Affichez la sortie du script Python dans l'élément avec l'ID "helloResult"
      $('#helloResult').text(data.result);
    });
  });


});