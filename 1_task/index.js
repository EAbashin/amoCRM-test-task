const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl

const createTimerAnimator = () => {
    return (totalSeconds) => {
        buttonEl.disabled = true;
        const getTimeRemaining = () => {
            const
                totalMs = totalSeconds * 1000,
                hours = Math.floor((totalMs / (1000 * 60 * 60)) % 24),
                minutes = Math.floor((totalMs / (1000 * 60)) % 60),
                seconds = Math.floor((totalMs / 1000) % 60);
            return {
                'total': totalMs,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        };

        const setZero = (num) => {
            if (num >= 0 && num < 10) {
                return `0${num}`;
            } else {
                return num;
            }
        };

        const updateClock = () => {
            const t = getTimeRemaining();
            timerEl.innerHTML = `${setZero(t.hours)}:${setZero(t.minutes)}:${setZero(t.seconds)}`;
            totalSeconds = totalSeconds - 1;
            if (t.total <= 0) {
                clearInterval(timerInterval);
                buttonEl.disabled = false;
            }
        };

        const timerInterval = setInterval(updateClock, 1000);
        updateClock();
    };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener('input', (e) => {
    // Очистите input так, чтобы в значении
    // оставались только числа

    if (isNaN(e.data) || e.data === ' ') {
        inputEl.value = inputEl.value.slice(0, -1); // Удаляем последний символ в input, если вводим не число
    }
});

buttonEl.addEventListener('click', () => {
    const seconds = Number(inputEl.value);

    animateTimer(seconds);

    inputEl.value = '';
});
