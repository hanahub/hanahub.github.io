
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
    // autoScroll: {
    //   speed: 2,
    // },
    breakpoints: {
      749: {
        padding: 0,
        gap: 12,
      },
    }
  } ).mount();
  // } ).mount(window.splide.Extensions);
} );

// // Wrap project images with placeholder wrapper and fade in when loaded
(function(){
  function wrapImages(){
    var projectImgs = document.querySelectorAll('#projects .projects-grid img');
    projectImgs.forEach(function(img){
      if(img.dataset.placeholderWrapped) return;
      var wrapper = document.createElement('div');
      wrapper.className = 'project-img-wrapper';
      // create spinner element
      var spinner = document.createElement('div');
      spinner.className = 'spinner';
      wrapper.appendChild(spinner);
      img.parentNode.insertBefore(wrapper, img);
      wrapper.appendChild(img);
      img.dataset.placeholderWrapped = '1';

      var markLoaded = function(){
        img.classList.add('loaded');
        wrapper.classList.add('loaded');
      };

      if(img.complete && img.naturalWidth !== 0){
        markLoaded();
      } else {
        img.addEventListener('load', markLoaded);
        img.addEventListener('error', function(){
          // If we've already swapped to the placeholder (or tried), avoid an infinite loop
          if (img.dataset.errorReplaced === '1' || (img.src && img.src.indexOf('img-placeholder.svg') !== -1)){
            wrapper.classList.add('loaded');
            img.classList.add('loaded');
            wrapper.style.background = '#f8fafc';
            return;
          }
          // mark that we've replaced the source to avoid looping
          img.dataset.errorReplaced = '1';
          // swap to a local placeholder image
          try {
            img.src = 'images/img-placeholder.svg';
            // leave the existing load listener in place (it will fire for the placeholder)
          } catch (e) {
            // on any error, hide spinner and show fallback bg
            wrapper.classList.add('loaded');
            img.classList.add('loaded');
            wrapper.style.background = '#f8fafc';
          }
        });
      }
    });
  }

  if(document.readyState === 'complete' || document.readyState === 'interactive'){
    wrapImages();
  } else {
    document.addEventListener('DOMContentLoaded', wrapImages);
  }
})();