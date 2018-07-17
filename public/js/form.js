function formSubmit(e) {
   e.preventDefault();
   var formData = {};
   var $formEl = $('.ui.form').find('input[required], textarea[required]');
   $.each($formEl, function(el, field) {
      var id = $(this).attr('id');
      var value = $(this).val();
      formData[id] = value;
   });
   if(validateFields(formData)) {
      $('.ui.form').submit();   
   }
}

function validateFields(data) {
   if(data.title.length < 10) {
      $('#title').setError('Title too short.');
   }
   if(data.body.length < 60) {
      $('#body').setError('Description too short.');
   }
   else
      return true;
}

/*$.fn.extend({
   setError: function(err) {
   //var $el = $('.error');
      if(this.is('input')|| this.is('textarea') || this.is('select')) {
         this.parent().addClass('field error');
         this.parent().append('<span class="error">'+err+'</span>');
      }
   }
});*/

$(document).ready(function() {
   console.log('Form ready..');
   $('form').find('.form-input').find('input').on('focus', function(e) {
       console.log($(e.currentTarget));
   });
});