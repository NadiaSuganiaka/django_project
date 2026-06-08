const ws = new WebSocket('ws://' + window.location.host + '/ws/feed/');

ws.onopen = function(e) {
    console.log("Успішно підключено до WebSocket за адресою:", ws.url);
};

ws.onerror = function(error) {
    console.error("Помилка WebSocket:", error);
    console.log("Спроба підключення була до:", ws.url); // Побачимо точну адресу
};

ws.onclose = function(e) {
    console.log("WebSocket з'єднання закрив код:", e.code, "причина:", e.reason);
};

ws.onmessage = function(e) {
    const data = JSON.parse(e.data);
    if (data.type === 'new_photo') {
        showBubble();
    }
};

ws.onmessage = function(e) {
    const data = JSON.parse(e.data);
    if (data.type === 'new_photo') {
        showBubble(); // ← анімація
    }
};

function showBubble() {
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = '📷';
    document.body.appendChild(bubble);
    setTimeout(() => bubble.remove(), 2000);
}

window.addEventListener('load', function() {
    setTimeout(function() {
        const galleryIcon = document.getElementById('ViewGallery');
        const photoIcon = document.getElementById('TakeAPhoto');

        if (galleryIcon) galleryIcon.classList.add('fade-out');
        if (photoIcon) photoIcon.classList.add('fade-out');
    }, 5000); // 5000 мс = 5 секунд
});