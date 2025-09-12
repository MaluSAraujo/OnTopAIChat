const { useState, useEffect, useRef } = React;

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // 🔽 sempre rola pro fim quando chega mensagem nova
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function handleSendMessage() {
    if (!input.trim()) return;

    // adiciona a mensagem do usuário
    const userMessage = { sender: "Você", text: input, type: "user" };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=SUA_API_KEY_AQUI",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: input }] }],
          }),
        }
      );

      const data = await response.json();
      console.log("Resposta da API:", data);

      const reply =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Não entendi, pode repetir?";

      const botMessage = { sender: "Gemini", text: reply, type: "gemini" };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Erro na API:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "Gemini", text: "⚠️ Erro na conexão com a API.", type: "gemini" },
      ]);
    }

    setInput("");
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleSendMessage();
  }

  return (
    <div id="chat-container">
      <div id="messages">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.type}`}>
            <b>{m.sender}:</b> {m.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div id="input-area">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Digite sua mensagem..."
        />
        <button onClick={handleSendMessage}>Enviar</button>
      </div>
    </div>
  );
}

// 🔽 Monta o app no <div id="root">
ReactDOM.createRoot(document.getElementById("root")).render(<ChatInterface />);
