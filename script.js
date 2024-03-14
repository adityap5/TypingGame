const typingText = document.querySelector('.typing-text p')
const input = document.querySelector('.box input')
const time = document.querySelector('.time span b')
const mistakes = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph() {
  const paragraph = [
    "It is necessary to fall in love... if only to provide an alibi for all the random despair you are going to feel anyway.",
    "Anyone who attempts to generate random numbers by deterministic means is, of course, living in a state of sin.",
    "Everything happening around me is very random. I am enjoying the phase, as the journey is far more enjoyable than the destination.",
    "I believe life is an intelligent thing: that things aren't random.",
    "Together we can change the world, just one random act of kindness at a time",
    "Carry out a random act of kindness, with no expectation of reward, safe in the knowledge that one day someone might do the same for you",];

  const randomIndex = Math.floor(Math.random() * paragraph.length);
  typingText.innerHTML = '';

  for (const char of paragraph[randomIndex]) {
    typingText.innerHTML += `<span>${char}</span>`;

  }
  typingText.querySelectorAll('span')[0].classList.add('active')
  document.addEventListener('keydown', () => input.focus());
  typingText.addEventListener('click', () => {
    input.focus()
  })
};

function initTyping() {

  const char = typingText.querySelectorAll('span');
  const typedChar = input.value.charAt(charIndex);

  if (charIndex < char.length && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(initTime, 1000)
      isTyping = true;
    }
    if (char[charIndex].innerText === typedChar) {
      char[charIndex].classList.add('correct');

    } else {
      mistake++;
      char[charIndex].classList.add('incorrect');

    }
    charIndex++;
    char[charIndex].classList.add('active');
    mistakes.innerText = mistake;
    cpm.innerText = charIndex - mistake;
  } else {
    clearInterval(timer);
    input.value = ''
  }
}

function initTime() {
  if (timeLeft > 0) {
    timeLeft--;
    time.innerText = timeLeft;
    const wpmm = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60)
    wpm.innerText = wpmm
  } else {
    clearInterval(timer);
  }
}
function reset() {
  loadParagraph();
  clearInterval(timer);
  timeLeft = maxTime;
  time.innerText = timeLeft;
  mistake = 0
  charIndex = 0;
  mistakes.innerText = 0;
  isTyping = false;
  wpm.innerText = 0;
  cpm.innerText = 0;
}


input.addEventListener("input", initTyping);
btn.addEventListener("click", reset)
loadParagraph(); 