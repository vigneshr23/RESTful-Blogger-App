// validation error
$.fn.extend({
   setError: function(err) {
   //var $el = $('.error');
      if(this.is('input')|| this.is('textarea') || this.is('select')) {
        this.parent().addClass('field error');
        if(this.next().filter('span').hasClass('error'))
            this.next().text(err);
        else
            this.parent().append('<span class="error">'+err+'</span>');
      }
      return this;
   }
   /*,
   unsetError: function(err) {
   //var $el = $('.error');
      $.each('.ui.form', function() {
          
      });
      return this;
   }*/
});