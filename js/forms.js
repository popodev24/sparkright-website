(function () {
  var RECIPIENT = "mphombele399@gmail.com"; // change to the email on your Contact page
  var fmt = new Intl.NumberFormat("en-ZA", { style: "currency", currency: "ZAR", maximumFractionDigits: 0 });

  function val(id) {
    var el = document.getElementById(id);
    if (!el) return "";
    if (el.type === "checkbox") return el.checked ? "yes" : "";
    if (el.tagName === "FIELDSET") { var c = el.querySelector("input:checked"); return c ? c.value : ""; }
    return el.value.trim();
  }
  function iso(d) {
    var m = d.getMonth() + 1, day = d.getDate();
    return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
  }

  /* ---------- validation rules: each returns "" if OK, or an error message ---------- */
  function nameRule(v) {
    if (!v) return "Please enter your full name.";
    if (!/^[A-Za-z\u00C0-\u024F' -]{2,60}$/.test(v)) return "Use letters only, between 2 and 60 characters.";
    return "";
  }
  function emailRule(v) {
    if (!v) return "Please enter your email address.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return "Enter a valid email, e.g. name@example.com.";
    return "";
  }
  function phoneRule(required) {
    return function (v) {
      if (!v) return required ? "Please enter your phone number." : "";
      var c = v.replace(/[\s-]/g, "");
      if (!/^(0|\+27)[1-9]\d{8}$/.test(c)) return "Enter a valid South African number, e.g. 082 123 4567 or +27 82 123 4567.";
      return "";
    };
  }
  function lengthRule(min, max, what) {
    return function (v) {
      if (!v) return "Please enter " + what + ".";
      if (v.length < min) return "Please write at least " + min + " characters (you have " + v.length + ").";
      if (v.length > max) return "Please keep it under " + max + " characters.";
      return "";
    };
  }
  function requiredRule(msg) { return function (v) { return v ? "" : msg; }; }
  function dateRule(v) {
    if (!v) return "Please choose your preferred date.";
    var d = new Date(v + "T00:00:00"), today = new Date();
    today.setHours(0, 0, 0, 0);
    var max = new Date(today); max.setFullYear(max.getFullYear() + 1);
    if (isNaN(d.getTime())) return "Enter a valid date.";
    if (d < today) return "The date cannot be in the past.";
    if (d > max) return "Please choose a date within the next 12 months.";
    return "";
  }

  var rules = {
    "enq-name": nameRule,
    "enq-email": emailRule,
    "enq-phone": phoneRule(true),
    "enq-service": requiredRule("Please choose a service."),
    "enq-property": requiredRule("Please choose a property type."),
    "enq-date": dateRule,
    "enq-location": lengthRule(3, 80, "your suburb or area"),
    "enq-method": requiredRule("Please choose how we should contact you."),
    "enq-message": lengthRule(10, 500, "a short description of the job"),
    "enq-consent": requiredRule("Please tick the box so we can contact you."),
    "con-name": nameRule,
    "con-email": emailRule,
    "con-phone": phoneRule(false),
    "con-type": requiredRule("Please choose a message type."),
    "con-message": lengthRule(20, 1000, "your message")
  };

  function check(id) {
    var rule = rules[id];
    if (!rule) return true;
    var msg = rule(val(id));
    var el = document.getElementById(id), err = document.getElementById(id + "-error");
    if (err) err.textContent = msg;
    if (el && el.tagName !== "FIELDSET") {
      el.classList.toggle("invalid", !!msg);
      el.setAttribute("aria-invalid", msg ? "true" : "false");
    }
    return !msg;
  }

  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }

  function wire(form, ids, resultEl, onValid) {
    if (!form) return;
    ids.forEach(function (id) {
      var f = document.getElementById(id);
      if (!f) return;
      if (f.tagName !== "FIELDSET") f.addEventListener("focusout", function () { check(id); });
      f.addEventListener("input", function () { if (f.classList.contains("invalid")) check(id); });
      f.addEventListener("change", function () { check(id); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var first = null;
      ids.forEach(function (id) { if (!check(id) && !first) first = document.getElementById(id); });
      if (first) {
        resultEl.textContent = "";
        resultEl.appendChild(el("p", "", "Please fix the highlighted fields and try again."));
        resultEl.classList.add("is-error");
        resultEl.hidden = false;
        (first.tagName === "FIELDSET" ? first.querySelector("input") : first).focus();
        return;
      }
      resultEl.classList.remove("is-error");
      onValid(resultEl);
      resultEl.hidden = false;
      resultEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }

  function counter(areaId, countId, max) {
    var a = document.getElementById(areaId), c = document.getElementById(countId);
    if (!a || !c) return;
    function up() { c.textContent = a.value.length + " / " + max + " characters"; }
    a.addEventListener("input", up); up();
  }

  /* ---------- ENQUIRY FORM ---------- */
  var enqForm = document.getElementById("enquiry-form");
  if (enqForm) {
    var select = document.getElementById("enq-service");
    if (typeof SERVICES !== "undefined") {
      SERVICES.forEach(function (s) {
        var o = document.createElement("option");
        o.value = s.id; o.textContent = s.name;
        select.appendChild(o);
      });
      var wanted = new URLSearchParams(window.location.search).get("service");
      if (wanted) select.value = wanted;
    }
    document.getElementById("enq-date").min = iso(new Date());
    counter("enq-message", "enq-message-count", 500);

    wire(enqForm, ["enq-name", "enq-email", "enq-phone", "enq-service", "enq-property", "enq-date", "enq-location", "enq-method", "enq-message", "enq-consent"],
      document.getElementById("enquiry-result"),
      function (box) {
        var s = (typeof SERVICES !== "undefined" ? SERVICES : []).filter(function (x) { return x.id === val("enq-service"); })[0];
        var date = new Date(val("enq-date") + "T00:00:00");
        var ref = "SR-" + Date.now().toString(36).toUpperCase().slice(-6);
        var method = val("enq-method");
        var where = method === "email" ? val("enq-email") : val("enq-phone");
        var pretty = date.toLocaleDateString("en-ZA", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
        box.textContent = "";
        box.appendChild(el("h3", "", "Thank you, " + val("enq-name").split(" ")[0] + "! Enquiry " + ref + " received"));
        if (s) {
          box.appendChild(el("p", "", "Service: " + s.name + " (" + val("enq-property") + " property in " + val("enq-location") + ")"));
          box.appendChild(el("p", "p3-price", "Estimated cost: from " + fmt.format(s.price) + " " + s.unit));
          box.appendChild(el("p", "", "Typical turnaround: " + s.turnaround + ". The final quote is confirmed once we have seen the job."));
        }
        box.appendChild(el("p", "", date.getDay() === 0
          ? "Availability: you picked a Sunday. We work Monday to Saturday, so we will offer you the next working day."
          : "Availability: we can usually fit you in on " + pretty + ", subject to confirmation."));
        box.appendChild(el("p", "", "We will contact you by " + method + " on " + where + " within one working day."));
      });
  }

  /* ---------- CONTACT FORM (AJAX submission) ---------- */
  var conForm = document.getElementById("contact-form");
  if (conForm) {
    counter("con-message", "con-message-count", 1000);
    conForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var box = document.getElementById("contact-result");
      var submitBtn = conForm.querySelector('[type="submit"]');
      var subject = "[" + val("con-type") + "] Message from " + val("con-name");
      var payload = {
        name: val("con-name"),
        email: val("con-email"),
        phone: val("con-phone") || "not provided",
        message_type: val("con-type"),
        message: val("con-message"),
        _subject: subject,
        _template: "table",
        _captcha: "false"
      };

      function mailtoFallback() {
        var body = "Name: " + payload.name + "\nEmail: " + payload.email +
          "\nPhone: " + payload.phone + "\nType: " + payload.message_type + "\n\n" + payload.message;
        var a = el("a", "p3-btn", "Send with your email app instead");
        a.href = "mailto:" + RECIPIENT + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(body);
        return a;
      }

      if (box) {
        box.textContent = "";
        box.appendChild(el("p", "", "Sending your message..."));
      }
      if (submitBtn) submitBtn.disabled = true;

      fetch("https://formsubmit.co/ajax/" + RECIPIENT, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(payload)
      })
        .then(function (res) {
          return res.json().then(function (data) { return { ok: res.ok, data: data }; });
        })
        .then(function (r) {
          if (box) box.textContent = "";
          if (r.ok && String(r.data.success) === "true") {
            if (box) {
              box.classList.remove("is-error");
              box.appendChild(el("h3", "", "Thank you, " + payload.name.split(" ")[0] + "! Your message has been sent"));
              box.appendChild(el("p", "", "We have received your " + payload.message_type.toLowerCase() + " message and will reply to " + payload.email + " within one working day."));
            }
            conForm.reset();
            var c = document.getElementById("con-message-count");
            if (c) c.textContent = "0 / 1000 characters";
          } else {
            throw new Error(r.data && r.data.message ? r.data.message : "Send failed");
          }
        })
        .catch(function () {
          if (box) {
            box.textContent = "";
            box.classList.add("is-error");
            box.appendChild(el("h3", "", "We could not send your message"));
            box.appendChild(el("p", "", "Please check your internet connection and try again, or send it with your email app."));
            box.appendChild(mailtoFallback());
          }
        })
        .then(function () {
          if (submitBtn) submitBtn.disabled = false;
        });
    });
  }
})();