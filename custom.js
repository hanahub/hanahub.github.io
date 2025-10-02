
// Set current year in footer
(function(){
  var y = new Date().getFullYear();
  var el = document.getElementById('year');
  if(el) el.textContent = y;
})();

// Contact form submission using formsubmit.co (AJAX)
(function(){
  var form = document.getElementById('contact-form');
  if(!form) return;

  var statusEl = document.getElementById('form-status');

  function showStatus(msg, ok){
    statusEl.textContent = msg;
    statusEl.style.color = ok ? '#059669' : '#b91c1c';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();

    // basic client-side validation
    var name = form.name.value.trim();
    var email = form.email.value.trim();
    var message = form.message.value.trim();
    if(!name || !email || !message){
      showStatus('Please fill out all fields.', false);
      return;
    }

    showStatus('Sending...', true);
    var payload = new FormData();
    payload.append('name', name);
    payload.append('email', email);
    payload.append('message', message);
    // optional: add _subject to control email subject
    payload.append('_subject', 'Portfolio contact form message');
    // redirect disabled because we handle result here
    payload.append('_next', window.location.href);

    fetch('https://formsubmit.co/ajax/fb8774046792e623efdaf98bed7368a9', {
      method: 'POST',
      body: payload
    }).then(function(res){
      return res.json();
    }).then(function(data){
      if(data && data.success === 'OK'){
        showStatus('Message sent — thank you!', true);
        form.reset();
      } else {
        showStatus('Thanks — message submitted.', true);
        form.reset();
      }
    }).catch(function(err){
      console.error(err);
      showStatus('Could not send message. Please try again or email auleedev@gmail.com', false);
    });
  });
})();


document.addEventListener( 'DOMContentLoaded', function() {
  new Splide( '.splide', {
    type: 'loop',
    perPage: 1,
    lazyLoad: 'nearby',
    padding: '14%',
    gap: 24,
    autoScroll: {
      speed: 2,
    },
  } ).mount(window.splide.Extensions);
} );