import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/quizQuestions';
import { CheckCircle2, XCircle, RotateCcw, Award, ArrowRight, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const KnowledgeQuiz: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const totalQuestions = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionIndex: number) => {
    if (selectedAnswers[currentIndex] !== undefined) return; // already answered

    const updatedAnswers = { ...selectedAnswers, [currentIndex]: optionIndex };
    setSelectedAnswers(updatedAnswers);
    setShowExplanation({ ...showExplanation, [currentIndex]: true });

    // If all questions are answered or on last question
    if (Object.keys(updatedAnswers).length === totalQuestions) {
      setIsCompleted(true);
      // Trigger confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowExplanation({});
    setCurrentIndex(0);
    setIsCompleted(false);
  };

  const score = calculateScore();

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-teal-950/40 to-stone-900 border border-emerald-900/40 text-stone-100 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
              Knowledge Checkpoint
            </span>
            <span className="text-xs text-stone-400">Mastery Assessment</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Central Dogma Interactive Self-Test
          </h2>
          <p className="text-sm text-stone-300 max-w-xl">
            Test your understanding of DNA replication, transcription, eukaryotic splicing, translation, and genetic mutations.
          </p>
        </div>

        {/* Score tracker */}
        <div className="px-4 py-3 rounded-xl bg-stone-950/80 border border-stone-800 flex items-center gap-3">
          <Award className="w-6 h-6 text-amber-400 shrink-0" />
          <div>
            <span className="text-[10px] uppercase font-bold text-stone-400 block">Current Score</span>
            <span className="text-lg font-bold text-white font-mono">
              {score} / {totalQuestions}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1">
        <div className="flex justify-between text-xs text-stone-500 dark:text-stone-400 font-medium">
          <span>Question {currentIndex + 1} of {totalQuestions}</span>
          <span>{Math.round(((currentIndex + 1) / totalQuestions) * 100)}% Progress</span>
        </div>
        <div className="w-full h-2 bg-stone-200 dark:bg-stone-800 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      {!isCompleted ? (
        <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-lg space-y-6">
          {/* Question Tag / Difficulty */}
          <div className="flex items-center justify-between gap-2">
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {currentQuestion.category}
            </span>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400">
              {currentQuestion.difficulty}
            </span>
          </div>

          {/* Question Text */}
          <h3 className="text-lg md:text-xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {currentQuestion.question}
          </h3>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              const hasAnswered = selectedAnswers[currentIndex] !== undefined;
              const isCorrect = optIdx === currentQuestion.correctIndex;

              let optionStyle = 'border-stone-200 dark:border-stone-800 hover:border-emerald-500 dark:hover:border-emerald-500 bg-stone-50 dark:bg-stone-950 text-stone-800 dark:text-stone-200';

              if (hasAnswered) {
                if (isCorrect) {
                  optionStyle = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 ring-2 ring-emerald-400/30';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'border-rose-500 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200 ring-2 ring-rose-400/30';
                } else {
                  optionStyle = 'border-stone-200 dark:border-stone-800 opacity-60 bg-stone-100 dark:bg-stone-950';
                }
              }

              return (
                <button
                  key={`opt-${optIdx}`}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={hasAnswered}
                  className={`w-full p-4 rounded-xl border text-left text-sm font-medium transition-all flex items-center justify-between gap-3 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold shrink-0">
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span>{option}</span>
                  </div>

                  {hasAnswered && (
                    <div>
                      {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                      {isSelected && !isCorrect && (
                        <XCircle className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation[currentIndex] && (
            <div className="p-4 rounded-xl bg-stone-100 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 space-y-1.5 animate-in fade-in">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                <HelpCircle className="w-4 h-4" /> Explanation
              </div>
              <p className="text-xs text-stone-700 dark:text-stone-300 leading-relaxed">
                {currentQuestion.explanation}
              </p>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-100 dark:border-stone-800">
            <button
              onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="px-4 py-2 rounded-lg text-xs font-bold text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 disabled:opacity-40 transition-colors"
            >
              Previous
            </button>

            {currentIndex < totalQuestions - 1 ? (
              <button
                onClick={() => setCurrentIndex(currentIndex + 1)}
                className="px-5 py-2 rounded-lg bg-stone-900 hover:bg-stone-800 dark:bg-stone-100 dark:hover:bg-white text-white dark:text-stone-900 text-xs font-bold flex items-center gap-1.5 shadow transition-all"
              >
                Next Question <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={() => setIsCompleted(true)}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-1.5 shadow transition-all"
              >
                Finish Quiz <Award className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Quiz Completed Summary Card */
        <div className="p-8 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center space-y-6 shadow-xl">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-950/30">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
              Quiz Completed!
            </h3>
            <p className="text-stone-600 dark:text-stone-400 text-sm max-w-md mx-auto">
              You scored <strong className="text-stone-900 dark:text-stone-100 font-mono text-base">{score} out of {totalQuestions}</strong> ({Math.round((score / totalQuestions) * 100)}%).
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Retake Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
