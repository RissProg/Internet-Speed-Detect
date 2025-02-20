let startTime, endTime;
let imageSize = 0;
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    info = document.getElementById("info");

let totalBitSpeed = 0;
let totalKbSpeed = 0;
let totalMbSpeed = 0;
let numTests = 3;
let testCompleted = 0;

function getNewImageUrl() {
    return `https://source.unsplash.com/random?topic=nature&t=${new Date().getTime()}`;
}

image.onload = async function () {
    endTime = new Date().getTime();

    try {
        let response = await fetch(getNewImageUrl());
        imageSize = response.headers.get("content-length");

        if (!imageSize) {
            info.innerHTML = "Error: Content-Length not available.";
            return;
        }

        calculateSpeed();
    } catch (error) {
        info.innerHTML = "Error fetching image.";
        console.error(error);
    }
};

function calculateSpeed() {
    let timeDuration = (endTime - startTime) / 1000;
    let loadedBits = imageSize * 8;
    let speedInBts = loadedBits / timeDuration;
    let speedInKbs = speedInBts / 1024;
    let speedInMbs = speedInKbs / 1024;

    totalBitSpeed += speedInBts;
    totalKbSpeed += speedInKbs;
    totalMbSpeed += speedInMbs;

    console.log("Speed in Mbps:", speedInMbs);
    console.log("Test Completed:", testCompleted);




    testCompleted++;

    if (testCompleted === numTests) {
        bitSpeed.innerHTML = `${(totalBitSpeed / numTests).toFixed(2)}`;
        kbSpeed.innerHTML = `${(totalKbSpeed / numTests).toFixed(2)}`;
        mbSpeed.innerHTML = `${(totalMbSpeed / numTests).toFixed(2)}`;
        info.innerHTML = "Test Completed!";
    } else {
        startTime = new Date().getTime();
        image.src = getNewImageUrl();
    }
}

const init = async () => {
    info.innerHTML = "Testing...";
    startTime = new Date().getTime();
    image.src = getNewImageUrl();
};

const runTests = async () => {
    for (let i = 0; i < numTests; i++) {
        await init();
    }
};

window.onload = () => {
    runTests();
};
