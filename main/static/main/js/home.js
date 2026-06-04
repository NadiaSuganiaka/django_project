window.addEventListener('load', function() {
    setTimeout(function() {
        const galleryIcon = document.getElementById('ViewGallery');
        const photoIcon = document.getElementById('TakeAPhoto');

        if (galleryIcon) galleryIcon.classList.add('fade-out');
        if (photoIcon) photoIcon.classList.add('fade-out');
    }, 5000); // 5000 мс = 5 секунд
});