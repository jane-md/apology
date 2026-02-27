const apologyText = document.getElementById("apologyText");
const catImage = document.getElementById("catImage");
const noBtn = document.getElementById("noBtn");
const okayBtn = document.getElementById("okayBtn");

const apologyScreen = document.getElementById("apology-screen");

/* ============================= */
/*        NO BUTTON LOGIC        */
/* ============================= */

let noCount = 0;

// Messages WITHOUT the last "I'll do better" line
const messages = [
    "Sure ka po? 🥺",
    "ihhhhh, pwease 🥺🥺🥺",
    "hindi na 'ko love love po? :(( ",
    "I'm sorry, my baby 🥺",
    "yeyyyyy, bleh 😛"
];

// Corresponding cat images
const images = [
    "cat1.jpg",
    "cat2.jpg",
    "cat3.jpg",
    "cat4.jpg",
    "cat5.jpg"
];

// scales
let okayScale = 1;
let noScale = 1;

function updateButtonScales() {
    okayBtn.style.transform = `scale(${okayScale})`;
    noBtn.style.transform = `scale(${noScale})`;
}

noBtn.addEventListener("click", () => {
    // Increment first
    noCount++;

    // Check if we are at the last message
    if (noCount === messages.length - 1) {
        // LAST message: only OKAY remains
        apologyText.textContent = messages[noCount];
        catImage.src = images[noCount];

        noBtn.remove(); // permanently remove NO button
        okayScale = 2;
        updateButtonScales();

    } else if (noCount < messages.length - 1) {
        // NORMAL messages
        apologyText.textContent = messages[noCount];
        catImage.src = images[noCount];

        // Grow OKAY
        okayScale += 0.1;
        if (okayScale > 2) okayScale = 2;

        // Shrink NO
        noScale -= 0.1;
        if (noScale < 0.5) noScale = 0.5;

        updateButtonScales();
    }
});
/* ============================= */
/*        HEART GAME             */
/* ============================= */

const heartScreen = document.getElementById("heart-screen");
const heartContainer = document.getElementById("heartContainer");
const heartCountText = document.getElementById("heartCount");

let heartCount = 0;

okayBtn.addEventListener("click", () => {
    apologyScreen.classList.add("hidden");
    heartScreen.classList.remove("hidden");
    spawnHearts();
});

function spawnHearts() {
    const interval = setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart");

        // create an image inside heart div
        const heartImg = document.createElement("img");
        heartImg.src = "heart.png"; // your small heart image
        heart.appendChild(heartImg);

        heart.style.left = Math.random() * 90 + "%";
        heartContainer.appendChild(heart);

        heart.addEventListener("click", () => {
            heart.remove();
            heartCount++;
            heartCountText.textContent = `Hearts: ${heartCount} / 5`;

            if (heartCount >= 5) {
                clearInterval(interval);
                setTimeout(() => {
                    heartScreen.classList.add("hidden");
                    showMeter();
                }, 800);
            }
        });

        setTimeout(() => heart.remove(), 3000);
    }, 800);
}

/* ============================= */
/*      FORGIVENESS METER        */
/* ============================= */

/* ============================= */
/*      FORGIVENESS METER        */
/* ============================= */

const meterScreen = document.getElementById("meter-screen");
const meterFill = document.getElementById("meterFill");
const forgiveBtn = document.getElementById("forgiveBtn");
const finalScreen = document.getElementById("final-screen");
const meterCat = document.getElementById("meterCat");

let meterValue = 0;

// Array of cat images for meter progression
const meterCats = [
    "cat_sad.jpg",
    "cat6.jpg",
    "cat7.jpg",
    "cat8.jpg",
    "cat9.jpg",
    "cat_happy.jpg"
];

function showMeter() {
    meterScreen.classList.remove("hidden");
}

forgiveBtn.addEventListener("click", () => {
    if (meterValue >= 100) return; // prevent extra clicks

    meterValue += 20;
    if (meterValue > 100) meterValue = 100;

    meterFill.style.width = meterValue + "%";

    // Calculate the index safely
    const index = Math.min(meterValue / 20, meterCats.length - 1);
    meterCat.src = meterCats[index];

    // When full, wait 2 seconds to show happy cat
    if (meterValue >= 100) {
    meterCat.src = "cat_happy.jpg"; // show happy cat immediately

    setTimeout(() => {
        meterScreen.classList.add("hidden");
        finalScreen.classList.remove("hidden");
    }, 1000); // wait 2 seconds before moving
}
});

// FINAL SCREEN CARDS
const submitAnswer = document.getElementById("submitAnswer");
const answerInput = document.getElementById("answerInput");
const resultText = document.getElementById("resultText");
const guessSection = document.getElementById("guess-section");
const cards = document.querySelectorAll(".card");
const flipButtons = document.querySelectorAll(".flipBtn");

submitAnswer.addEventListener("click", () => {
    const answer = answerInput.value.trim().toLowerCase();

    if (answer === "baby") {
        resultText.textContent = "Correct 🤍";

        // Remove guessing section
        guessSection.remove();

        // Show flip buttons
        flipButtons.forEach(btn => btn.classList.remove("hidden"));

    } else {
        resultText.textContent = "Try again 🥺";
    }
});

// Flip logic
cards.forEach((card, index) => {
    const btn = flipButtons[index];

    btn.addEventListener("click", () => {

        // If already active → close it
        if (card.classList.contains("active-card")) {
            card.classList.remove("active-card");
            card.classList.remove("flipped");
            document.body.classList.remove("card-open");
        } else {
            // Close any open card first
            document.querySelectorAll(".card").forEach(c => {
                c.classList.remove("active-card");
                c.classList.remove("flipped");
            });

            // Open this card
            card.classList.add("active-card");
            card.classList.add("flipped");
            document.body.classList.add("card-open");
        }

    });
});
