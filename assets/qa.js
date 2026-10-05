/* Kings Agent QA - page logic for qa.html */
(function () {
  var F = window.KC_QA, S = window.KCStore;
  var host = document.getElementById("features");
  var toastEl = document.getElementById("toast");

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c];
    });
  }

  function toast(msg, bad) {
    toastEl.textContent = msg;
    toastEl.className = "toast show" + (bad ? " bad" : "");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.className = "toast"; }, 4200);
  }

  function refreshProgress() {
    var total = F.features.length, done = 0;
    F.features.forEach(function (f) { if (S.isTested(f.id)) done++; });
    document.getElementById("progressText").textContent = done + " of " + total + " tested";
    document.getElementById("progressBar").style.width = (total ? Math.round(done / total * 100) : 0) + "%";
  }

  function li(items) {
    if (!items || !items.length) return "";
    return "<ul class='tight'>" + items.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + "</ul>";
  }

  function formHtml(f) {
    return "" +
      "<div class='row'>" +
        "<div style='flex:1;min-width:180px'><label>Your name</label>" +
        "<input type='text' name='tester' placeholder='who is testing' value='" + esc(S.testerName()) + "'></div>" +
        "<div style='flex:1;min-width:180px'><label>Did it work?</label>" +
        "<select name='rating'>" +
          "<option>Works</option><option>Partly works</option><option>Broken</option><option>Could not test it</option>" +
        "</select></div>" +
      "</div>" +
      "<label>What you sent (your own words)</label>" +
      "<textarea name='sent' placeholder='paste what you actually sent'></textarea>" +
      "<label>What came back</label>" +
      "<textarea name='saw' placeholder='what it answered or did'></textarea>" +
      "<div class='row'>" +
        "<div style='flex:1;min-width:150px'><label>Speed</label><select name='speed'><option>Fast</option><option>About right</option><option>Slow</option><option>Too slow</option></select></div>" +
        "<div style='flex:1;min-width:150px'><label>Tone</label><select name='tone'><option>Warm</option><option>Neutral</option><option>Cold</option></select></div>" +
        "<div style='flex:1;min-width:150px'><label>Clear?</label><select name='clarity'><option>Clear</option><option>A bit confusing</option><option>Confusing</option></select></div>" +
        "<div style='flex:1;min-width:150px'><label>Use it again?</label><select name='again'><option>Yes</option><option>Maybe</option><option>No</option></select></div>" +
      "</div>" +
      "<label>Anything missing, confusing or worth knowing</label>" +
      "<textarea name='notes' placeholder='optional'></textarea>" +
      "<div class='row' style='margin-top:12px'>" +
        "<button class='primary' type='button' data-submit='" + esc(f.id) + "'>Send feedback</button>" +
        "<span class='small' data-state='" + esc(f.id) + "'></span>" +
      "</div>";
  }

  function card(f, i) {
    var done = S.isTested(f.id);
    return "" +
      "<div class='card feature" + (done ? " done" : "") + "' id='f-" + esc(f.id) + "'>" +
        "<div class='head'>" +
          "<div class='grow'>" +
            "<h3>" + esc(f.title) + "</h3>" +
            "<div class='meta'>" + esc(f.section) + " &middot; added " + esc(f.added) + "</div>" +
          "</div>" +
          "<button type='button' class='" + (done ? "checked" : "") + "' data-tick='" + esc(f.id) + "'>" +
            (done ? "Tested &#10003;" : "Mark tested") +
          "</button>" +
        "</div>" +
        "<p>" + esc(f.what) + "</p>" +
        (f.try && f.try.length ? "<p class='small'><b>Try this:</b></p>" + li(f.try) : "") +
        "<p class='small'><b>What good looks like:</b> " + esc(f.expect) + "</p>" +
        (f.watch ? "<p class='small'><b>Watch for:</b> " + esc(f.watch) + "</p>" : "") +
        "<details class='fb'><summary>Give feedback on this feature</summary>" + formHtml(f) + "</details>" +
      "</div>";
  }

  var filter = "All";

  function chips() {
    var used = [];
    F.features.forEach(function (f) { if (used.indexOf(f.section) < 0) used.push(f.section); });
    var all = ["All"].concat(used);
    return "<div class='row' id='chips' style='margin:12px 0 4px'>" + all.map(function (s) {
      return "<button type='button' class='ghost" + (s === filter ? " checked" : "") +
        "' data-chip='" + esc(s) + "'>" + esc(s) + "</button>";
    }).join("") + "</div>";
  }

  function render() {
    var listed = F.features.filter(function (f) { return filter === "All" || f.section === filter; });
    host.innerHTML = chips() +
      "<p class='small'>" + listed.length + " feature(s), newest first.</p>" +
      listed.map(card).join("");
    refreshProgress();
  }

  host.addEventListener("click", function (ev) {
    var chip = ev.target.closest("[data-chip]");
    if (chip) { filter = chip.getAttribute("data-chip"); render(); return; }
    var tick = ev.target.closest("[data-tick]");
    if (tick) {
      var id = tick.getAttribute("data-tick");
      var now = S.toggle(id);
      tick.className = now ? "checked" : "";
      tick.innerHTML = now ? "Tested &#10003;" : "Mark tested";
      tick.closest(".feature").className = "card feature" + (now ? " done" : "");
      refreshProgress();
      return;
    }
    var sub = ev.target.closest("[data-submit]");
    if (sub) {
      var fid = sub.getAttribute("data-submit");
      var card = sub.closest(".feature");
      var state = card.querySelector("[data-state='" + fid + "']");
      var get = function (n) { var el = card.querySelector("[name='" + n + "']"); return el ? el.value.trim() : ""; };
      var feat = F.features.filter(function (x) { return x.id === fid; })[0] || { title: fid, section: "" };
      var payload = {
        feature: fid, feature_title: feat.title, section: feat.section,
        tester: get("tester"), rating: get("rating"),
        sent: get("sent"), saw: get("saw"),
        speed: get("speed"), tone: get("tone"), clarity: get("clarity"), again: get("again"),
        notes: get("notes"), page: location.href
      };
      if (!payload.sent && !payload.saw) { toast("Add what you sent or what came back first.", true); return; }
      if (payload.tester) S.setTesterName(payload.tester);
      state.textContent = "sending...";
      sub.disabled = true;
      window.KCFeedback.submit(payload).then(function () {
        state.textContent = "Sent. Thank you.";
        toast("Feedback sent for: " + feat.title);
        card.querySelectorAll("textarea").forEach(function (t) { t.value = ""; });
        sub.disabled = false;
      }).catch(function (err) {
        sub.disabled = false;
        state.textContent = "";
        toast("Could not send. Copy your text and send it to Radiance.", true);
        console.error(err);
      });
    }
  });

  document.getElementById("resetTicks").addEventListener("click", function () {
    if (confirm("Clear every tick in this browser?")) { S.reset(); render(); }
  });
  document.getElementById("collapseAll").addEventListener("click", function () {
    document.querySelectorAll("details.fb[open]").forEach(function (d) { d.open = false; });
  });

  render();
})();
