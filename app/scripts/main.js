'use strict';

console.log('\'Allo \'Allo!');

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


arrayImage.forEach(function(fileName) {
    $('.hero-unit').append('<img src="images/'+ fileName + '.jpg"/>');
});
