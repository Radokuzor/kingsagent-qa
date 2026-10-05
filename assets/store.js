/* Kings Agent QA - shared store: checkmarks in the browser, feedback in Firestore.
 * Feedback collection: qa_feedback  (create + read only; nothing app-side is touched)
 */
(function () {
  var LS_KEY = "kcqa.tested.v1";
  var NAME_KEY = "kcqa.tester.v1";

  function read() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch (e) { return {}; }
  }
  function write(obj) { localStorage.setItem(LS_KEY, JSON.stringify(obj)); }

  window.KCStore = {
    isTested: function (id) { return !!read()[id]; },
    testedAt: function (id) { return read()[id] || null; },
    toggle: function (id) {
      var m = read();
      if (m[id]) { delete m[id]; } else { m[id] = new Date().toISOString(); }
      write(m);
      return !!m[id];
    },
    reset: function () { write({}); },
    count: function () { return Object.keys(read()).length; },
    testerName: function () { return localStorage.getItem(NAME_KEY) || ""; },
    setTesterName: function (n) { localStorage.setItem(NAME_KEY, n || ""); }
  };

  // ---------- Firebase (module SDK, loaded in the pages) ----------
  var appMod, fsMod, db, ready;
  function boot() {
    if (ready) return ready;
    ready = Promise.all([
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"),
      import("https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js")
    ]).then(function (mods) {
      appMod = mods[0]; fsMod = mods[1];
      var app = appMod.initializeApp(window.FIREBASE_CONFIG);
      db = fsMod.getFirestore(app);
      return db;
    });
    return ready;
  }

  window.KCFeedback = {
    submit: function (payload) {
      return boot().then(function () {
        var row = Object.assign({}, payload, {
          created: new Date().toISOString(),
          ua: (navigator.userAgent || "").slice(0, 160)
        });
        Object.keys(row).forEach(function (k) {
          if (row[k] === undefined || row[k] === null) delete row[k];
        });
        return fsMod.addDoc(fsMod.collection(db, "qa_feedback"), row);
      });
    },
    list: function () {
      return boot().then(function () {
        var q = fsMod.query(fsMod.collection(db, "qa_feedback"), fsMod.orderBy("created", "desc"));
        return fsMod.getDocs(q).then(function (snap) {
          var out = [];
          snap.forEach(function (d) { out.push(Object.assign({ _id: d.id }, d.data())); });
          return out;
        });
      });
    },
    isReady: function () { return !!db; }
  };
})();
