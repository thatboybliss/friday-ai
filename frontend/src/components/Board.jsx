export default function Board({ question, selection, setSelection, submitted }) {
  return (
    <section className="board">
      <div className="board-head">
        <span className="chip">{question.category}</span>
        <p className="ar-clue">{question.arClue}</p>
      </div>

      <h2>{question.prompt}</h2>

      <div className="option-grid">
        {question.choices.map((choice) => (
          <button
            key={choice}
            className={`option ${selection === choice ? 'active' : ''}`}
            onClick={() => setSelection(choice)}
            disabled={submitted}
            type="button"
          >
            {choice}
          </button>
        ))}
      </div>
    </section>
  );
}
