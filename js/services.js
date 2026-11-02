(function () {
  var services = [
    { id: "wiring", title: "Wiring & Installations", category: "installations", priceFrom: 450,
      price: "From R450 per point",
      description: "New wiring, plug points, lighting circuits and distribution board (DB) installations for homes and small businesses. Final quote provided after an on-site assessment." },
    { id: "fault-finding", title: "Fault-Finding", category: "diagnostics", priceFrom: 350,
      price: "Call-out fee: R350, plus parts and repair time",
      description: "Fast, accurate diagnosis of trips, power outages and faulty circuits." },
    { id: "coc", title: "Certificate of Compliance (CoC) Inspections", category: "compliance", priceFrom: 850,
      price: "From R850 per inspection, depending on property size",
      description: "Required for property sales, rentals and insurance purposes." },
    { id: "emergency", title: "Emergency Call-Outs", category: "emergency", priceFrom: null,
      price: "Standard call-out fee plus an after-hours surcharge",
      description: "Available for urgent electrical faults." }
  ];

  var list = document.getElementById("service-list");
  var search = document.getElementById("service-search");
  var category = document.getElementById("service-category");
  var sortBy = document.getElementById("service-sort");
  var count = document.getElementById("service-count");
  if (!list || !search || !category || !sortBy) return;

  function makeCard(s) {
    var card = document.createElement("section");
    card.className = "service-detail service-card";

    var h3 = document.createElement("h3");
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "accordion-toggle";
    btn.setAttribute("aria-expanded", "false");
    btn.setAttribute("aria-controls", "panel-" + s.id);

    var title = document.createElement("span");
    title.textContent = s.title;
    var icon = document.createElement("span");
    icon.className = "accordion-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = "+";
    btn.appendChild(title);
    btn.appendChild(icon);
    h3.appendChild(btn);

    var panel = document.createElement("div");
    panel.className = "accordion-panel";
    panel.id = "panel-" + s.id;
    panel.hidden = true;
    var p1 = document.createElement("p");
    p1.textContent = s.description;
    var p2 = document.createElement("p");
    p2.className = "service-price";
    p2.textContent = "Indicative pricing: " + s.price;
    panel.appendChild(p1);
    panel.appendChild(p2);

    btn.addEventListener("click", function () {
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      icon.textContent = open ? "+" : "\u2212";
      panel.hidden = open;
    });

    card.appendChild(h3);
    card.appendChild(panel);
    return card;
  }

  function render() {
    var q = search.value.trim().toLowerCase();
    var cat = category.value;
    var order = sortBy.value;

    var results = services.filter(function (s) {
      var matchesText = (s.title + " " + s.description + " " + s.category).toLowerCase().indexOf(q) !== -1;
      var matchesCat = cat === "all" || s.category === cat;
      return matchesText && matchesCat;
    });

    results.sort(function (a, b) {
      if (order === "name") return a.title.localeCompare(b.title);
      if (order === "price-asc" || order === "price-desc") {
        if (a.priceFrom === null && b.priceFrom === null) return 0;
        if (a.priceFrom === null) return 1;
        if (b.priceFrom === null) return -1;
        return order === "price-asc" ? a.priceFrom - b.priceFrom : b.priceFrom - a.priceFrom;
      }
      return services.indexOf(a) - services.indexOf(b);
    });

    list.textContent = "";
    results.forEach(function (s) { list.appendChild(makeCard(s)); });

    if (results.length === 0) {
      var none = document.createElement("p");
      none.className = "no-results";
      none.textContent = "No services match your search. Try a different word or reset the filter.";
      list.appendChild(none);
    }
    count.textContent = results.length + (results.length === 1 ? " service shown" : " services shown");
  }

  search.addEventListener("input", render);
  category.addEventListener("change", render);
  sortBy.addEventListener("change", render);
  render();
})();