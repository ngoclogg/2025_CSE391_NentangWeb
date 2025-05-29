import { useState } from "react";

export default function Demo1_InputRealtime() {
  const [text, setText] = useState("");

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h5 className="card-title">Demo 1: useState – Gõ gì hiện nấy</h5>
      <input
        type="text"
        className="form-control mb-3"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập nội dung..."
      />
      <p className="result-text">
        <strong>Kết quả:</strong> {text || <em>(chưa có nội dung)</em>}
      </p>
    </div>
  );
}
