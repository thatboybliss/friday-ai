export function createRoundNarration(question, accentMode) {
  return accentMode
    ? `AI Host: ${question.prompt} Accent bonus is active. ${question.accentHint}`
    : `AI Host: ${question.prompt} Submit your best answer.`;
}

export function scoreAnswer({ selected, answer, accentMode }) {
  if (!selected) {
    return { points: 0, feedback: 'Choose an answer before submitting.' };
  }

  if (selected === answer) {
    return {
      points: accentMode ? 15 : 10,
      feedback: accentMode
        ? 'Correct. Accent performance bonus awarded.'
        : 'Correct answer. Nice work.'
    };
  }

  return { points: 0, feedback: `Incorrect. Correct answer: ${answer}.` };
}
