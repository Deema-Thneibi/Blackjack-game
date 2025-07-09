import { cards } from "../cards.js";

const oneToTenCards = document.querySelector(".oneToTenCards .cards");
const faceCards = document.querySelector(".faceCards .cards");
const aceCard = document.querySelector(".aceCard .cards");

const faceCardNames = ["J-C", "K-D", "Q-H"];

let cardsOneToTenImg = "";
let cardsFaceImg = "";
let cardAceImg = "";

// createCard Function
const createCard = (card) => {
  return `
    <div class="card">
      <img src="${card.img}" alt="${card.name}" />
    </div>
  `;
}


for (const card of cards) {
  if (card.value > 1 && card.value <= 10 && card.name.endsWith("-D") && !["J", "Q", "K"].includes(card.name.charAt(0))) {
    cardsOneToTenImg += createCard(card);
  }
  else if (card.value === 10 && faceCardNames.includes(card.name)) {
    cardsFaceImg += createCard(card);
  }
  else if (card.value === 1 && card.name === "A-S") {
    cardAceImg += createCard(card);
  }
}

oneToTenCards.innerHTML = cardsOneToTenImg;
faceCards.innerHTML = cardsFaceImg;
aceCard.innerHTML = cardAceImg;

