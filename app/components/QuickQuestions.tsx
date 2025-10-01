// Quick question suggestion cards displayed on empty chat
import Icon from './Icon';

interface QuickQuestionsProps {
  questions: string[];
  onQuestionClick: (question: string) => void;
  welcomeText: string;
  suggestionsText: string;
}

export default function QuickQuestions({
  questions,
  onQuestionClick,
  welcomeText,
  suggestionsText,
}: QuickQuestionsProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* App logo */}
      <div className="logo-container">
        <img src="/assets/logo.jpeg" alt="Company Logo" className="quickquestions-logo" />
        <span>OnTop AI</span>
      </div>
      
      {/* Welcome heading */}
      <h2 className="text-2xl font-bold text-slate-800">{welcomeText}</h2>
      
      {/* Subtitle */}
      <p className="text-slate-500 mb-6">{suggestionsText}</p>
      
      {/* Grid of suggestion cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3 quick-question-grid">
        {questions.map((question, index) => (
          <button
            key={index}
            onClick={() => onQuestionClick(question)}
            className="p-4 text-left bg-white border border-slate-200 rounded-lg hover:border-purple-400 hover:bg-purple-50 transition-all group hover-lift"
          >
            <div className="flex items-start gap-3">
              {/* Lightbulb icon */}
              <Icon name="Lightbulb" className="mt-1 text-yellow-400" />
              
              {/* Question text */}
              <span className="text-sm text-slate-700">{question}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
