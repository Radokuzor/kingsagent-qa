/* Kings Agent QA - admin view: all feedback, grouped by feature, newest first */
(function () {
  var F = window.KC_QA;
  var out = document.getElementById("out");
  var toastEl = document.getElementById("toast");
  var rows = [];

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c];
    });
  }
  function toast(m, bad) {
    toastEl.textContent = m;
    toastEl.className = "toast show" + (bad ? " bad" : "");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.className = "toast"; }, 3000);
  }
  function when(iso) {
    if (!iso) return "";
    var d = new Date(iso);
    if (isNaN(d)) return esc(iso);
    return d.toLocaleString();
  }

  function render() {
    if (!rows.length) {
      out.innerHTML = "<div class='card'><p>No feedback yet. Send someone to the <a href='qa.html'>test page</a>.</p></div>";
      document.getElementById("counts").textContent = "0 entries";
      document.getElementById("bar").style.width = "0%";
      return;
    }
    var byFeature = {};
    rows.forEach(function (r) { (byFeature[r.feature] = byFeature[r.feature] || []).push(r); });

    var testers = {};
    rows.forEach(function (r) { if (r.tester) testers[r.tester] = 1; });
    var covered = Object.keys(byFeature).length;
    document.getElementById("counts").textContent =
      rows.length + " entries from " + Object.keys(testers).length + " tester(s), covering " +
      covered + " of " + F.features.length + " features";
    document.getElementById("bar").style.width = Math.round(covered / F.features.length * 100) + "%";

    var html = "";
    // features in page order (newest first), then any unknown ids
    var ordered = F.features.map(function (f) { return { id: f.id, title: f.title, section: f.section }; });
    Object.keys(byFeature).forEach(function (k) {
      if (!ordered.some(function (o) { return o.id === k; })) ordered.push({ id: k, title: k, section: "(not on the test page)" });
    });

    ordered.forEach(function (f) {
      var list = byFeature[f.id] || [];
      var badges = "";
      if (list.length) {
        var tally = {};
        list.forEach(function (r) { tally[r.rating || "?"] = (tally[r.rating || "?"] || 0) + 1; });
        badges = Object.keys(tally).map(function (k) {
          var cls = k === "Works" ? "pill ok" : (k === "Broken" ? "pill no" : "pill");
          return "<span class='" + cls + "'>" + esc(k) + " " + tally[k] + "</span>";
        }).join("");
      }
      html += "<h2>" + esc(f.title) + " <span class='small'>(" + list.length + ")</span></h2>";
      if (list.length) html += "<p>" + badges + "</p>";
      if (!list.length) { html += "<p class='small'>No feedback on this one yet.</p>"; return; }
      list.forEach(function (r) {
        html += "<div class='card kv'>" +
          "<p><b>" + esc(r.tester || "anonymous") + "</b> &middot; " + when(r.created) +
          " &middot; " + esc(r.rating || "") + "</p>" +
          (r.sent ? "<p><b>Sent:</b> " + esc(r.sent) + "</p>" : "") +
          (r.saw ? "<p><b>Came back:</b> " + esc(r.saw) + "</p>" : "") +
          (r.notes ? "<p><b>Notes:</b> " + esc(r.notes) + "</p>" : "") +
          "<p class='small'>speed: " + esc(r.speed || "-") + " &middot; tone: " + esc(r.tone || "-") +
          " &middot; clarity: " + esc(r.clarity || "-") + " &middot; use again: " + esc(r.again || "-") + "</p>" +
        "</div>";
      });
    });
    out.innerHTML = html;
  }

  function load() {
    out.innerHTML = "<div class='card'>Loading feedback...</div>";
    window.KCFeedback.list().then(function (data) {
      rows = data;
      render();
    }).catch(function (e) {
      out.innerHTML = "<div class='card'><p>Could not load feedback.</p><pre>" + esc(String(e)) + "</pre></div>";
    });
  }

  function asText() {
    var by = {};
    rows.forEach(function (r) { (by[r.feature_title || r.feature] = by[r.feature_title || r.feature] || []).push(r); });
    var lines = ["KINGS AGENT QA - ALL FEEDBACK (" + rows.length + " entries)", ""];
    Object.keys(by).forEach(function (k) {
      lines.push("## " + k);
      by[k].forEach(function (r) {
        lines.push("- " + (r.tester || "anonymous") + " | " + (r.rating || "") + " | " + (r.created || ""));
        if (r.sent) lines.push("  sent: " + r.sent);
        if (r.saw) lines.push("  back: " + r.saw);
        if (r.notes) lines.push("  notes: " + r.notes);
      });
      lines.push("");
    });
    return lines.join("\n");
  }

  document.getElementById("reload").addEventListener("click", load);
  document.getElementById("copyAll").addEventListener("click", function () {
    var t = asText();
    navigator.clipboard.writeText(t).then(function () { toast("Copied " + rows.length + " entries."); },
      function () { window.prompt("Copy the text below:", t); });
  });
  document.getElementById("download").addEventListener("click", function () {
    var blob = new Blob([JSON.stringify(rows, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "kingsagent-qa-feedback.json";
    a.click();
  });

  load();
})();
