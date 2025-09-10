const { useState, useRef, useEffect } = React;
const { Send, Menu, Database, FileText, Users, BarChart3, Settings, LogOut, Globe } = lucideReact;

function ChatInterface() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      content: 'Hello! I\'m your corporate AI assistant. I can help you with report information, database queries, and data from different departments. Available in English, Portuguese, and Spanish. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'I found 3 reports related to your request. The latest sales report shows 15% growth in Q3 across all regions...',
        'Consulté el esquema de usuarios. Actualmente tenemos 1,247 empleados activos distribuidos en 8 departamentos...',
        'Analisando os dados de RH, a taxa de turnover atual é de 8.2%, abaixo da média do setor. Los datos muestran tendencias positivas...'
      ];
      
      const assistantMessage = {
        id: messages.length + 2,
        type: 'assistant',
        content: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const quickQuestions = [
    'Show latest quarterly sales report',
    '¿Cuántos empleados hay por departamento?',
    'Mostrar métricas de performance Q3',
    'List available database tables'
  ];

  const conversations = [
    'Q3 2024 Global Reports',
    'Database User Queries',
    'Sales Analysis September',
    'HR Monthly Metrics',
    'Financial Dashboard Review'
  ];

  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'PT', name: 'Português', flag: '🇧🇷' },
    { code: 'ES', name: 'Español', flag: '🇪🇸' }
  ];

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Sidebar */}
      <div className={`bg-gradient-to-b from-slate-900 via-slate-800 to-purple-900 text-white transition-all duration-300 ${sidebarOpen ? 'w-64' : 'w-0'} overflow-hidden`}>
        <div className="p-4 relative h-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AI Assistant
              </h1>
              <p className="text-xs text-gray-400">Corporate Intelligence</p>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="p-1 hover:bg-slate-700 rounded"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* User Info */}
          <div className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 backdrop-blur-sm rounded-lg p-3 mb-4 border border-purple-500/20">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-sm font-medium">
                JS
              </div>
              <div className="ml-3">
                <p className="font-medium">John Silva</p>
                <p className="text-gray-300 text-sm">Data Analyst</p>
              </div>
            </div>
          </div>

          {/* Language Selector */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3 flex items-center">
              <Globe className="w-4 h-4 mr-2" />
              LANGUAGE
            </h3>
            <div className="grid grid-cols-3 gap-1">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code)}
                  className={`p-2 rounded-lg text-xs transition-all ${
                    selectedLanguage === lang.code
                      ? 'bg-purple-600 text-white'
                      : 'bg-slate-700 hover:bg-slate-600 text-gray-300'
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
                <FileText className="w-4 h-4 mr-3 text-purple-400" />
                Reports
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Database className="w-4 h-4 mr-3 text-blue-400" />
                Database
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <BarChart3 className="w-4 h-4 mr-3 text-green-400" />
                Analytics
              </button>
              <button className="w-full flex items-center p-2 hover:bg-gradient-to-r hover:from-purple-800/30 hover:to-blue-800/30 rounded-lg text-left transition-all">
                <Users className="w-4 h-4 mr-3 text-orange-400" />
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
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </button>
              <button className="w-full flex items-center p-2 hover:bg-red-800 rounded-lg text-left text-red-400">
                <LogOut className="w-4 h-4 mr-3" />
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-purple-200/50 p-4 flex items-center">
          {!sidebarOpen && (
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-purple-100 rounded-lg mr-3"
            >
              <Menu className="w-5 h-5" />
            </button>
          )}
          <h2 className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Corporate AI Chat
          </h2>
          <div className="ml-auto flex items-center space-x-4">
            <span className="text-sm text-gray-600">
              {selectedLanguage === 'EN' ? 'English' : selectedLanguage === 'PT' ? 'Português' : 'Español'}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-green-100 to-blue-100 text-green-800">
              ● Online
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-3xl px-4 py-3 rounded-2xl shadow-lg ${
                message.type === 'user' 
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white' 
                  : 'bg-white border border-purple-100 text-gray-800'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className={`text-xs mt-2 block ${
                  message.type === 'user' ? 'text-purple-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-white border border-purple-100 rounded-2xl px-4 py-3 shadow-lg">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </div>
            </div>
          )}

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
        <div className="bg-white/80 backdrop-blur-sm border-t border-purple-200/50 p-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex space-x-3">
              <div className="flex-1">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask about reports, query databases, or search departmental information..."
                  className="w-full px-4 py-3 border border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm"
                  disabled={isLoading}
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !inputValue.trim()}
                className="px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-xl"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
              AI Assistant can access internal reports and query databases securely • Multi-language support: English, Português, Español
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<ChatInterface />);
