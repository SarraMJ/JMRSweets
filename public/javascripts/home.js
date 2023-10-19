$(function () {

  //When we click "choose files" the message in "uploadMessage" div disappears (in case user wants to reupload a file)
  $('input[name="images"]').on('change', function () {
    $('#uploadMessage').text('');
  });

  // Handle form submission
  $('#uploadForm').on('submit', function (event) {
    event.preventDefault(); // Prevents form from submitting in the traditional way

    var formData = new FormData($(this)[0]);  // Create FormData object to send files 
    // constructs a set of key/value pairs representing form fields and their values, here = collects the data from the selected files
    $.ajax({
      url: '/upload', //where request will be sent
      type: 'POST',
      data: formData, //what= our uploaded files 
      contentType: false, // Don't set content type (it will be automatically set) because jquery does it
      processData: false,  // Don't process the data (it will be automatically processed) because jquery does it
      success: function (data) {
        // Shows the success message + resets form to upload new images if needed
        $('#uploadMessage').text(data.message);
        $('#uploadForm')[0].reset();
      },
      error: function (error) {
        console.error('Error uploading files:', error);
      }
    });
  });

  //  Python part
  $('#executeHelloButton').on('click', function () {
    $.get('/run-hello', function (data) {
      $('#helloResult').text(data.result);
    });
  });
});
