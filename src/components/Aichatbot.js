import React, { useState, useContext, useEffect } from "react";
import NoteContext from "../context/notes/noteContext";
import AuthContext from "../context/authentication/authContext";
import axios from "axios";

const AIChatbot = () => {
  const { notes } = useContext(NoteContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [messages, setMessages] = useState(() => {
    // 1. Initialize messages from localStorage or with default bot message
    const savedMessages = localStorage.getItem("chatbotMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [{ sender: "bot", text: "Hi! Ask me anything from your notes or general knowledge." }];
  });
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const cohereApiKey = process.env.REACT_APP_COHERE_API_KEY;

  // 2. Save messages to localStorage whenever the messages state changes
  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
  }, [messages]);


  if (!isAuthenticated) {
    return (
      <div className="card shadow mt-4">
        <div className="card-header bg-warning text-dark">
          <i className="fas fa-lock me-2"></i>AI Assistant (Restricted)
        </div>
        <div className="card-body p-3">
          <p className="text-danger">Please log in to use the AI chatbot.</p>
        </div>
      </div>
    );
  }

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!isAuthenticated) {
      setMessages(prev => [...prev, { sender: "bot", text: "Please log in to use the AI assistant." }]);
      return;
    }

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    setInput("");

    const notesText = notes.map((note, i) =>
      `Note ${i + 1}: ${note.title} - ${note.description}`
    ).join("\n");

    const fullPrompt = `
You are a helpful assistant. Use these notes if possible to answer:

${notesText}

User question: "${input}"

If the answer isn't in the notes, give a general response.
`;

    try {
      const response = await axios.post(
        "https://api.cohere.ai/v1/chat",
        {
          message: fullPrompt,
          model: "command-r-plus",
          temperature: 0.5,
        },
        {
          headers: {
            Authorization: `Bearer ${cohereApiKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      const reply = response.data.text;
      setMessages((prev) => [...prev, { sender: "bot", text: reply.trim() }]);
    } catch (err) {
      console.error("Cohere error:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-primary text-white">
        <i className="fas fa-robot me-2"></i>AI Assistant
      </div>
      <div className="card-body p-3" style={{ maxHeight: "300px", overflowY: "auto" }}>
        {messages.map((m, i) => (
          <div key={i} className={`mb-2 text-${m.sender === "user" ? "end" : "start"}`}>
            <span className={`d-inline-block p-2 rounded ${m.sender === "user" ? "bg-info text-white" : "bg-light border"}`}>
              {m.text}
            </span>
          </div>
        ))}
        {loading && <div className="text-muted">Thinking...</div>}
      </div>
      <div className="card-footer p-2 d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button className="btn btn-primary" onClick={handleSend} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;