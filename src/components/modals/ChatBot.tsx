// import { useState } from 'react';

// export default function ChatbotModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
//   const [messages, setMessages] = useState([
//     { role: 'bot', text: 'Hi! Ask me anything about the system.' }
//   ]);
//   const [input, setInput] = useState('');

//   const handleSend = () => {
//     if (!input.trim()) return;

//     setMessages([...messages, { role: 'user', text: input }]);
//     setInput('');

//     // Dummy bot reply
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { role: 'bot', text: 'I will answer that shortly!' }]);
//     }, 1000);
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed bottom-4 right-4 w-96 h-[400px] bg-white rounded-lg shadow-lg border border-gray-300 flex flex-col z-50">
//       <div className="flex items-center justify-between px-4 py-2 border-b">
//         <h2 className="text-base font-semibold">💬 CleanRide Chat Assistant</h2>
//         <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-lg">×</button>
//       </div>

//       <div className="flex-1 overflow-y-auto p-3 bg-gray-50">
//         {messages.map((msg, idx) => (
//           <div key={idx} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
//             <span className={`inline-block px-3 py-2 rounded text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'}`}>
//               {msg.text}
//             </span>
//           </div>
//         ))}
//       </div>

//       <div className="p-3 border-t flex items-center gap-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           onKeyDown={(e) => e.key === 'Enter' && handleSend()}
//           placeholder="Type a message..."
//           className="flex-1 border rounded px-3 py-2 text-sm"
//         />
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700 text-sm"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// }
