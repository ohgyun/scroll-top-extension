(function() {
  // Dirty hack (iFrames refuse JavaScript access attempt so the code following the next line isn't executed)
  try {
    window.parent.location;
  } catch(e) {
    return;
  }
  
  var THRESHOLD = 300, // If scrolled less than THRESHOLD, the scroll button is not necessary.
    FADE_TIME = 500;
  
  /**
   * Create scroll button
   * @param {Object} config
   * @param {string} config.where 'top' or 'bottom'
   * @param {number} config.scrollTo What pixel scroll to?
   * @param {function} config.whenHide When does scroll button hide?
   */
  function createScrollBar(config) {
    var id = 'scroll-to-' + config.where + '-chrome-extension',
      $scrollBtn = $('<div id="' + id + '"></div>'),
      scroll_timer;
    
    /* initialize dom */
    $scrollBtn
        .prependTo('body')
        .click(function() {
          $(document.body).animate({
            scrollTop: config.scrollTo
          }, 'slow');
          $(this).fadeOut(FADE_TIME);
        })
        .hide();
  
    /* react to scroll event on window */
    $(window).scroll(function () {
      window.clearTimeout(scroll_timer);
      scroll_timer = window.setTimeout(function () { // use a timer for performance
        if (config.whenHide()) {
          $scrollBtn.fadeOut(500);
        } else { // show if scrolling down
          $scrollBtn.stop(true, true).fadeIn(FADE_TIME);
        }
      }, 100);
    });     
  }
  
  createScrollBar({
    where: 'top',
    scrollTo: 0,
    whenHide: function () {
      return $(window).scrollTop() <= THRESHOLD;
    }
  });
  createScrollBar({
    where: 'bottom',
    scrollTo: $(document).height() - $(window).height(),
    whenHide: function () {
      return $(window).scrollTop() >= ($(document).height() - $(window).height() - THRESHOLD); 
    }
  });

}());
