import { useState, useRef, useEffect } from "react";
import { sendMessageToAI, WELCOME_MESSAGE } from "./services/aiService";

export default function FitnessChatbot() {
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    const userText = input.trim();
    if (!userText || loading) return;

    const newMessages = [...messages, { role: "user", content: userText }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const reply = await sendMessageToAI(newMessages);
      setMessages([...newMessages, { role: "assistant", content: reply }]);
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: error.message || "Signal lost. Check your connection and try again.",
        },
      ]);
    } finally {
      setLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatMessage = (text) =>
    text
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      .replace(/\n/g, "<br/>");

  const quickPrompts = [
    "🏋️ Best chest exercises",
    "🦵 Leg day program",
    "🏃 Running tips",
    "💪 Build bigger arms",
    "📋 Beginner split",
    "🍗 Protein intake",
  ];

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        background: "#0e0e0e",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "'Georgia', serif",
        padding: "40px 20px",
        position: "fixed",
        top: 0,
        left: 0,
        overflow: "auto",
      }}
    >
      {/* Background texture / grid */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          backgroundImage: `
          linear-gradient(rgba(255,80,0,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,80,0,0.03) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Glow orbs */}
      <div
        style={{
          position: "fixed",
          top: "-120px",
          right: "-120px",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(220,60,0,0.12) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-100px",
          left: "-100px",
          width: "350px",
          height: "350px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(180,30,0,0.08) 0%, transparent 70%)",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:ital,wght@0,400;0,600;1,400&display=swap');
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        @keyframes barPulse {
          0%, 100% { transform: scaleX(0.6); opacity: 0.4; }
          50% { transform: scaleX(1); opacity: 1; }
        }
        .msg-in { animation: fadeSlideUp 0.3s ease forwards; }
        .send-btn:hover:not(:disabled) { background: #e05000 !important; }
        .send-btn:active:not(:disabled) { transform: scale(0.96); }
        .quick-btn:hover { background: rgba(255,80,0,0.15) !important; border-color: rgba(255,80,0,0.5) !important; color: #ff8040 !important; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,80,0,0.3); border-radius: 2px; }
        textarea:focus { outline: none !important; border-color: rgba(255,80,0,0.5) !important; box-shadow: 0 0 0 2px rgba(255,80,0,0.08) !important; }
      `}</style>

      {/* Header */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          marginBottom: "32px",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        <div
          style={{
            width: "72px",
            height: "72px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #8b0000, #cc3300)",
            margin: "0 auto 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "32px",
            boxShadow:
              "0 0 0 3px rgba(200,50,0,0.3), 0 8px 30px rgba(200,50,0,0.25)",
          }}
        >
          🏋️
        </div>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(36px, 7vw, 58px)",
            fontFamily: "'Bebas Neue', 'Impact', sans-serif",
            color: "#f0f0f0",
            letterSpacing: "0.08em",
            lineHeight: 1,
          }}
        >
          THE PROFESSOR
        </h1>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            marginTop: "8px",
          }}
        >
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "linear-gradient(to right, transparent, #c03000)",
            }}
          />
          <p
            style={{
              margin: 0,
              color: "#c03000",
              fontSize: "11px",
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              fontFamily: "'Barlow', sans-serif",
              fontWeight: 600,
            }}
          >
            Elite Fitness Coach & Sports Scientist
          </p>
          <div
            style={{
              height: "1px",
              width: "40px",
              background: "linear-gradient(to left, transparent, #c03000)",
            }}
          />
        </div>
      </div>

      {/* Chat window */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "700px",
          background: "rgba(15,15,15,0.95)",
          border: "none",
          borderRadius: "4px",
          overflow: "hidden",
          boxShadow:
            "0 40px 100px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.03)",
          display: "flex",
          flexDirection: "column",
          height: "clamp(480px, 68vh, 660px)",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            padding: "10px 18px",
            borderBottom: "1px solid rgba(255,60,0,0.1)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,60,0,0.04)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#c03000",
              boxShadow: "0 0 6px #c03000",
            }}
          />
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "11px",
              fontFamily: "monospace",
              letterSpacing: "0.15em",
            }}
          >
            SESSION ACTIVE · MEMORY ON
          </span>
        </div>

        {/* Messages */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "18px",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              className='msg-in'
              style={{
                display: "flex",
                justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                alignItems: "flex-start",
                gap: "10px",
              }}
            >
              {msg.role === "assistant" && (
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "3px",
                    background: "linear-gradient(135deg, #7a0000, #cc2200)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "16px",
                    flexShrink: 0,
                    marginTop: "1px",
                    boxShadow: "0 2px 10px rgba(180,30,0,0.4)",
                  }}
                >
                  💪
                </div>
              )}
              <div
                style={{
                  maxWidth: "82%",
                  padding: "12px 16px",
                  borderRadius:
                    msg.role === "user" ? "4px 4px 0 4px" : "0 4px 4px 4px",
                  background:
                    msg.role === "user"
                      ? "linear-gradient(135deg, #7a1500, #a82000)"
                      : "rgba(255,255,255,0.04)",
                  border:
                    msg.role === "user"
                      ? "1px solid rgba(200,40,0,0.4)"
                      : "1px solid rgba(255,255,255,0.06)",
                  color: msg.role === "user" ? "#ffd5c0" : "#d8d8d8",
                  fontSize: "14.5px",
                  lineHeight: "1.7",
                  fontFamily:
                    msg.role === "assistant"
                      ? "'Barlow', Georgia, serif"
                      : "'Barlow', sans-serif",
                }}
                dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
              />
            </div>
          ))}

          {loading && (
            <div
              className='msg-in'
              style={{ display: "flex", alignItems: "center", gap: "10px" }}
            >
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "3px",
                  background: "linear-gradient(135deg, #7a0000, #cc2200)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "16px",
                  boxShadow: "0 2px 10px rgba(180,30,0,0.4)",
                }}
              >
                💪
              </div>
              <div
                style={{
                  padding: "12px 18px",
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "0 4px 4px 4px",
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                }}
              >
                {[0, 0.18, 0.36].map((d, i) => (
                  <div
                    key={i}
                    style={{
                      width: "14px",
                      height: "3px",
                      borderRadius: "2px",
                      background: "#c03000",
                      animation: "barPulse 1s ease-in-out infinite",
                      animationDelay: `${d}s`,
                      transformOrigin: "left",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick prompts */}
        {messages.length <= 1 && (
          <div
            style={{
              padding: "0 20px 12px",
              display: "flex",
              gap: "7px",
              flexWrap: "wrap",
            }}
          >
            {quickPrompts.map((p) => (
              <button
                key={p}
                className='quick-btn'
                onClick={() => {
                  setInput(p.replace(/^.{2}\s/, ""));
                  inputRef.current?.focus();
                }}
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,60,0,0.2)",
                  color: "rgba(220,180,160,0.7)",
                  padding: "5px 12px",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontSize: "12px",
                  fontFamily: "'Barlow', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  transition: "all 0.18s",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div
          style={{
            padding: "14px 16px",
            borderTop: "1px solid rgba(255,60,0,0.1)",
            display: "flex",
            gap: "10px",
            alignItems: "flex-end",
            background: "rgba(0,0,0,0.3)",
          }}
        >
          <textarea
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder='Ask about exercises, muscle groups, programming, nutrition...'
            rows={1}
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "3px",
              padding: "10px 14px",
              color: "#e8e8e8",
              fontSize: "14px",
              fontFamily: "'Barlow', sans-serif",
              resize: "none",
              transition: "border-color 0.2s, box-shadow 0.2s",
              lineHeight: "1.5",
              maxHeight: "100px",
              overflowY: "auto",
            }}
            onInput={(e) => {
              e.target.style.height = "auto";
              e.target.style.height =
                Math.min(e.target.scrollHeight, 100) + "px";
            }}
          />
          <button
            className='send-btn'
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            style={{
              background:
                input.trim() && !loading ? "#c03000" : "rgba(255,255,255,0.06)",
              border: "none",
              borderRadius: "3px",
              width: "44px",
              height: "44px",
              cursor: input.trim() && !loading ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              transition: "all 0.18s",
              flexShrink: 0,
              boxShadow:
                input.trim() && !loading
                  ? "0 4px 15px rgba(180,40,0,0.3)"
                  : "none",
            }}
          >
            {loading ? "⏳" : "🏋️"}
          </button>
        </div>
      </div>

      {/* Footer */}
      <p
        style={{
          position: "relative",
          zIndex: 1,
          marginTop: "20px",
          color: "rgba(255,255,255,0.12)",
          fontSize: "11px",
          fontFamily: "'Barlow', sans-serif",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          textAlign: "center",
          width: "100%",
          maxWidth: "700px",
        }}
      >
        Powered by Claude · No excuses · Press Enter to send
      </p>
    </div>
  );
}
