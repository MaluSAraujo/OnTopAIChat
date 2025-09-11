const { useState, useRef, useEffect } = React;

// Função para usar ícones Lucide (SVG strings via CDN)
function Icon({ name, className }) {
  const icon = lucide.icons[name];
  if (!icon) return null;
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
}

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content:
        "Olá, eu sou o OnTop AI Chat. Posso ajudar com relatórios internos, consultas de banco de dados e informações dos departamentos. Disponível em EN/PT/ES. Como posso ajudar?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("PT");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        "📊 Último relatório de vendas mostra crescimento de 15% no Q3.",
        "👥 Atualmente temos 1.247 colaboradores ativos distribuídos em 8 departamentos.",
        "📈 A taxa de turnover está em 8,2%, abaixo da média do setor.",
      ];
      const assistantMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const quickQuestions = [
    "Mostrar último relatório de vendas",
    "Quantos colaboradores ativos temos?",
    "Mostrar métricas de performance Q3",
    "Listar tabelas do banco de dados",
  ];

  const conversations = [
    "Q3 2024 Global Reports",
    "Database User Queries",
    "Sales Analysis September",
    "HR Monthly Metrics",
    "Financial Dashboard Review",
  ];

  const languages = [
    { code: "EN", name: "English", flag: "🇺🇸" },
    { code: "PT", name: "Português", flag: "🇧🇷" },
    { code: "ES", name: "Español", flag: "🇪🇸" },
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div className={`bg-gradient-to-b from-slate-900 via-slate-800 to-purple-900 text-white transition-all ${sidebarOpen ? "w-64" : "w-0"} overflow-hidden`}>
        <div className="p-4 relative h-full">
          {/* Logo + Title */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <img src="assets/logo.png" alt="OnTop Logo" className="h-8 mb-2" />
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                OnTop AI Chat
              </h1>
              <p className="text-xs text-gray-400">Corporate Intelligence</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-700 rounded">
              <Icon name="Menu" className="w-5 h-5" />
            </button>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
              <Icon name="Globe" className="w-4 h-4 mr-2" />
              LANGUAGE
            </h3>
            <div className="grid grid-cols-3 gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-2 rounded-lg text-xs transition-all ${
                    selectedLanguage === lang.code
                      ? "bg-purple-600 text-white"
                      : "bg-slate-700 hover:bg-slate-600 text-gray-300"
                  }`}
                >
                  <div className="text-center">
                    <div className="text-sm mb-1">{lang.flag}</div>
                    <div>{lang.code}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">QUICK ACCESS</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Icon name="FileText" className="w-4 h-4 mr-3 text-purple-400" />
                Reports
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Icon name="Database" className="w-4 h-4 mr-3 text-blue-400" />
                Database
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Icon name="BarChart3" className="w-4 h-4 mr-3 text-green-400" />
                Analytics
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Icon name="Users" className="w-4 h-4 mr-3 text-orange-400" />
                HR Department
              </button>
            </div>
          </div>

          {/* Conversation History */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">RECENT CONVERSATIONS</h3>
            <div className="space-y-1">
              {conversations.map((conv, index) => (
                <button key={index} className="w-full text-left p-2 hover:bg-slate-700/50 rounded text-sm truncate transition-all">
                  {conv}
                </button>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-4 left-4 right-4">
            <div className="space-y-2">
              <button className="w-full flex items-center p-2 hover:bg-slate-700 rounded-lg text-left">
                <Icon name="Settings" className="w-4 h-4 mr-3" />
                Settings
              </button>
              <button className="w-full flex items-center p-2 hover:bg-red-800 rounded-lg text-left text-red-400">
                <Icon name="LogOut" className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 border-b border-purple-200/50 p-4 flex items-center">
          {!sidebarOpen && (
            <button onClick={() => setSidebarOpen(true)} className="p-2 hover:bg-purple-100 rounded-lg mr-3">
              <Icon name="Menu" className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            OnTop AI Chat
          </h2>
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedLanguage === "EN" ? "English" : selectedLanguage === "PT" ? "Português" : "Español"}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
              ● Online
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-3xl px-4 py-3 rounded-2xl shadow-lg ${msg.type === "user" ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white" : "bg-white border border-purple-100 text-gray-800"}`}>
                <p>{msg.content}</p>
                <span className={`text-xs mt-2 block ${msg.type === "user" ? "text-purple-100" : "text-gray-500"}`}>
                  {msg.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
          {isLoading && <div className="text-gray-500">OnTop AI está digitando...</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => setInputValue(question)}
                  className="p-3 text-left border border-purple-200 bg-white/50 backdrop-blur-sm rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 transition-all text-sm shadow-sm hover:shadow-md"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input */}
        <div className="bg-white/80 border-t border-purple-200/50 p-4">
          <div className="max-w-4xl mx-auto flex space-x-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Pergunte sobre relatórios, dados de RH, vendas..."
              className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400"
            />
            <button onClick={handleSendMessage} className="px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl">
              <Icon name="Send" className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ChatInterface />);
