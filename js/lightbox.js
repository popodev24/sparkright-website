(function () {
  var links = Array.prototype.slice.call(document.querySelectorAll(".gallery-item"));
  if (!links.length || typeof HTMLDialogElement === "undefined") return;

  var dlg = document.createElement("dialog");
  dlg.className = "lightbox";
  dlg.setAttribute("aria-label", "Image viewer");
  dlg.innerHTML =
    '<button type="button" class="lb-btn lb-close" aria-label="Close image viewer">&times;</button>' +
    '<button type="button" class="lb-btn lb-prev" aria-label="Previous image">&#8249;</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<button type="button" class="lb-btn lb-next" aria-label="Next image">&#8250;</button>';
  document.body.appendChild(dlg);

  var img = dlg.querySelector("img");
  var caption = dlg.querySelector("figcaption");
  var current = 0;

  function show(i) {
    current = (i + links.length) % links.length;
    var thumb = links[current].querySelector("img");
    img.src = links[current].getAttribute("href");
    img.alt = thumb ? thumb.alt : "";
    caption.textContent = img.alt;
  }

  links.forEach(function (a, i) {
    a.addEventListener("click", function (e) {
      e.preventDefault();
      show(i);
      dlg.showModal();
    });
  });

  dlg.querySelector(".lb-close").addEventListener("click", function () { dlg.close(); });
  dlg.querySelector(".lb-prev").addEventListener("click", function () { show(current - 1); });
  dlg.querySelector(".lb-next").addEventListener("click", function () { show(current + 1); });

  // Click outside the image closes the viewer
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  document.addEventListener("keydown", function (e) {
    if (!dlg.open) return;
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();