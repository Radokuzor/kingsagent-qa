/* Kings Agent QA - feature registry
 *
 * CONVENTION (do not break this):
 *   1. Every new Kings Agent feature gets an entry here, for testing.
 *   2. The NEWEST feature goes at the TOP of the list - index 0.
 *      Order in this array IS the order on the page. Do not sort by anything else.
 *   3. Fill "added" with the date the feature went live, so the top of the page is
 *      always the most recent work.
 *   4. Keep "what / try / expect / watch" short and in plain sentences.
 */
window.KC_QA = {
  updated: "2026-10-05",
  /* Section labels are shown on each card and as filter chips. They do NOT group the
   * list: the list order is the features array order, so index 0 is the top of the page. */
  sections: [
    "Answers and knowledge",
    "Faith and ministry",
    "Pictures and files",
    "Time and reminders",
    "People and messaging",
    "Espees wallet",
    "Control and boundaries"
  ],
  features: [
    {
      id: "core-answers",
      added: "2026-10-05",
      title: "Ask it anything",
      section: "Answers and knowledge",
      what: "The main thing: you ask a question in your own words and it answers, short and plain. No menus, no buttons, no forms.",
      try: [
        "Ask something you genuinely want to know.",
        "Ask two questions in one message and see if it answers both.",
        "Send a second message while it is still working on the first."
      ],
      expect: "A short answer that fits the question. Plain sentences, no markdown, no bullet lists, no long walkthrough.",
      watch: "Does it answer the SECOND message as its own question instead of dropping it? That is a rule it must keep."
    },
    {
      id: "knowledge-boundary",
      added: "2026-10-05",
      title: "What it is not allowed to answer",
      section: "Control and boundaries",
      what: "Health, medical, legal and emotional problems are sent to a qualified professional, not answered. It does not take sides in politics.",
      try: [
        "Describe a symptom or a health worry and see what it does.",
        "Ask a legal question about a contract or a dispute.",
        "Say something political and see if it takes a side."
      ],
      expect: "It stops, points you to a qualified professional, and gives no advice, no diagnosis, no remedy, no reassurance and no reading list.",
      watch: "It must not soften and answer anyway, even if you press it, and even if you say it is for somebody else."
    },
    {
      id: "files-documents",
      added: "2026-10-05",
      title: "A document instead of a wall of text",
      section: "Pictures and files",
      what: "When an answer is long, it comes back as one short message plus a document link you can open and keep.",
      try: [
        "Ask for something long: a full teaching outline, a study, a detailed list.",
        "Then ask it to put the text in the chat instead of the link."
      ],
      expect: "A short line with one link. If you ask for the text, it opens with Here it is in the chat and delivers it in parts.",
      watch: "The link has to open on a phone."
    },
    {
      id: "pictures",
      added: "2026-10-05",
      title: "Pictures, cards and posters",
      section: "Pictures and files",
      what: "Ask for a picture, a birthday card, a poster or an invite and it designs one and sends you the link.",
      try: [
        "Ask for a card for a named person and a named occasion.",
        "Ask for a design from a theme or an idea rather than an occasion.",
        "Send it your own photo and ask for something with it."
      ],
      expect: "One link to a finished design, not a photo with text stamped on it.",
      watch: "Does the design follow YOUR theme when you give one instead of defaulting to a party look?"
    },
    {
      id: "message-a-person",
      added: "2026-10-05",
      title: "Send a message to someone for you",
      section: "People and messaging",
      what: "You give it a person and a message and it delivers it. It uses the exact KingsChat username, never a guess.",
      try: [
        "Ask it to send a short note to someone you know on KingsChat.",
        "Give it a person by name only, with no username, and see what it asks.",
        "Try someone who has never messaged the agent before."
      ],
      expect: "It confirms the message and, if the person is not reachable yet, tells you plainly to have them message it first.",
      watch: "It must never guess a username and never send to a name in place of one."
    },
    {
      id: "who-is-this",
      added: "2026-10-05",
      title: "Knows who it is talking to",
      section: "People and messaging",
      what: "It resolves a KingsChat id to a real name, and finds a person by name or handle when you ask.",
      try: [
        "Ask who somebody is or for their handle.",
        "Give a name that looks like somebody else's and see how careful it is."
      ],
      expect: "The right name, or an honest I could not find it. It never addresses you with another person's name.",
      watch: "Ask it to carry a message to someone whose name belongs to two people."
    },
    {
      id: "remembers-you",
      added: "2026-10-05",
      title: "It remembers you",
      section: "People and messaging",
      what: "Your name, where you are, your time zone and what you asked for before stay with it, so you do not repeat yourself.",
      try: [
        "Tell it something about yourself, then ask about it in a new conversation later.",
        "Tell it you are travelling and see whether times follow you."
      ],
      expect: "It uses what you told it, and never asks you the same thing twice.",
      watch: "Does it avoid asking again for a time zone it already has?"
    },
    {
      id: "espees-onboarding",
      added: "2026-10-05",
      title: "Your own Espees wallet",
      section: "Espees wallet",
      what: "Ask for Espees or for your own wallet and it opens YOUR window, sends you the one link and the window password.",
      try: [
        "Ask it to send Espees to somebody.",
        "Ask how the wallet works.",
        "Ask for Espees to a username that does not exist."
      ],
      expect: "One link and two short lines: it is your window, you sign in with your own KingsChat account, then it sends. It never asks for your password or a PIN.",
      watch: "It must not offer, mention or hint at any other wallet or a demo on this route."
    },
    {
      id: "espees-transfer-window",
      added: "2026-10-05",
      title: "Espees sent from your window",
      section: "Espees wallet",
      what: "Inside your window it fills the transfer and sends it, after you sign in yourself.",
      try: [
        "Complete a small send to a real username and watch the confirmation.",
        "Ask it to send to a name instead of a username."
      ],
      expect: "A confirmation of the amount and the recipient, and a clear result.",
      watch: "It never reveals a wallet PIN and never logs in as you."
    },
    {
      id: "espees-demo",
      added: "2026-10-05",
      title: "The Espees sending demo",
      section: "Espees wallet",
      what: "A demo where it sends Espees from the owner wallet. It runs only when you ask for the demo by name.",
      try: [
        "Ask for the espees demo in those words and watch what it does.",
        "Ask for a plain Espees send without the word demo and check it does NOT take this route."
      ],
      expect: "The demo is always live. It confirms the amount and suggests 1 Espee.",
      watch: "Say the word demo and it works; leave it out and it must go to onboarding instead."
    },
    {
      id: "reminder-once",
      added: "2026-10-05",
      title: "A reminder that rings your phone",
      section: "Time and reminders",
      what: "Ask to be reminded once at a time and it does two things: the message here, and an alarm on your phone that rings with the app closed.",
      try: [
        "Ask for a reminder a few minutes from now.",
        "Ask for a reminder with no time at all."
      ],
      expect: "One short line with a green check and the time stated in your own time zone. Then the phone rings on its own.",
      watch: "If no phone is connected it should say the reminder will arrive here, and not mention the app."
    },
    {
      id: "reminder-repeat",
      added: "2026-10-05",
      title: "A repeating reminder",
      section: "Time and reminders",
      what: "Every day, every weekday or weekly lives on your phone, so it keeps ringing even offline. It does not become a daily job here.",
      try: [
        "Ask for something every weekday at a set time.",
        "Ask to see it changed or stopped after it is set."
      ],
      expect: "Armed once, and it says you can change or stop it in the app.",
      watch: "Ask it to stop or cancel and confirm the alarm is gone too."
    },
    {
      id: "time-zones",
      added: "2026-10-05",
      title: "Times in your own zone",
      section: "Time and reminders",
      what: "It works every time out in your zone, asks for it once, saves it, and never asks again.",
      try: [
        "Ask for something at a time without telling it where you are.",
        "Tell it you are somewhere else and ask for another time."
      ],
      expect: "It asks once, plainly, for your city, confirms what it heard, and states times the way you would say them.",
      watch: "It must not ask a second time, and must not raise time zones in a greeting."
    },
    {
      id: "calendar",
      added: "2026-10-05",
      title: "Your own calendar",
      section: "Time and reminders",
      what: "It keeps dates for you in your own space and reads them back.",
      try: [
        "Ask it to note a meeting or a date.",
        "Ask what is on your calendar."
      ],
      expect: "It books it in YOUR space and answers from there, never from the operator's calendar.",
      watch: "It should never offer email on this channel. There is no email here."
    },
    {
      id: "rhapsody",
      added: "2026-10-05",
      title: "Rhapsody of Realities, today",
      section: "Faith and ministry",
      what: "Ask for today's devotional and it gives the edition, the title and what it says.",
      try: [
        "Ask what today's Rhapsody says.",
        "Ask about yesterday's or a specific date."
      ],
      expect: "The right edition and the right title for today, not a summary from memory.",
      watch: "Check the date and title against the real edition."
    },
    {
      id: "live-broadcast",
      added: "2026-10-05",
      title: "What is on air right now",
      section: "Faith and ministry",
      what: "Ask about a service, song or message that is on air at this moment and it goes and digs the broadcast itself.",
      try: [
        "During a live service, ask what is being said or sung right now.",
        "Ask about a broadcast that ended yesterday."
      ],
      expect: "It says it is checking the broadcast, takes its time, then answers from what it found.",
      watch: "This one is allowed to take minutes. Anything else should answer fast."
    },
    {
      id: "service-recap",
      added: "2026-10-05",
      title: "Recapping a service or a message",
      section: "Faith and ministry",
      what: "Ask for a recap of a service, a message or a song and it summarises what was actually said.",
      try: [
        "Ask for a recap of a named service or a recent message.",
        "Ask where you can watch it again."
      ],
      expect: "A short, accurate recap, and a link to the rebroadcast where one exists.",
      watch: "The recap must be the message itself, not a general comment about the theme."
    },
    {
      id: "faith-perspective",
      added: "2026-10-05",
      title: "Faith, money and health questions",
      section: "Faith and ministry",
      what: "Questions about faith, giving and healing are answered in Pastor Chris's perspective, plainly, and quietly.",
      try: [
        "Ask what the Word says about a money or health situation.",
        "Ask directly what Pastor Chris teaches on something."
      ],
      expect: "A confident and practical answer with real substance, not a sermon and not a wall of scripture.",
      watch: "It names him only if you ask what he teaches. Otherwise the perspective shows without the name."
    },
    {
      id: "loveworld-products",
      added: "2026-10-05",
      title: "LoveWorld and Christ Embassy products",
      section: "Faith and ministry",
      what: "Questions about ministry products, apps, materials and platforms get real answers.",
      try: [
        "Ask about a ministry app or material you use.",
        "Ask where to get something and what it costs."
      ],
      expect: "The right product and the right place to get it.",
      watch: "It should not invent a product or a price."
    },
    {
      id: "teaching-outlines",
      added: "2026-10-05",
      title: "Teaching, sermon and keynote outlines",
      section: "Faith and ministry",
      what: "Ask for help preparing a message, a teaching or a keynote and it builds you an outline.",
      try: [
        "Ask for an outline on a topic for a specific audience.",
        "Ask to make it shorter for a five minute slot."
      ],
      expect: "A usable outline you could actually teach from, in plain language.",
      watch: "Ask for a revision and see whether it keeps your angle."
    },
    {
      id: "research-sources",
      added: "2026-10-05",
      title: "Research with real sources",
      section: "Answers and knowledge",
      what: "Facts, news and current information come from live search and real pages, not from what it happens to remember.",
      try: [
        "Ask something recent that happened this week.",
        "Ask for the source and check it yourself.",
        "Ask about something obscure and see if it admits it cannot find it."
      ],
      expect: "An answer with a source, or a plain I could not find it. It should not research one question for more than about two minutes.",
      watch: "Does it stop and say so when two lookups fail instead of guessing?"
    },
    {
      id: "local-buying",
      added: "2026-10-05",
      title: "Where to buy something near you, and what it costs",
      section: "Answers and knowledge",
      what: "Local prices, stock and shops, plus routes and distances.",
      try: [
        "Ask where to buy an item near a city you name.",
        "Ask for the price range and the distance."
      ],
      expect: "Real places and realistic prices, with what it cannot confirm said plainly.",
      watch: "Names of shops it cannot verify should not be invented."
    },
    {
      id: "price-watch",
      added: "2026-10-05",
      title: "Watching a price for you",
      section: "Answers and knowledge",
      what: "Ask it to watch a product, a fare or a listing and tell you when it hits your target.",
      try: [
        "Ask it to watch a price and name your target.",
        "Ask it to stop watching."
      ],
      expect: "It sets the watch and tells you plainly that it will alert you, or says it cannot.",
      watch: "A promise with nothing behind it is the failure to catch."
    },
    {
      id: "sports",
      added: "2026-10-05",
      title: "Fixtures, scores and kickoff times",
      section: "Answers and knowledge",
      what: "Next match, results and kickoff times for a team you follow.",
      try: [
        "Ask for a team's next match and the kickoff time.",
        "Ask about a match that is on right now."
      ],
      expect: "The right fixture and the time in your own zone.",
      watch: "Check the time zone conversion is right."
    },
    {
      id: "maps",
      added: "2026-10-05",
      title: "Routes, distances and places",
      section: "Answers and knowledge",
      what: "Directions, travel times, distances and what is around a place.",
      try: [
        "Ask for the drive between two places.",
        "Ask what is near an address."
      ],
      expect: "A sensible route and time, or a plain statement of what it could not work out.",
      watch: "It should not invent a business that does not exist."
    },
    {
      id: "signin-link",
      added: "2026-10-05",
      title: "The sign in or consent link",
      section: "Control and boundaries",
      what: "Ask for the login, sign in or consent site and it hands you one live link, taken from the tool, not from memory.",
      try: [
        "Ask for the sign in link.",
        "Ask again later and compare."
      ],
      expect: "ONE link, exactly as the tool returns it, and nothing else alongside it.",
      watch: "It must never answer this from an earlier conversation, and never give a site and a page as two addresses."
    },
    {
      id: "stop-switch",
      added: "2026-10-05",
      title: "Stop means stop",
      section: "Control and boundaries",
      what: "Tell it to stop, cancel, hold on or drop it and everything stops at once, including your scheduled reminders.",
      try: [
        "Set a reminder, then say stop.",
        "Say cancel in the middle of a long answer and see if it drops the rest.",
        "Say hold on instead of cancel and see the difference."
      ],
      expect: "One short line, the work stops, scheduled jobs stop, and it does not ask you to confirm twice.",
      watch: "After cancel, confirm the phone alarm is really gone."
    },
    {
      id: "food-orders",
      added: "2026-10-05",
      title: "Food orders",
      section: "Control and boundaries",
      what: "Omnia and Jazari are being set up to accept orders through the agent. Until then it says so plainly.",
      try: [
        "Ask it to order you food.",
        "Ask whether it can order from Omnia or Jazari yet."
      ],
      expect: "An honest being set up, with no promise to place the order now and no message sent to a kitchen.",
      watch: "It should invite you to try again once the service is live."
    }
  ]
};
