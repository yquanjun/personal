const yesButton = document.getElementById("yes");
const noButton = document.getElementById("no");
const answer = document.getElementById("answer");
const answerGif = document.getElementById("answer-gif");
const question = document.getElementById("question");

const gif = document.getElementById("gif");
const bubble = document.getElementById("bubble");

// What happens on the Nth time the "No" button gets dodged
const noReactions = {
    1: { text: "HOW CAN YOU CONSIDER IT" },
    3: { text: "I wont let you", gif: "https://media1.tenor.com/m/syEpB0UgdycAAAAC/bubu-dudu-bubu-dudu-love.gif" },
    5: { text: "stop bullying me", gif: "https://media1.tenor.com/m/nA5iSpAftHAAAAAC/bubu-dudu.gif" },
    7: { text: "But whyyyyyy im so squishable", gif: "https://media1.tenor.com/m/Zrr4L_Wd4JkAAAAC/bubu-rub-bubu-love-dudu.gif" },
    9: { text: "pleaseeeee", gif: "https://media1.tenor.com/m/FNn8Kd48OCkAAAAC/bubu-dudu-seeyall.gif" },
    11: { text: "IDW TALK TO YOU ALR, bleh", gif: "https://media1.tenor.com/m/Mu0BcZTpSNEAAAAC/bubu-dudu.gif" },
};

let noCount = 0;
let bubbleTimer;

function showBubble(text) {
    bubble.textContent = text;
    bubble.classList.add("show");
    clearTimeout(bubbleTimer);
    bubbleTimer = setTimeout(() => bubble.classList.remove("show"), 2500);
}

// Preload the gifs so they show instantly when swapped in
Object.values(noReactions).forEach((reaction) => {
    if (reaction.gif) {
        new Image().src = reaction.gif;
    }
});

function reactToNo() {
    noCount++;
    const reaction = noReactions[noCount];
    if (!reaction) {
        return;
    }

    showBubble(reaction.text);
    if (reaction.gif) {
        gif.src = reaction.gif;
    }
}

// The "No" button runs away whenever someone tries to click it
function dodge() {
    reactToNo();

    const maxX = window.innerWidth - noButton.offsetWidth - 16;
    const maxY = window.innerHeight - noButton.offsetHeight - 16;

    noButton.style.position = "fixed";
    noButton.style.left = `${Math.max(16, Math.random() * maxX)}px`;
    noButton.style.top = `${Math.max(16, Math.random() * maxY)}px`;
}

noButton.addEventListener("mouseenter", dodge);
noButton.addEventListener("touchstart", (event) => {
    event.preventDefault();
    dodge();
});
noButton.addEventListener("click", dodge);

const termsLink = document.getElementById("terms-link");
const terms = document.getElementById("terms");

termsLink.addEventListener("click", () => terms.showModal());

// Close the popup when clicking the dimmed area outside it
terms.addEventListener("click", (event) => {
    if (event.target === terms) {
        terms.close();
    }
});

// Clicking "Yes" asks "are you sure?" 5 times before it counts
const confirmDialog = document.getElementById("confirm");
const confirmQuestion = document.getElementById("confirm-question");
const confirmYes = document.getElementById("confirm-yes");
const confirmNo = document.getElementById("confirm-no");

const totalConfirms = 5;
let confirmStep = 0;

// 1: "are you sureee??", 2: "are you really really sure???", 3: one more "really" and "?" each time
function confirmText(step) {
    if (step === 1) {
        return "are you sureee??";
    }
    return `are you ${"really ".repeat(step)}sure${"?".repeat(step + 1)}`;
}

function showConfirm(step) {
    confirmStep = step;
    confirmQuestion.textContent = confirmText(step);
    if (!confirmDialog.open) {
        confirmDialog.showModal();
    }
}

yesButton.addEventListener("click", () => {
    // Already said yes, no need to ask again
    if (!answer.hidden) {
        return;
    }
    showConfirm(1);
});

confirmYes.addEventListener("click", () => {
    if (confirmStep < totalConfirms) {
        showConfirm(confirmStep + 1);
        return;
    }

    // Swap the question out for the answer
    confirmDialog.close();
    question.hidden = true;
    answer.hidden = false;
    answerGif.hidden = false;
});

confirmNo.addEventListener("click", () => confirmDialog.close());
