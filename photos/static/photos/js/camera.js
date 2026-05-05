const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const snap = document.getElementById('snap');
const stillFrame = document.getElementById('still-frame');
const countdownEl = document.getElementById('countdown');
const context = canvas.getContext('2d');

const shutterSound = new Audio('img/audio_camera.mp3');

async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { width: 640, height: 480 }, 
            audio: false 
        });
        video.srcObject = stream;
    } catch (err) {
        console.error("Помилка:", err);
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

async function takePhoto() {
    shutterSound.currentTime = 0;
    shutterSound.play();

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = canvas.toDataURL('image/png');
    
    stillFrame.src = imageData;
    stillFrame.style.display = 'block';

    canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('image', blob, 'photo.png');

        const res = await fetch('/photos/save/', {
            method: 'POST',
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
            },
            body: formData,
        });

        const data = await res.json();

        if (data.count >= 3) {
            window.location.href = '/posts/preview/';
        }
    }, 'image/png');

    setTimeout(() => {
        stillFrame.style.display = 'none';
        stillFrame.src = '';
    }, 3000);
}

snap.addEventListener('click', () => {
    let timeLeft = 3;
    countdownEl.innerText = timeLeft;
    snap.disabled = true;

    const timer = setInterval(() => {
        timeLeft--;
        
        if (timeLeft > 0) {
            countdownEl.innerText = timeLeft;
        } else {
            clearInterval(timer);
            countdownEl.innerText = '';
            takePhoto();
            snap.disabled = false;
        }
    }, 1000);
});

startCamera();