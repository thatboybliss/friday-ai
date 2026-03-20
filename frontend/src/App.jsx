import { useState } from "react";

export default function App() {
  const [msg,setMsg]=useState("");
  const [out,setOut]=useState("");

  const send=()=>{
    const ws=new WebSocket("ws://localhost:8080/ws");
    ws.onopen=()=>ws.send(msg);
    ws.onmessage=e=>setOut(p=>p+e.data);
  };

  return (
    <div>
      <h1>Friday AI</h1>
      <input onChange={e=>setMsg(e.target.value)} />
      <button onClick={send}>Send</button>
      <pre>{out}</pre>
    </div>
  );
}
