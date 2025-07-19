import React, { useState, useContext, useEffect, useRef } from "react";
import NoteContext from "../context/notes/noteContext";
import AuthContext from "../context/authentication/authContext";
import axios from "axios";

const AIChatbot = () => {
  const { notes } = useContext(NoteContext);
  const { isAuthenticated } = useContext(AuthContext);
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem("chatbotMessages");
    return savedMessages
      ? JSON.parse(savedMessages)
      : [{ sender: "bot", text: "Hi! Ask me anything from your notes or general knowledge." }];
  });

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef(null);
  const cohereApiKey = process.env.REACT_APP_COHERE_API_KEY;

  useEffect(() => {
    localStorage.setItem("chatbotMessages", JSON.stringify(messages));
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
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
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { sender: "user", text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    const notesText = notes.map((note, i) =>
      `Note ${i + 1}: ${note.title} - ${note.description}`
    ).join("\n");

    const fullPrompt = `
You are a helpful assistant. Use these notes if possible to answer:

${notesText}

User question: "${trimmed}"

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

      const reply = response.data.text || "I'm not sure, but I'll try to help.";
      setMessages((prev) => [...prev, { sender: "bot", text: reply.trim() }]);
    } catch (err) {
      console.error("Cohere error:", err);
      setMessages((prev) => [...prev, { sender: "bot", text: "Sorry, something went wrong." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="card-header bg-primary text-white text-center">
        <i className="fas fa-robot me-2"></i>AI Assistant
      </div>

      
      <div className="p-3 border-bottom bg-light small text-muted">
        <p className="mb-1">
          🤖 <strong>Meet Notify's AI Assistant</strong> — your smart helper to quickly find answers from your saved notes or ask general knowledge questions.
        </p>
        <p className="mb-0">Start by typing a question like <em>"What's in my math note?"</em> or <em>"Who is Einstein?"</em></p>
      </div>

      <div className="chat-body" ref={chatBodyRef}>
        {messages.map((m, i) => (
          <div key={i} className={`d-flex ${m.sender === "user" ? "justify-content-end" : "justify-content-start"} mb-2`}>
            <div className={`p-2 rounded ${m.sender === "user" ? "bg-info text-white" : "bg-light border"}`}>
              {m.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="d-flex justify-content-start text-muted small">Thinking...</div>
        )}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          className="form-control"
          placeholder="Ask a question..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          disabled={loading}
        />
        <button
          className="btn btn-primary"
          onClick={handleSend}
          disabled={loading || !input.trim()}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default AIChatbot;
