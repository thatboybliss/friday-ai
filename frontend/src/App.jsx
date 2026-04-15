import { useMemo, useState } from 'react';
import Board from './components/Board';
import ControlPanel from './components/ControlPanel';
import Recorder from './components/Recorder';
import { QUESTIONS } from './data/questions';
import { useSharedRoom } from './hooks/useSharedRoom';
import { createRoundNarration, scoreAnswer } from './services/aiDirector';
import './styles/app.css';

function App() {
  const [index, setIndex] = useState(0);
  const [selection, setSelection] = useState('');
  const [accentMode, setAccentMode] = useState(true);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { state, boardSummary, updateState } = useSharedRoom();

  const question = QUESTIONS[index];
  const narration = useMemo(() => createRoundNarration(question, accentMode), [question, accentMode]);

  const submitAnswer = () => {
    const result = scoreAnswer({ selected: selection, answer: question.answer, accentMode });
    setScore((prev) => prev + result.points);
    setFeedback(result.feedback);
    setSubmitted(true);

    updateState({
      totalAnswers: state.totalAnswers + 1,
      lastAction: `Round ${index + 1}: ${selection || 'No answer submitted'}`
    });
  };

  const nextRound = () => {
    const next = index + 1 >= QUESTIONS.length ? 0 : index + 1;
    setIndex(next);
    setSelection('');
    setSubmitted(false);
    setFeedback('');
  };

  return (
    <main className="layout">
      <ControlPanel
        accentMode={accentMode}
        setAccentMode={setAccentMode}
        score={score}
        round={index + 1}
        narration={narration}
        boardSummary={boardSummary}
        feedback={feedback || state.lastAction}
      />

      <section className="play-area">
        <Board
          question={question}
          selection={selection}
          setSelection={setSelection}
          submitted={submitted}
        />

        <div className="actions">
          <button type="button" onClick={submitAnswer} disabled={submitted || !selection}>
            Submit Answer
          </button>
          <button type="button" onClick={nextRound} disabled={!submitted}>
            {index + 1 >= QUESTIONS.length ? 'Restart Match' : 'Next Round'}
          </button>
        </div>

        <Recorder />
      </section>
    </main>
  );
}

export default App;
