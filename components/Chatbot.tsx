"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const FAQ_QUESTIONS = [
  "How does Mahfil help vendors find customers?",
  "What AI features are available for vendors?",
  "How does the AI assistant boost sales?",
  "What analytics do vendors get access to?",
  "How do I get started as a vendor on Mahfil?",
  "What types of cultural events does Mahfil support?",
  "How does AI-powered customer matching work?",
  "What support do vendors receive?",
  "How can I optimize my vendor profile?",
  "What are the benefits for cultural event vendors?",
  "How does Mahfil handle cultural event planning?",
  "What makes Mahfil different from other platforms?"
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your Mahfil AI assistant. I can help you with event planning, vendor matching, and cultural events. How can I assist you today?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendedQuestions, setRecommendedQuestions] = useState<string[]>([]);
  const [showRecommendedQuestions, setShowRecommendedQuestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate random recommended questions
  useEffect(() => {
    const shuffled = [...FAQ_QUESTIONS].sort(() => 0.5 - Math.random());
    setRecommendedQuestions(shuffled.slice(0, 3));
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleQuestionClick = (question: string) => {
    setInputMessage(question);
    inputRef.current?.focus();
  };

  const handleCloseRecommendedQuestions = () => {
    setShowRecommendedQuestions(false);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputMessage }),
      });

      const data = await response.json();

      if (response.ok) {
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: data.response,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          text: 'Sorry, I encountered an error. Please try again.',
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Sorry, I encountered an error. Please try again.',
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Desktop Chat Widget */}
      <div className="hidden md:block fixed bottom-6 right-6 z-50">
        {/* Chat Button */}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-3xl"
            style={{
              background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)',
              boxShadow: '0 20px 40px rgba(196, 170, 217, 0.3)'
            }}
          >
            <MessageCircle className="w-7 h-7 text-white mx-auto" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
            <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        )}

        {/* Chat Window */}
        {isOpen && (
          <div className="relative">
            <div 
              className={`bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-300 flex flex-col ${
                isMinimized ? 'w-80 h-16' : 'w-96 h-[500px]'
              }`}
              style={{
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                backdropFilter: 'blur(10px)'
              }}
            >
              {/* Header */}
              <div 
                className="relative p-4 border-b border-gray-100"
                style={{
                  background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Mahfil Assistant</h3>
                      <p className="text-white/80 text-sm">AI-Powered Event Help</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="text-white/80 hover:text-white transition-colors p-1"
                    >
                      {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => setIsOpen(false)}
                      className="text-white/80 hover:text-white transition-colors p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Messages */}
              {!isMinimized && (
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                          message.isUser
                            ? 'bg-green-600 text-white'
                            : 'bg-white text-gray-800 border border-gray-100'
                        }`}
                        style={{
                          boxShadow: message.isUser 
                            ? '0 4px 12px rgba(22, 163, 74, 0.3)' 
                            : '0 2px 8px rgba(0, 0, 0, 0.08)'
                        }}
                      >
                        <div className="flex items-start space-x-2">
                          {!message.isUser && (
                            <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-1">
                              <Bot className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-sm leading-relaxed">{message.text}</p>
                            <p className="text-xs opacity-60 mt-2">
                              {message.timestamp.toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                          {message.isUser && (
                            <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                              <User className="w-3 h-3 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white text-gray-800 max-w-xs px-4 py-3 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}

                             {/* Recommended Questions */}
               {!isMinimized && messages.length === 1 && showRecommendedQuestions && (
                 <div className="px-4 py-3 border-t border-gray-100 bg-gray-50 flex-shrink-0">
                   <div className="flex items-center justify-between mb-3">
                     <p className="text-xs text-gray-600 font-medium">💡 Quick Questions:</p>
                     <button
                       onClick={handleCloseRecommendedQuestions}
                       className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                     >
                       <X className="w-3 h-3" />
                     </button>
                   </div>
                   <div className="space-y-2">
                     {recommendedQuestions.map((question, index) => (
                       <button
                         key={index}
                         onClick={() => handleQuestionClick(question)}
                         className="w-full text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-xs text-gray-700 hover:text-gray-900"
                       >
                         {question}
                       </button>
                     ))}
                   </div>
                 </div>
               )}

              {/* Input */}
              {!isMinimized && (
                <div className="p-4 border-t border-gray-100 bg-white flex-shrink-0">
                  <div className="flex space-x-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all text-sm"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isLoading}
                      className="px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105"
                      style={{
                        background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)'
                      }}
                    >
                      <Send className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Chat Widget */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-16 h-16 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110"
          style={{
            background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)',
            boxShadow: '0 20px 40px rgba(196, 170, 217, 0.3)'
          }}
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white mx-auto" />
          ) : (
            <MessageCircle className="w-7 h-7 text-white mx-auto" />
          )}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </button>

        {/* Mobile Chat Window */}
        {isOpen && (
          <div className="fixed inset-0 bg-black/50 z-40">
            <div className="absolute bottom-0 left-4 right-4 h-[85vh] bg-white rounded-t-3xl shadow-2xl flex flex-col">
              {/* Header */}
              <div 
                className="p-4 border-b border-gray-100 rounded-t-3xl flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)'
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg">Mahfil Assistant</h3>
                      <p className="text-white/80 text-sm">AI-Powered Event Help</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-white/80 hover:text-white transition-colors p-2"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 min-h-0">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] px-4 py-3 rounded-2xl shadow-sm ${
                        message.isUser
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-gray-800 border border-gray-200'
                      }`}
                      style={{
                        boxShadow: message.isUser 
                          ? '0 4px 12px rgba(22, 163, 74, 0.3)' 
                          : '0 2px 8px rgba(0, 0, 0, 0.08)'
                      }}
                    >
                      <div className="flex items-start space-x-2">
                        {!message.isUser && (
                          <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0 mt-1">
                            <Bot className="w-3 h-3 text-white" />
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm leading-relaxed">{message.text}</p>
                          <p className="text-xs opacity-60 mt-2">
                            {message.timestamp.toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </p>
                        </div>
                        {message.isUser && (
                          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                            <User className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white text-gray-800 max-w-[80%] px-4 py-3 rounded-2xl border border-gray-200 shadow-sm">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                          <Bot className="w-3 h-3 text-white" />
                        </div>
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

                             {/* Recommended Questions */}
               {messages.length === 1 && showRecommendedQuestions && (
                 <div className="px-4 py-3 border-t border-gray-200 bg-gray-50 flex-shrink-0">
                   <div className="flex items-center justify-between mb-3">
                     <p className="text-xs text-gray-600 font-medium">💡 Quick Questions:</p>
                     <button
                       onClick={handleCloseRecommendedQuestions}
                       className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                     >
                       <X className="w-3 h-3" />
                     </button>
                   </div>
                   <div className="space-y-2">
                     {recommendedQuestions.map((question, index) => (
                       <button
                         key={index}
                         onClick={() => handleQuestionClick(question)}
                         className="w-full text-left p-3 rounded-lg bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all text-xs text-gray-700 hover:text-gray-900"
                       >
                         {question}
                       </button>
                     ))}
                   </div>
                 </div>
               )}

              {/* Input */}
              <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                <div className="flex space-x-3">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-200 focus:border-green-400 transition-all text-sm"
                    disabled={isLoading}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputMessage.trim() || isLoading}
                    className="px-4 py-3 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105"
                    style={{
                      background: 'linear-gradient(135deg, #C4AAD9 0%, #9CAE89 50%, #E8B4B4 100%)'
                    }}
                  >
                    <Send className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
} 