import React, { useState, useRef, useEffect } from 'react';
import { BsChatDotsFill } from "react-icons/bs";
import { IoClose, IoSend } from "react-icons/io5";
import { MdPalette } from "react-icons/md";

const THEMES = [
    { name: 'WhatsApp', bg: '#e5ddd5', bubbleMe: '#dcf8c6', bubbleOther: '#ffffff', header: '#075e54' },
    { name: 'Messenger', bg: '#ffffff', bubbleMe: '#0084ff', bubbleOther: '#f0f0f0', header: '#0084ff', textMe: '#ffffff' },
    { name: 'Dark', bg: '#101820', bubbleMe: '#2563eb', bubbleOther: '#1f2937', header: '#0b1220', textMe: '#ffffff', textOther: '#e5e7eb' },
    { name: 'Law.BD Green', bg: '#f3f7f4', bubbleMe: '#166534', bubbleOther: '#ffffff', header: '#14532d', textMe: '#ffffff' },
    { name: 'Sky', bg: '#eaf6ff', bubbleMe: '#0ea5e9', bubbleOther: '#ffffff', header: '#0369a1', textMe: '#ffffff' },
];

// n8n AI Agent webhook URL
const N8N_WEBHOOK_URL = 'https://zannat4166.app.n8n.cloud/webhook/9e4e6c23-68ff-473e-b2c3-7edf0a4b7a66/chat';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showThemePicker, setShowThemePicker] = useState(false);
    const [theme, setTheme] = useState(THEMES[0]);
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, from: 'them', text: "Hi! I'm the Law.BD support assistant. Ask me about fees, booking, or anything else 🙂" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    // One sessionId per browser tab visit, so the AI remembers this conversation
    const sessionIdRef = useRef(
        (crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + Math.random().toString(36).slice(2))
    );

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping, isOpen]);

    const handleSend = async () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        const userMsg = { id: Date.now(), from: 'me', text: trimmed };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch(N8N_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'sendMessage',
                    sessionId: sessionIdRef.current,
                    chatInput: trimmed,
                }),
            });

            if (!response.ok) throw new Error('Request failed');

            const data = await response.json();

            // n8n's AI Agent usually returns { output: "..." }, but we check a few
            // possible keys in case the workflow's response shape is different.
            const replyText =
                data.output || data.text || data.reply || data.message ||
                "Sorry, I couldn't understand that. Could you rephrase?";

            setMessages(prev => [...prev, { id: Date.now() + 1, from: 'them', text: replyText }]);
        } catch (err) {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                from: 'them',
                text: "Sorry, I'm having trouble connecting right now. Please try again in a moment."
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[999] flex flex-col items-end">

            {/* Chat Window */}
            {isOpen && (
                <div
                    className="mb-3 w-[90vw] max-w-[340px] sm:w-[350px] h-[65vh] sm:h-[480px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200"
                    style={{ backgroundColor: theme.bg }}
                >
                    {/* Header */}
                    <div
                        className="flex items-center justify-between px-4 py-3 relative"
                        style={{ backgroundColor: theme.header }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                                L
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm leading-tight">Law.BD Support</p>
                                <p className="text-white/80 text-xs flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full bg-green-400 inline-block"></span>
                                    Online
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-1">
                            <button
                                onClick={() => setShowThemePicker(!showThemePicker)}
                                className="text-white/90 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
                                aria-label="Change background"
                            >
                                <MdPalette size={18} />
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-white/90 hover:text-white p-1.5 rounded-full hover:bg-white/10 transition"
                                aria-label="Close chat"
                            >
                                <IoClose size={20} />
                            </button>
                        </div>

                        {/* Theme picker dropdown */}
                        {showThemePicker && (
                            <div className="absolute top-14 right-3 bg-white rounded-xl shadow-lg p-3 w-48 z-10">
                                <p className="text-xs font-semibold text-gray-500 mb-2">Chat background</p>
                                <div className="grid grid-cols-3 gap-2">
                                    {THEMES.map((t) => (
                                        <button
                                            key={t.name}
                                            onClick={() => { setTheme(t); setShowThemePicker(false); }}
                                            className={`h-9 rounded-lg border-2 transition ${theme.name === t.name ? 'border-gray-800' : 'border-transparent'}`}
                                            style={{ backgroundColor: t.bg }}
                                            title={t.name}
                                        ></button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
                        {messages.map(msg => (
                            <div key={msg.id} className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                                <div
                                    className="max-w-[75%] px-3 py-2 rounded-2xl text-sm shadow-sm whitespace-pre-wrap"
                                    style={{
                                        backgroundColor: msg.from === 'me' ? theme.bubbleMe : theme.bubbleOther,
                                        color: msg.from === 'me' ? (theme.textMe || '#111827') : (theme.textOther || '#111827'),
                                        borderBottomRightRadius: msg.from === 'me' ? '4px' : '16px',
                                        borderBottomLeftRadius: msg.from === 'me' ? '16px' : '4px',
                                    }}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div
                                    className="px-3 py-2 rounded-2xl text-sm shadow-sm flex gap-1"
                                    style={{ backgroundColor: theme.bubbleOther }}
                                >
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 p-2.5 bg-white border-t border-gray-200">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type a message..."
                            disabled={isTyping}
                            className="flex-1 px-3 py-2 text-sm rounded-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-gray-400 disabled:opacity-60"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isTyping}
                            className="w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-white transition disabled:opacity-60"
                            style={{ backgroundColor: theme.header }}
                        >
                            <IoSend size={16} />
                        </button>
                    </div>
                </div>
            )}

            {/* Floating toggle button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-14 h-14 rounded-full bg-green-700 hover:bg-green-800 text-white flex items-center justify-center shadow-lg transition"
                aria-label="Toggle chat"
            >
                {isOpen ? <IoClose size={26} /> : <BsChatDotsFill size={24} />}
            </button>
        </div>
    );
};

export default ChatWidget;