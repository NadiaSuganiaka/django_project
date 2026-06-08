async function createPost() {
    const res = await fetch('/posts/create/', {
        method: 'POST',
        headers: { 'X-CSRFToken': getCookie('csrftoken') },
    });
    const data = await res.json();
    if (data.status === 'ok') {
        window.location.href = data.redirect;
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}