const phones = [
  { name: "Galaxy S25 Ultra", price: 1299.99, tier: "flagship", emoji: "\u{1F600}" },
  { name: "Galaxy S25+", price: 999.99, tier: "flagship", emoji: "\u{1F98B}" },
  { name: "Galaxy S25", price: 799.99, tier: "flagship", emoji: "\u{1F31F}" },
  { name: "Galaxy Z Fold 6", price: 1899.99, tier: "fold", emoji: "\u{1F9D6}" },
  { name: "Galaxy Z Flip 6", price: 1099.99, tier: "fold", emoji: "\u{1F338}" },
  { name: "Galaxy S24 FE", price: 649.99, tier: "mid", emoji: "\u2B50" },
  { name: "Galaxy A55 5G", price: 449.99, tier: "mid", emoji: "\u{1F98B}" },
  { name: "Galaxy A35 5G", price: 399.99, tier: "mid", emoji: "\u{1F49C}" },
  { name: "Galaxy A15 5G", price: 199.99, tier: "budget", emoji: "\u{1F33B}" },
  { name: "Galaxy A05", price: 129.99, tier: "budget", emoji: "\u{1F319}" },
];

const grid = document.getElementById("grid");
const search = document.getElementById("search");
const sortBtn = document.getElementById("sortBtn");

let sortDesc = false;
let query = "";

function render() {
  let list = phones.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );
  list.sort((a, b) => (sortDesc ? b.price - a.price : a.price - b.price));

  grid.innerHTML = "";

  if (list.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "No phones found... \u{1F614}";
    grid.appendChild(empty);
    return;
  }

  list.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.style.animationDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <span class="emoji">${p.emoji}</span>
      <div class="name">${p.name}</div>
      <div class="line"></div>
      <div class="desc">${tierLabel(p.tier)}</div>
      <div class="price">$${p.price.toFixed(2)}</div>
    `;
    card.addEventListener("click", () => burst(card));
    grid.appendChild(card);
  });
}

function tierLabel(t) {
  return {
    flagship: "Flagship star \u{1F496}",
    fold: "Foldable magic \u2728",
    mid: "Everyday cutie \u{1F381}",
    budget: "Budget buddy \u{1F43E}",
  }[t];
}

function burst(el) {
  const rect = el.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const s = document.createElement("span");
    s.className = "spark";
    s.textContent = ["\u{1F496}", "\u2B50", "\u2728", "\u{1F338}"][i % 4];
    s.style.left = rect.left + rect.width / 2 + (Math.random() * 160 - 80) + "px";
    s.style.fontSize = 1 + Math.random() * 1.4 + "rem";
    s.style.animationDuration = 1.6 + Math.random() * 1.2 + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 3200);
  }
}

setInterval(() => burst(document.getElementById("grid")), 60000);

search.addEventListener("input", () => {
  query = search.value;
  render();
});

sortBtn.addEventListener("click", () => {
  sortDesc = !sortDesc;
  sortBtn.textContent = sortDesc ? "Sort \u{1F53D}" : "Sort \u{1F53C}";
  render();
});

render();