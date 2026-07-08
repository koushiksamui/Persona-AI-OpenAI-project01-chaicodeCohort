// "use client";

// import axios from "axios";
// import { useState } from "react";

// type Message = {
//   role: "user" | "system" | "assistant";
//   content: string;
// }

// export default function Home() {
//   const [input, setInput] = useState("");
//   const [messages, setMessage] = useState<Message[]>([
//     {
//       role: "assistant",
//       content: "Hi! I am persona AI. Ask me anything"
//     }
//   ]);
//   const [loading, setLoading] = useState(false);

//   const sendMessage = async () =>{
//     const trimmed = input.trim();
//     if(!trimmed || loading){
//       return;
//     }
//     const userMessage: Message = {
//       role: "user",
//       content: trimmed
//     };
//     const updateMessages = [...messages, userMessage];
//     setMessage(updateMessages);
//     setInput("");
//     setLoading(true);
//     try {
//       const res = await axios.post("/api/chat", {
//         messages: updateMessages,
//       });
//       const data = await res.data;
//       setMessage([...updateMessages, { role: "assistant", content: data.result }]);
//     } catch (error) {
//       setMessage([...updateMessages, { role: "assistant", content: "Failed to get response from server" }]);
//       console.error(error);
//     }finally{
//       setLoading(false);
//     }
//   }

//   return (
//     <main className="mx-auto flex min-h-screen max-w-3xl flex-col p-6">
//       <h1 className="mb-6 text-3xl font-bold">Persona AI</h1>

//       <div className="flex-1 space-y-4 rounded-lg border p-4">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`max-w-[85%] rounded-lg px-4 py-3 ${
//               msg.role === "user"
//                 ? "ml-auto bg-blue-600 text-white"
//                 : "bg-gray-100 text-gray-900"
//             }`}
//           >
//             {msg.content}
//           </div>
//         ))}

//         {loading && (
//           <div className="max-w-[85%] rounded-lg bg-gray-100 px-4 py-3 text-gray-500">
//             Thinking...
//           </div>
//         )}
//       </div>

//       <div className="mt-4 flex gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => {
//             if (e.key === "Enter") sendMessage();
//           }}
//           placeholder="Type your message..."
//           className="flex-1 rounded-lg border px-4 py-3 outline-none"
//         />
//         <button
//           onClick={sendMessage}
//           className="rounded-lg bg-blue-600 px-5 py-3 text-white"
//         >
//           Send
//         </button>
//       </div>
//     </main>
//   );
// }

"use client";

import { useState } from "react";
import { PERSONAS, type PersonaKey } from "../lib/personas";
import axios from "axios";
type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [input, setInput] = useState("");
  const [persona, setPersona] = useState<PersonaKey>("hitesh");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! Select a persona and start chatting.",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading) {
      return;
    }

    const userMessage: Message = {
      role: "user",
      content: trimmed,
    };
    const updatedMessages = [...messages, userMessage];

    setInput("");
    setMessages(updatedMessages);
    setLoading(true);

    try {
      const res = await axios.post("/api/chat", {
        message: userMessage,
        oldMessages: updatedMessages,
        persona: persona,
      });
      const data = await res.data;
      setMessages([...updatedMessages, { role: "assistant", content: data.result }]);
    } catch (error) {
      setMessages([
        ...updatedMessages,
        { role: "assistant", content: "Failed to get response from server" },
      ]);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const switchPersona = (nextPersona: PersonaKey) => {
    setPersona(nextPersona);
    setMessages([
      {
        role: "assistant",
        content: `Switched to ${PERSONAS[nextPersona].name}. Ask your next question.`,
      },
    ]);
  };

  return (
    <main className="mx-auto flex min-h-screen w-[80vw] flex-col p-6">
      <h1 className="mb-2 text-3xl font-bold">Persona AI</h1>
      <p className="mb-6 text-sm text-gray-500">
        AI persona demo inspired by public teaching styles.
      </p>

      <div className="mb-4 flex gap-3">
        <button
          onClick={() => switchPersona("hitesh")}
          className={`rounded-lg px-4 py-2 ${
            persona === "hitesh"
              ? "bg-gray-200 text-black"
              : "bg-black text-white"
          }`}
        >
          Hitesh Choudhary
        </button>

        <button
          onClick={() => switchPersona("piyush")}
          className={`rounded-lg px-4 py-2 ${
            persona === "piyush"
              ? "bg-gray-200 text-black"
              : "bg-black text-white"
          }`}
        >
          Piyush Garg
        </button>
      </div>

      <div className="mb-4 rounded-lg border p-3 text-sm text-gray-600">
        Active persona: <span className="font-semibold">{PERSONAS[persona].name}</span>
      </div>

      <div className="flex-1 space-y-4 rounded-lg border p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`max-w-[85%] rounded-lg px-4 py-3 ${
              msg.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div className="max-w-[85%] rounded-lg bg-gray-100 px-4 py-3 text-gray-500">
            Thinking...
          </div>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          placeholder="Type your message..."
          className="flex-1 rounded-lg border px-4 py-3 outline-none"
        />
        <button
          onClick={sendMessage}
          className="rounded-lg bg-white px-5 py-3 text-black"
        >
          Send
        </button>
      </div>
    </main>
  );
}