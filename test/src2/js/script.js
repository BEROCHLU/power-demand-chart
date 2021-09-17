'use strict';

document.querySelector('#upimgform input[name="upimg"]').disabled = true;

img_path.addEventListener('change', (event) => {
    const FILES_LENGTH = event.target.files.length;
    //console.log(event);
    //console.log(FILES_LENGTH);
    if (0 < FILES_LENGTH) {
        document.querySelector('#upimgform input[name="upimg"]').disabled = false;
    } else {
        document.querySelector('#upimgform input[name="upimg"]').disabled = true;
    }
});

//test
document.querySelector('#fetch_form').addEventListener('click', async () => {
    //let formdata = new FormData(upimgform);
    //console.log(formdata);

    //let image = new Image();
    //image.src = "https://mdn.mozillademos.org/files/5395/backdrop.png";

    let canvas = document.createElement("canvas");
    let context = canvas.getContext('2d');
    context.fillStyle = "#d36015";
    context.fillRect(0, 0, 200, 200);
    //context.drawImage(image, 0, 0);

    let imageBlob = await new Promise(resolve => canvas.toBlob(resolve, 'image/png'));
    let formdata = new FormData();
    formdata.append("img_path", imageBlob, "./aho.png");

    let response = await fetch('/room', {
        method: 'POST',
        body: formdata
    });

    let result = await response.json();
    console.log(result);
});