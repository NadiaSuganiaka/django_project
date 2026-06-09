function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomIntExclude(min, max, excludeMin = -4, excludeMax = 4) {
    let value;
    do {
        value = randomInt(min, max);
    } while (value >= excludeMin && value <= excludeMax);
    return value;
}

const clipSVG = `<svg class="clip" width="37" height="71" viewBox="0 0 37 71" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M35.5001 0L6.13647 0L11.288 65.942L23.6516 57.8261L32.4092 18.7681L35.5001 0Z" fill="#EC954F"/>
    <path d="M33.4393 4.05797L4.07568 4.05797L9.2272 70H27.2575L33.4393 4.05797Z" fill="#FBB168" stroke="#FBB168"/>
    <path d="M5.62121 33.4783H1.5L1.5 46.6667H34.9848V33.4783H31.3788" stroke="#9A9A9A" stroke-width="3"/>
</svg>`;

const gallery = document.querySelector(".gallery");
const wrapper = document.querySelector(".gallery-wrapper");
const clipsLayer = document.getElementById("clips-layer");
const rope = document.getElementById("rope");

// Спочатку розставляємо трансформації фото
const photoRotations = new Map();
document.querySelectorAll(".photos").forEach(photo => {
    const translateY = randomIntExclude(-20, 16);
    const rotate = randomIntExclude(-20, 20);
    photo.style.transform = `translateY(${translateY}px) rotate(${rotate}deg)`;
    photoRotations.set(photo, rotate);
});

function updateClips() {
    clipsLayer.innerHTML = "";

    const wrapperRect = wrapper.getBoundingClientRect();
    const ropeRect = rope.getBoundingClientRect();

    document.querySelectorAll(".photos").forEach(photo => {
        const photoRect = photo.getBoundingClientRect();

        const left = photoRect.left - wrapperRect.left + photoRect.width / 2 - 18;

        const clipHeight = 71;
        const idealTop = photoRect.top - wrapperRect.top - clipHeight * 0.75;
        const ropeTop = ropeRect.top - wrapperRect.top;
        const top = Math.max(idealTop, ropeTop - clipHeight * 0.5);

        const clip = document.createElement("div");
        clip.innerHTML = clipSVG;
        clip.style.position = "absolute";
        clip.style.left = `${left}px`;
        clip.style.top = `${top}px`;

        const rotate = photoRotations.get(photo) ?? 0;
        const rotateClip = rotate > 0 ? randomInt(-8, -2) : randomInt(2, 8);
        clip.style.transform = `rotate(${rotateClip}deg)`;

        clipsLayer.appendChild(clip);
    });
}

updateClips();

gallery.addEventListener("scroll", updateClips);