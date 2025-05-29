import { useRef, useEffect, useState } from "react";

export default function Demo2_AutoFocusInput() {
  const inputRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      setMessages([...messages, text]);
      setText("");
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">Demo 2: useRef – Chat box auto focus</h5>
      <div className="mb-3" style={{ maxHeight: "150px", overflowY: "auto" }}>
        <ul className="list-group">
          {messages.map((msg, i) => (
            <li key={i} className="list-group-item">{msg}</li>
          ))}
        </ul>
      </div>
      <input
        ref={inputRef}
        type="text"
        className="form-control"
        placeholder="Gõ tin nhắn và Enter"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
