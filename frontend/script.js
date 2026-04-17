async function sendMessage(event) {
    event.preventDefault();

    let input = document.getElementById("userInput");
    let message = input.value;

    if (!message) return;

    addMessage("You", message);

        const response = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: message })
    });

    const data = await response.json();

    addMessage("Bot", data.response);

    input.value = "";
}

function addMessage(sender, text) {
    let chatWindow = document.getElementById("chatWindow");

    let div = document.createElement("div");
    div.innerHTML = `<strong>${sender}:</strong> ${text}`;

    chatWindow.appendChild(div);
}
