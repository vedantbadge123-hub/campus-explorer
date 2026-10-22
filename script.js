// "items" comes from data.js, so don't declare it here

const container = document.querySelector("#cards");
const search = document.querySelector("#search");
const count = document.querySelector("#count");
let activeCategory = "all";

// Draws the cards on the page from whatever list you give it
function render(list) {
  count.textContent = `Showing ${list.length} of ${items.length} clubs`;

  if (list.length === 0) {
    container.innerHTML = "<p>No clubs found.</p>";
    return;
  }
  container.innerHTML = list.map(item => `
    <div class="card ${item.category}">
      <h3>${item.name}</h3>
      <span>${item.category}</span>
      <div class="details">
        <p>Faculty mentor: ${item.mentor}</p>
      </div>
    </div>
  `).join("");
}

// Filters the full list by search text and selected category, then redraws
function applyFilters() {
  const q = search.value.toLowerCase();
  const result = items.filter(item =>
    (activeCategory === "all" || item.category === activeCategory) &&
    item.name.toLowerCase().includes(q)
  );
  render(result);
}

// Typing in the search box re-filters
search.addEventListener("input", applyFilters);

// Clicking a category button sets the category and re-filters
document.querySelectorAll("#filters button").forEach(btn => {
  btn.addEventListener("click", () => {
    activeCategory = btn.dataset.category;
    applyFilters();
  });
});
container.addEventListener("click", (e) => {
  const card = e.target.closest(".card");
  if (card) {
    card.classList.toggle("open");
  }
});

// Show everything when the page first loads
render(items);