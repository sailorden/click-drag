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
var currentX;
var currentY;


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

var hammer_options = {};
$('img')
    .hammer(hammer_options)
    .on('drag', function(ev) { 
        console.log(ev);
        currentX = ev.gesture.center.pageX;
        currentY = ev.gesture.center.pageY;
        console.log('current X: '+currentX);
        console.log('Net result ' +collision(currentX, currentY, ev.currentTarget.id));

    });

//check for every key except yourself.
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

            return true;
        }
    }
    return false;

/*    console.log(currentY > mapImage['dsc_6013'].top);
    console.log(currentY < mapImage['dsc_6013'].bottom);
    console.log(currentX > mapImage['dsc_6013'].left);
    console.log(currentX < mapImage['dsc_6013'].right);
    console.log()

    return (currentY > mapImage['dsc_6013'].top &&
            currentY < mapImage['dsc_6013'].bottom &&
            currentX > mapImage['dsc_6013'].left &&
            currentX < mapImage['dsc_6013'].right
    );
*/}
