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
    .on('dragend', function(ev) { 
        console.log(ev);
        currentX = ev.gesture.center.pageX;
        currentY = ev.gesture.center.pageY;
        var result = collision(currentX, currentY, ev.currentTarget.id);
        console.log('Net result ' +result);

        if (result !== undefined) {
            // define our jQuery vars
            $base = $('#'+ ev.currentTarget.id);
            $collided = $('#'+result);

            // save respective image sources
            baseSrc = $base.attr('src');//makes a copy as prim
            collidedSrc = $collided.attr('src');

            // switch the image sources
            $base.attr('src', collidedSrc);
            $collided.attr('src', baseSrc);
        }
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
