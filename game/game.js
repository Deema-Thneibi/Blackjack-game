import { cards } from '../cards.js'
// Variables
let card4 = {};
let cardBack = "";
let availableCards;
let playerSum = 0;
let dealerSum = 0;
let playerCardCount = 0;
let dealerCardCount = 0
const player_cards_class = document.querySelector(".player .cards");
const dealer_cards_class = document.querySelector(".dealer .cards");
const player_sum_cards = document.querySelector(".player span");
const dealer_sum_cards = document.querySelector(".dealer span");
const standButton = document.querySelector(".standButton");
const hitButton = document.querySelector(".hitButton");
const messageParagClass = document.querySelector(".message p");
const messageClass = document.querySelector(".message");

const getRandomCard = () => {
    const randomIndex = Math.floor(Math.random() * availableCards.length);
    const card = availableCards[randomIndex];
    availableCards.splice(randomIndex, 1);
    return card;
};



const deal = () => {
    standButton.style.cursor = "pointer";
    hitButton.style.cursor = "pointer";
    standButton.style.pointerEvents = "auto";
    hitButton.style.pointerEvents = "auto";
    standButton.style.opacity = "1";
    hitButton.style.opacity = "1";

    player_sum_cards.textContent = 0;
    dealer_sum_cards.textContent = 0;

    availableCards = [...cards];
    playerSum = 0;
    dealerSum = 0;
    playerCardCount = 0;
    dealerCardCount = 0;
    player_cards_class.innerHTML = "";
    dealer_cards_class.innerHTML = "";

    const card1 = getRandomCard();
    const card2 = getRandomCard();
    const card3 = getRandomCard();
    card4 = getRandomCard();

    const playerCards = [card1, card2];
    const dealerCards = card3;


    // 1. عرض البطاقات أولاً
    player_cards_class.innerHTML = playerCards.map(card => `
        <div class="card"><img src="${card.img}" alt="card${card.value}" /></div>
    `).join("");

    dealer_cards_class.innerHTML = `
        <div class="card"><img src="${dealerCards.img}" alt="card${dealerCards.value}" /></div>
        <div class="card" id="cardBack"><img src="../cards/BACK.png" alt="cardBack" /></div>
    `;

    // 2. نؤخر الحساب لحين اختيار قيمة A
    setTimeout(() => {
        playerCards.forEach(card => {
            if (card.value === 1) {
                const chosen = chooseValueOfCard1();
                playerSum += chosen;
            } else {
                playerSum += card.value;
            }
        });

        if (dealerCards.value === 1) {
            dealerSum = 11;
        } else {
            dealerSum = dealerCards.value
        }

        // 3. عرض المجموع
        player_sum_cards.textContent = playerSum;
        dealer_sum_cards.textContent = dealerSum;
    }, 100);
    cardBack = document.querySelector("#cardBack");
    dealerCardCount++;
    playerCardCount += 2;



};


deal();

const chooseValueOfCard1 = () => {
    return parseInt(prompt(`You got an Ace! 🂱\n\nYour current total is ${playerSum}.\nChoose a value for the Ace to best fit your hand:\n1 or 11`, "11")) === 1 ? 1 : 11;
};


const stand = () => {
    dealerCardCount++;
    standButton.style.cursor = "not-allowed";
    hitButton.style.cursor = "not-allowed";
    standButton.style.pointerEvents = "none";
    hitButton.style.pointerEvents = "none";
    standButton.style.opacity = "0.6";
    hitButton.style.opacity = "0.6";

    cardBack.innerHTML = `<img src="${card4.img}" alt = "card${card4.value}"/>`
    dealerSum += (card4.value === 1 && dealerSum + 11 <= 21) ? 11 : card4.value;
    dealer_sum_cards.textContent = dealerSum; // 10

    setTimeout(() => {
        while (dealerSum < 17) {
            const card = getRandomCard();
            dealer_cards_class.innerHTML += `
        <div class="card"><img src="${card.img}" alt="card${card.value}" /></div>
    `;

            dealerSum += (card.value === 1 && dealerSum + 11 <= 21) ? 11 : card.value;
            dealerCardCount++;
        }
        dealer_sum_cards.textContent = dealerSum;

        // Player has Blackjack (21 with 2 cards)
        if (playerSum === 21 && playerCardCount === 2) {
            setTimeout(() => {
                successMessage("🎉 Blackjack! You win! 🏆");
            }, 2000);
        }

        // Dealer has Blackjack (21 with 2 cards)
        else if (dealerSum === 21 && dealerCardCount === 2) {
            setTimeout(() => {
                errorMessage("❌ Dealer got Blackjack. You lose. 😔");
            }, 2000);
        }

        // Player busted (over 21)
        else if (playerSum > 21) {
            setTimeout(() => {
                errorMessage("❌ You busted! Dealer wins 😔");
            }, 2000);
        }

        // Dealer busted (over 21)
        else if (dealerSum > 21) {
            setTimeout(() => {
                successMessage("🎉 Dealer busted! You win! 🏆");
            }, 2000);
        }

        // Tie (push)
        else if (dealerSum === playerSum && dealerSum <= 21) {
            setTimeout(() => {
                tieMessage("⚖️ It's a tie! (Push)");
            }, 2000);
        }

        // Player wins with higher hand
        else if (playerSum > dealerSum && playerSum <= 21) {
            setTimeout(() => {
                successMessage("🎉 You win with a higher hand! 🏆");
            }, 2000);
        }

        // Dealer wins with higher hand
        else if (dealerSum > playerSum && dealerSum <= 21) {
            setTimeout(() => {
                errorMessage("❌ Dealer wins with a higher hand. 😔");
            }, 2000);
        }
    }, 500)

}


const successMessage = (message) => {
    messageClass.style.display = "flex";
    messageParagClass.textContent = message;
    messageParagClass.style.backgroundColor = " #075f1a";
    setTimeout(() => {
        messageClass.style.display = "none";
        deal();
    }, 3000);
}

const errorMessage = (message) => {
    messageClass.style.display = "flex";
    messageParagClass.textContent = message;
    messageParagClass.style.backgroundColor = "#5f0707";
    setTimeout(() => {
        messageClass.style.display = "none";
        deal();
    }, 3000);

}

const tieMessage = (message) => {
    messageClass.style.display = "flex";
    messageParagClass.textContent = message;
    messageParagClass.style.backgroundColor = "#5f4b07";
    setTimeout(() => {
        messageClass.style.display = "none";
        deal();

    }, 3000);
}

const hit = () => {
    // Player busted (over 21)
    if (playerSum > 21) {
        hitButton.style.cursor = "not-allowed";
        hitButton.style.pointerEvents = "none";
        hitButton.style.opacity = "0.6";
        return;
    }
    const card = getRandomCard();
    player_cards_class.innerHTML += `
        <div class="card"><img src="${card.img}" alt="card${card.value}" /></div>
    `;


    // 2. نؤخر الحساب لحين اختيار قيمة A
    setTimeout(() => {
        if (card.value === 1) {
            const chosen = chooseValueOfCard1();
            playerSum += chosen;
        } else {
            playerSum += card.value;
        }

        // 3. عرض المجموع
        player_sum_cards.textContent = playerSum;
        if (playerSum > 21) {
            hitButton.style.cursor = "not-allowed";
            hitButton.style.pointerEvents = "none";
            hitButton.style.opacity = "0.6";
        }
    }, 100); // ننتظر  عشان تكون البطاقات ظهرت قبل prompt

    playerCardCount++;
}

document.querySelector(".dealButton").addEventListener("click", deal);
standButton.addEventListener("click", stand);
hitButton.addEventListener("click", hit);


