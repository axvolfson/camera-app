// Set constraints for the video stream
var constraints = { video: { facingMode: "user" }, audio: false };
var track = null;

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
    camertaRetake = document.getElementById("camera--retake")

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
            triggerCountDown();
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

// Take a picture when cameraTrigger is tapped
function takePhoto() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    // track.stop();
};
camertaRetake.onclick = triggerCountDown;


function triggerCountDown(){
    let startSecond = 5;
    camertaRetake.style.display ="none";
    
    cameraTrigger.classList = "count-effect"
    const countDown = setInterval(()=>{
        cameraTrigger.innerHTML = startSecond <= 0 ? "Smile!" : startSecond;
        cameraTrigger.style.display="block";
        startSecond--;
        if(startSecond === -2) {
            clearInterval(countDown);
            takePhoto();
            camertaRetake.style.display ="block";
            cameraTrigger.style.display="none";
            cameraTrigger.classList = ""
        }
    },1000)
}

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);

