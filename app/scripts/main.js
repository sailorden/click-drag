'use strict';

var $idFileName;
var arrayImage = [
    'dsc_6001',
    'dsc_6013',
    'dsc_6081',
    'dsc_6268',
    'dsc_6345',
    'dsc_6378',
    'dsc_6397',
    'dsc_6413',
    'dsc_6417'
];
var mapImage = {};
var hammer_options = {};
var hammerVars = {
    drag: {},
    dragStart: {},
    dragEnd: {}
};

var currentX;
var currentY;

var $base;
var $collided;
var baseSrc;
var collidedSrc;


arrayImage.forEach(function(fileName) {
    $('.hero-unit').append('<img src="images/'+ fileName + '.jpg"/ id="' + fileName + '">');

    $idFileName = $('#'+fileName);

    mapImage[fileName] = {
        left: $idFileName.offset().left, // x coord
        top: $idFileName.offset().top, // y coord
        height: $idFileName.height(),
        width: $idFileName.width(),
        right: $idFileName.offset().left + $idFileName.width(),
        bottom: $idFileName.offset().top + $idFileName.height()
    };
});

$('img')
    .hammer(hammer_options)
    .on('dragstart', function(ev) {
        var $base = $('#' + ev.currentTarget.id);
        var clooney = $base.clone().prop({id: 'cloned'});
        clooney.css({
            'position': 'absolute',
            'top': ev.currentTarget.offsetTop + 'px',
            'left': ev.currentTarget.offsetLeft + 'px',
            'height': ev.currentTarget.height,
            'width': ev.currentTarget.width
        });
        $('html').append(clooney); // Dragend: we remove our clone

        // now hide the underlaying element. Dragend: we unhide it
        $base.css('visibility', 'hidden');

    })
    .on('drag', function(ev) {

        var $cloned = $('#cloned');

        var stagTop = ev.currentTarget.offsetTop;
        var stagLeft = ev.currentTarget.offsetLeft;

        var newTop = stagTop + ev.gesture.deltaY;
        var newLeft = stagLeft + ev.gesture.deltaX;

        console.log(newTop);
        console.log(newLeft);

        $cloned.css('top', newTop + 'px');
        $cloned.css('left', newLeft + 'px');

    })
    .on('dragend', function(ev) { 
        var $base = $('#'+ ev.currentTarget.id);
        console.log(ev);
        currentX = ev.gesture.center.pageX;
        currentY = ev.gesture.center.pageY;
        var result = collision(currentX, currentY, ev.currentTarget.id);
        console.log('Net result ' +result);

        if (result !== undefined) {
            // define our jQuery vars
            
            $collided = $('#'+result);

            // save respective image sources
            baseSrc = $base.attr('src');//makes a copy as prim
            collidedSrc = $collided.attr('src');

            // swap the image sources
            $base.attr('src', collidedSrc);
            $collided.attr('src', baseSrc);
        }

        $('#cloned').remove(); // TODO: animate back to original space
        $base.css('visibility', 'visible');
    });

//check for every key except the base comparitor.
function collision(currentX, currentY, baseImage) {
    //do this for every image we have.
    for (var key in mapImage) {
        if (key === baseImage) {
            continue;
        }
        if (currentY > mapImage[key].top &&
            currentY < mapImage[key].bottom &&
            currentX > mapImage[key].left &&
            currentX < mapImage[key].right) {

            return key;
        }
    }
    return undefined;
}
