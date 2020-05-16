const {ipcRenderer} = require('electron');

const endPoint = 15;
var startPoint = 0;

//Loader
function theLoader() {
    setTimeout(function() {
        if (startPoint >= 10) {
            ipcRenderer.send('request-mainpage');
            window.close();
        } else {
            if (document.querySelector("#points").textContent.length >= "4") {
                document.querySelector("#points").textContent = '.';
            } else {
                document.querySelector("#points").textContent += '.';
            }
            startPoint++;
            theLoader();
        }
    }, 300);
}
theLoader();