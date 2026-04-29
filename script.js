const textLeft = document.querySelector('.text-left');
const textRight = document.querySelector('.text-right');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const hoverTargets = document.querySelectorAll('.hover-target');

let textCurrentX = 0, textCurrentY = 0;
let textTargetX = 0, textTargetY = 0;

let ringX = window.innerWidth / 2;
let ringY = window.innerHeight / 2;
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (cursorDot) {
        cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
    }

    // Parallax
    textTargetX = (window.innerWidth / 2 - mouseX) / 60;
    textTargetY = (window.innerHeight / 2 - mouseY) / 60;

    // Unhide cursor when it enters
    if (cursorDot) cursorDot.style.opacity = 1;
    if (cursorRing) cursorRing.style.opacity = 1;
});

hoverTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        if (cursorRing) cursorRing.classList.add('active');
    });
    target.addEventListener('mouseleave', () => {
        if (cursorRing) cursorRing.classList.remove('active');
    });
});

document.addEventListener('mouseleave', () => {
    if (cursorDot) cursorDot.style.opacity = 0;
    if (cursorRing) cursorRing.style.opacity = 0;
});
document.addEventListener('mouseenter', () => {
    if (cursorDot) cursorDot.style.opacity = 1;
    if (cursorRing) cursorRing.style.opacity = 1;
});

function animate() {
    textCurrentX += (textTargetX - textCurrentX) * 0.08;
    textCurrentY += (textTargetY - textCurrentY) * 0.08;

    if (textLeft && textRight) {
        const rotateY = textCurrentX * 0.4;
        const rotateX = -textCurrentY * 0.4;
        textLeft.style.transform = `translate(${textCurrentX}px, ${textCurrentY}px) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`;
        textRight.style.transform = `translate(${-textCurrentX}px, ${-textCurrentY}px) rotateY(${-rotateY}deg) rotateX(${-rotateX}deg)`;
    }

    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;

    if (cursorRing) {
        cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
    }

    requestAnimationFrame(animate);
}

animate();
