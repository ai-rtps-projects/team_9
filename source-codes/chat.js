const data = {
  leave: {
    keys: ['leave', 'vacation', 'sick'],
    rows: [['Annual', '21 days'], ['Sick', '10 days'], ['Casual', '7 days']]
  },
  salary: {
    keys: ['salary', 'pay', 'payslip'],
    rows: [['Pay Date', '28th'], ['Increment', '8%-20%'], ['Appraisal', 'April']]
  },
  policy: {
    keys: ['policy', 'wfh', 'dress'],
    rows: [['Work Time', '9 AM - 6 PM'], ['WFH', '2 days/week'], ['Notice', '60 days']]
  },
  benefits: {
    keys: ['benefit', 'insurance', 'medical'],
    rows: [['Insurance', '₹5L'], ['Meal Card', '₹2500'], ['Gym', '₹1000']]
  }
};

function time() {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function card(rows) {
  return `<div class="info-card">
    ${rows.map(r => `<div class="row"><span>${r[0]}</span><span>${r[1]}</span></div>`).join('')}
  </div>`;
}

function addMsg(msg, who) {
  const box = document.getElementById("messages");
  box.innerHTML += `
    <div class="msg ${who}">
      ${who === 'bot' ? '<div class="bot-icon">🤖</div>' : ''}
      <div>
        <div class="bubble">${msg}</div>
        <div class="timestamp">${time()}</div>
      </div>
    </div>`;
  box.scrollTop = box.scrollHeight;
}

function reply(text) {
  text = text.toLowerCase();

  for (let item of Object.values(data)) {
    if (item.keys.some(k => text.includes(k))) {
      return card(item.rows);
    }
  }

  if (text.includes("hi") || text.includes("hello")) return "Hello 👋 Welcome to HR Support!";
  if (text.includes("bye")) return "Goodbye 👋 Have a great day!";
  if (text.includes("thank")) return "You're welcome 😊";

  return "Please contact HR Portal for more details.";
}

function sendMsg() {
  const input = document.getElementById("userInput");
  const msg = input.value.trim();
  if (!msg) return;

  addMsg(msg, "user");
  input.value = "";

  setTimeout(() => addMsg(reply(msg), "bot"), 500);
}
