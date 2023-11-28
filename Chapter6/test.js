import * as url from './importtest.png';

let img = document.createElement('img');
img.style = {
    height: '25%',
    width: '25'
};
debugger;


img.src = url.default;
console.log('imported', url);

document.getElementById('img_container').appendChild(img);