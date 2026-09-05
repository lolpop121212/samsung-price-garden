const phones = [
  {
    name: "Galaxy S25 Ultra",
    price: 1299.99,
    tier: "flagship",
    color: "#5a5a68",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Samsung_Galaxy_S25_Ultra.jpg/300px-Samsung_Galaxy_S25_Ultra.jpg",
  },
  {
    name: "Galaxy S25+",
    price: 999.99,
    tier: "flagship",
    color: "#7fb8a8",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Samsung_Galaxy_S25%2B.jpg/300px-Samsung_Galaxy_S25%2B.jpg",
  },
  {
    name: "Galaxy S25",
    price: 799.99,
    tier: "flagship",
    color: "#6fbf9f",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Samsung_Galaxy_S25%2B.jpg/300px-Samsung_Galaxy_S25%2B.jpg",
  },
  {
    name: "Galaxy Z Fold 6",
    price: 1899.99,
    tier: "fold",
    color: "#4a5680",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Samsung_Galaxy_Z_Fold_6.jpg/300px-Samsung_Galaxy_Z_Fold_6.jpg",
  },
  {
    name: "Galaxy Z Flip 6",
    price: 1099.99,
    tier: "fold",
    color: "#a98fd6",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Samsung_Galaxy_Z_Flip_6.jpg/300px-Samsung_Galaxy_Z_Flip_6.jpg",
  },
  {
    name: "Galaxy S24 FE",
    price: 649.99,
    tier: "mid",
    color: "#e3c47c",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Samsung_Galaxy_S24_FE_2024_%28cropped%29.jpg/300px-Samsung_Galaxy_S24_FE_2024_%28cropped%29.jpg",
  },
  {
    name: "Galaxy A55 5G",
    price: 449.99,
    tier: "mid",
    color: "#e090ad",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Samsung_Galaxy_A55_5G_2024.jpg/300px-Samsung_Galaxy_A55_5G_2024.jpg",
  },
  {
    name: "Galaxy A35 5G",
    price: 399.99,
    tier: "mid",
    color: "#7e9fd0",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/Samsung_Galaxy_A35_5G_Phone_%28Front%29.jpg/300px-Samsung_Galaxy_A35_5G_Phone_%28Front%29.jpg",
  },
  {
    name: "Galaxy A15 5G",
    price: 199.99,
    tier: "budget",
    color: "#d6c468",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Samsung_Galaxy_A15_5G_2024.jpg/300px-Samsung_Galaxy_A15_5G_2024.jpg",
  },
  {
    name: "Galaxy A05",
    price: 129.99,
    tier: "budget",
    color: "#d89a6a",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Samsung_Galaxy_A05_2024.jpg/300px-Samsung_Galaxy_A05_2024.jpg",
  },
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
      <div class="phone3d">
        <div class="spin">
          <div class="face front"><img class="photo" src="${p.img}" alt="${p.name}" loading="lazy" /></div>
          <div class="face back" style="background:${p.color}">
            <div class="cam"><span></span><span></span></div>
            <div class="lg">SAMSUNG</div>
          </div>
        </div>
      </div>
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