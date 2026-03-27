export default function ControlPanel({
  accentMode,
  setAccentMode,
  score,
  round,
  narration,
  boardSummary,
  feedback
}) {
  return (
    <aside className="panel">
      <h1>Vox Game Room</h1>
      <p className="sub">AI-orchestrated voice trivia</p>

      <button className="mode-btn" type="button" onClick={() => setAccentMode((prev) => !prev)}>
        Accent Mode: {accentMode ? 'ON' : 'OFF'}
      </button>

      <div className="stats">
        <p>Score: <strong>{score}</strong></p>
        <p>Round: <strong>{round}</strong></p>
        <p>{boardSummary}</p>
      </div>

      <p className="narration">{narration}</p>
      {feedback && <p className="feedback">{feedback}</p>}
    </aside>
  );
}
