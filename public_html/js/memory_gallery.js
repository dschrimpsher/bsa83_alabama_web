function launch() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

// define options (if needed)
    var options = {
        // optionName: 'option value'
        // for example:
        index: 0 // start at first slide
    };

// Initializes and opens PhotoSwipe
    var gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    gallery.init();
}


function get_campouts(campouts) {
    var root = document.getElementById('event-root');
    for (var i = 0; i < campouts.length; i++) {
        var row = document.createElement('div');
        row.setAttribute('class', 'row');
        var col1 = document.createElement('div');
        col1.setAttribute('class', 'col-md-6');
        var col2 = document.createElement('div');
        col2.setAttribute('class', 'col-md-6');
        var h4 = document.createElement('h4');
        var h4_date = document.createElement('h4');
        h4.innerHTML = campouts[i].name;
        h4_date.innerHTML = campouts[i].date;
        root.appendChild(row);
        row.appendChild(col1);
        row.appendChild(col2);
        col1.appendChild(h4);
        col2.appendChild(h4_date);
    }
}
