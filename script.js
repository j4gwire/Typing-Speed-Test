const paragraphs = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed tests are a fun way to improve your skills.",
    "Practice makes perfect, especially in typing.",
    "The rain in Spain stays mainly in the plain.",
    "A journey of a thousand miles begins with a single step.",
];

let startTime, endTime;
const startBtn = document.getElementById('startBtn');
const test = document.getElementById('test');
const intro = document.getElementById('intro');
const paragraphDisplay = document.getElementById('paragraph');
const userInput = document.getElementById('userInput');
const results = document.getElementById('results');
const wpmDisplay = document.getElementById('wpm');
const accuracyDisplay = document.getElementById('accuracy');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progress-bar');

startBtn.addEventListener('click', startTest);
userInput.addEventListener('input', handleTyping);
nextBtn.addEventListener('click', startTest);

function startTest() {
    intro.classList.add('hidden');
    test.classList.remove('hidden');
    results.classList.add('hidden');
    userInput.value = '';
    userInput.disabled = false;

    const randomIndex = Math.floor(Math.random() * paragraphs.length);
    const paragraph = paragraphs[randomIndex];
    paragraphDisplay.textContent = paragraph;
    
    startTime = new Date().getTime();
    updateProgressBar(paragraph);
    userInput.focus();
}

function handleTyping() {
    const typedText = userInput.value;
    const paragraph = paragraphDisplay.textContent;

    const correctChars = typedText.split('').filter((char, index) => char === paragraph[index]).length;
    const accuracy = (correctChars / paragraph.length) * 100;
    accuracyDisplay.textContent = `Accuracy: ${accuracy.toFixed(2)}%`;

    if (typedText === paragraph) {
        endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000; // seconds
        const wpm = Math.round((typedText.length / 5) / (timeTaken / 60)); // words per minute
        wpmDisplay.textContent = `Words per minute: ${wpm}`;
        userInput.disabled = true;
        results.classList.remove('hidden');
        nextBtn.classList.remove('hidden');
    }
}

function updateProgressBar(paragraph) {
    const interval = setInterval(() => {
        const typedText = userInput.value;
        const percentage = (typedText.length / paragraph.length) * 100;
        progressBar.style.width = percentage + '%';

        if (percentage >= 100) {
            clearInterval(interval);
        }
    }, 100);
}
