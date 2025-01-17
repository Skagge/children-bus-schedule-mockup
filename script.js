document.addEventListener('DOMContentLoaded', function() {
    const content = document.querySelector('#schedule .arrivals-list');

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function interpolateColor(color1, color2, factor) {
        const result = color1.slice();
        for (let i = 0; i < 3; i++) {
            result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
        }
        return result;
    }

    function rgbToHex(rgb) {
        return `#${rgb.map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    const green = [0, 255, 0];
    const red = [255, 0, 0];

    const stringParts = Array.from({ length: 20 }, () => getRandomInt(3, 120)).sort((a, b) => a - b);
    const rows = [];

    for (let i = 0; i < 20; i++) {
        const row = document.createElement('div');
        row.className = 'row';

        const factor = i / 19;
        const color = interpolateColor(green, red, factor);
        row.style.backgroundColor = rgbToHex(color);

        const intPart = document.createElement('span');
        intPart.textContent = getRandomInt(129, 520);

        const stringPart = document.createElement('span');
        stringPart.textContent = `za ${stringParts[i]} min`;

        row.appendChild(intPart);
        row.appendChild(stringPart);
        content.appendChild(row);

        rows.push({ element: stringPart, time: stringParts[i], rowElement: row });
    }

    setInterval(() => {
        rows.forEach((row, index) => {
            if (row.time > 0) {
                row.time -= 1;
                row.element.textContent = `za ${row.time} min`;

                const factor = row.time / 60;
                const color = interpolateColor(green, red, factor);
                row.rowElement.style.backgroundColor = rgbToHex(color);
            } else {
                row.rowElement.remove();
                rows.splice(index, 1)
            }
        });
    }, 1000);
});

function updateClock() {
    const clock = document.getElementById('clock');
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    clock.textContent = `${hours}:${minutes}:${seconds}`;
}

document.addEventListener('DOMContentLoaded', function() {
    updateClock();
    setInterval(updateClock, 1000);
});