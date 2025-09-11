const { useState, useRef, useEffect } = React;

// Fixed Icon component using SVG inline
function Icon({ name, className = "", size = 20 }) {
  const icons = {
    Menu: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <line x1="4" x2="20" y1="12" y2="12"/>
        <line x1="4" x2="20" y1="6" y2="6"/>
        <line x1="4" x2="20" y1="18" y2="18"/>
      </svg>
    ),
    Globe: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="10"/>
        <path d="m12 2-3 7 3 7 3-7-3-7"/>
        <path d="M8 12h8"/>
      </svg>
    ),
    FileText: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
        <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
        <path d="M10 9H8"/>
        <path d="M16 13H8"/>
        <path d="M16 17H8"/>
      </svg>
    ),
    Database: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 3 4 6 9 6s9-3 9-6V5"/>
        <path d="M3 12c0 3 4 6 9 6s9-3 9-6"/>
      </svg>
    ),
    BarChart3: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 3v18h18"/>
        <path d="M18 17V9"/>
        <path d="M13 17V5"/>
        <path d="M8 17v-3"/>
      </svg>
    ),
    Users: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    Settings: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/>
        <circle cx="12" cy="12" r="3"/>
      </svg>
    ),
    LogOut: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
        <polyline points="16,17 21,12 16,7"/>
        <line x1="21" x2="9" y1="12" y2="12"/>
      </svg>
    ),
    Send: () => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7 7l9.2 3a2 2 0 0 1 0 3.8L7 17l2.5-5L7 7z"/>
        <path d="M22 2L2 22"/>
      </svg>
    )
  };

  const IconComponent = icons[name];
  return IconComponent ? <IconComponent /> : null;
}

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: "assistant",
      content: "Hello, I'm OnTop AI Chat. I can help with internal reports, database queries, and department information. Available in EN/PT/ES. How can I assist you?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("EN"); // Changed to EN
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
      const responses = {
        EN: [
          "📊 Latest sales report shows 15% growth in Q3.",
          "👥 We currently have 1,247 active employees across 8 departments.",
          "📈 Turnover rate is at 8.2%, below industry average.",
        ],
        PT: [
          "📊 Último relatório de vendas mostra crescimento de 15% no Q3.",
          "👥 Atualmente temos 1.247 colaboradores ativos distribuídos em 8 departamentos.",
          "📈 A taxa de turnover está em 8,2%, abaixo da média do setor.",
        ],
        ES: [
          "📊 El último informe de ventas muestra un crecimiento del 15% en Q3.",
          "👥 Actualmente tenemos 1.247 empleados activos en 8 departamentos.",
          "📈 La tasa de rotación está en 8,2%, por debajo del promedio de la industria.",
        ]
      };

      const currentResponses = responses[selectedLanguage];
      const assistantMessage = {
        id: messages.length + 2,
        type: "assistant",
        content: currentResponses[Math.floor(Math.random() * currentResponses.length)],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const quickQuestions = {
    EN: [
      "Show latest sales report",
      "How many active employees do we have?",
      "Show Q3 performance metrics",
      "List database tables",
    ],
    PT: [
      "Mostrar último relatório de vendas",
      "Quantos colaboradores ativos temos?",
      "Mostrar métricas de performance Q3",
      "Listar tabelas do banco de dados",
    ],
    ES: [
      "Mostrar último informe de ventas",
      "¿Cuántos empleados activos tenemos?",
      "Mostrar métricas de rendimiento Q3",
      "Listar tablas de base de datos",
    ]
  };

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

  const texts = {
    EN: {
      typing: "OnTop AI is typing...",
      placeholder: "Ask about reports, HR data, sales...",
      quickAccess: "QUICK ACCESS",
      recentConversations: "RECENT CONVERSATIONS",
      reports: "Reports",
      database: "Database",
      analytics: "Analytics",
      hrDepartment: "HR Department",
      settings: "Settings",
      signOut: "Sign Out",
      online: "Online"
    },
    PT: {
      typing: "OnTop AI está digitando...",
      placeholder: "Pergunte sobre relatórios, dados de RH, vendas...",
      quickAccess: "ACESSO RÁPIDO",
      recentConversations: "CONVERSAS RECENTES",
      reports: "Relatórios",
      database: "Banco de Dados",
      analytics: "Análises",
      hrDepartment: "Departamento RH",
      settings: "Configurações",
      signOut: "Sair",
      online: "Online"
    },
    ES: {
      typing: "OnTop AI está escribiendo...",
      placeholder: "Pregunta sobre informes, datos de RRHH, ventas...",
      quickAccess: "ACCESO RÁPIDO",
      recentConversations: "CONVERSACIONES RECIENTES",
      reports: "Informes",
      database: "Base de Datos",
      analytics: "Análisis",
      hrDepartment: "Departamento RRHH",
      settings: "Configuración",
      signOut: "Cerrar Sesión",
      online: "En línea"
    }
  };

  const currentTexts = texts[selectedLanguage];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div className={`bg-gradient-to-b from-slate-900 via-slate-800 to-purple-900 text-white transition-all ${sidebarOpen ? "w-64" : "w-0"} overflow-hidden`}>
        <div className="p-4 relative h-full">
          {/* Logo + Title */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="h-8 w-24 bg-gradient-to-r from-purple-400 to-blue-400 rounded mb-2 flex items-center justify-center text-sm font-bold">
                OnTop
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                OnTop AI Chat
              </h1>
              <p className="text-xs text-gray-400">Corporate Intelligence</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="p-1 hover:bg-slate-700 rounded">
              <Icon name="Menu" size={20} />
            </button>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
              <Icon name="Globe" size={16} className="mr-2" />
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
            <h3 className="text-sm font-medium text-gray-400 mb-3">{currentTexts.quickAccess}</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Icon name="FileText" size={16} className="mr-3 text-purple-400" />
                {currentTexts.reports}
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Icon name="Database" size={16} className="mr-3 text-blue-400" />
                {currentTexts.database}
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Icon name="BarChart3" size={16} className="mr-3 text-green-400" />
                {currentTexts.analytics}
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Icon name="Users" size={16} className="mr-3 text-orange-400" />
                {currentTexts.hrDepartment}
              </button>
            </div>
          </div>

          {/* Conversation History */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">{currentTexts.recentConversations}</h3>
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
                <Icon name="Settings" size={16} className="mr-3" />
                {currentTexts.settings}
              </button>
              <button className="w-full flex items-center p-2 hover:bg-red-800 rounded-lg text-left text-red-400">
                <Icon name="LogOut" size={16} className="mr-3" />
                {currentTexts.signOut}
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
              <Icon name="Menu" size={20} />
            </button>
          )}
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            OnTop AI Chat
          </h2>
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {languages.find(lang => lang.code === selectedLanguage)?.name}
            </span>
            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
              ● {currentTexts.online}
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
          {isLoading && <div className="text-gray-500">{currentTexts.typing}</div>}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Questions */}
        {messages.length <= 1 && (
          <div className="px-4 py-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickQuestions[selectedLanguage].map((question, index) => (
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
              placeholder={currentTexts.placeholder}
              className="flex-1 px-4 py-3 border border-purple-200 rounded-xl focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <button onClick={handleSendMessage} className="px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 transition-all">
              <Icon name="Send" size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ChatInterface />);
