const philosophers = [
  {
    id: "aristotle",
    name: "アリストテレス",
    title: "徳と中庸の哲学",
    description: "目的を見据えて、行動のバランスを問い直します。",
    tone: "落ち着いて実践的",
    prompt: (input) =>
      `あなたの悩みを「目的」と「習慣」に分けて整理しましょう。${input}という状況では、何があなたの究極目的（エウダイモニア）につながるでしょうか？`,
    advice: [
      "短期的な快楽よりも、長期的な徳の形成に目を向ける",
      "極端な選択肢の中庸を探す",
      "小さな習慣を重ねて自分の品格を磨く",
    ],
  },
  {
    id: "socrates",
    name: "ソクラテス",
    title: "対話で真理を探る哲学",
    description: "問いを重ね、前提をほぐして答えを導きます。",
    tone: "問いかけ中心",
    prompt: (input) =>
      `${input}という悩みは、あなたが何を「良い」と信じているかに関わっています。その信念は誰から学び、どの経験で確かめましたか？`,
    advice: [
      "今の考えが本当に自分のものか見直す",
      "納得できる理由を言葉にしてみる",
      "対話できる相手に自分の前提をぶつける",
    ],
  },
  {
    id: "nietzsche",
    name: "ニーチェ",
    title: "価値の創造と自己超克",
    description: "既存の価値観から自由になる道を探します。",
    tone: "挑発的で鼓舞する",
    prompt: (input) =>
      `「${input}」という悩みは、あなたが他者の価値観に縛られている兆候かもしれません。もし全てを一度捨てるなら、あなたは何を選び直しますか？`,
    advice: [
      "周囲の評価ではなく、自分が熱くなれるものを基準にする",
      "不安があるからこそ成長の余地があると捉える",
      "自分だけの価値観を言語化してみる",
    ],
  },
];

const philosopherGrid = document.getElementById("philosopherGrid");
const consultationForm = document.getElementById("consultationForm");
const responseCard = document.getElementById("responseCard");
const userInput = document.getElementById("userInput");

let selectedPhilosopher = philosophers[0];

function renderPhilosopherCards() {
  philosopherGrid.innerHTML = "";
  philosophers.forEach((philosopher) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "philosopher-card";
    if (selectedPhilosopher.id === philosopher.id) {
      card.classList.add("active");
    }

    card.innerHTML = `
      <h3>${philosopher.name}</h3>
      <strong>${philosopher.title}</strong>
      <p>${philosopher.description}</p>
      <small>トーン: ${philosopher.tone}</small>
    `;

    card.addEventListener("click", () => {
      selectedPhilosopher = philosopher;
      renderPhilosopherCards();
    });

    philosopherGrid.appendChild(card);
  });
}

function renderResponse(input) {
  responseCard.innerHTML = `
    <h3>${selectedPhilosopher.name}からの回答</h3>
    <p>${selectedPhilosopher.prompt(input)}</p>
    <h4>次のアクションのヒント</h4>
    <ul>
      ${selectedPhilosopher.advice.map((item) => `<li>${item}</li>`).join("")}
    </ul>
  `;
}

consultationForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = userInput.value.trim();
  if (!input) {
    return;
  }
  renderResponse(input);
});

renderPhilosopherCards();
