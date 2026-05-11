import { useRef, useState } from 'react';

export default function Recorder() {
  const mediaRecorder = useRef(null);
  const chunks = useRef([]);
  const [recording, setRecording] = useState(false);
  const [clipUrl, setClipUrl] = useState('');
  const [error, setError] = useState('');

  const start = async () => {
    setError('');
    if (!navigator.mediaDevices?.getUserMedia) {
      setError('Recording is not supported in this browser.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
      const recorder = new MediaRecorder(stream);

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunks.current.push(event.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setClipUrl(url);
        chunks.current = [];
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.current = recorder;
      recorder.start();
      setRecording(true);
    } catch {
      setError('Permission denied or camera unavailable.');
    }
  };

  const stop = () => {
    mediaRecorder.current?.stop();
    setRecording(false);
  };

  return (
    <section className="recorder">
      <h3>Answer Clip Recorder</h3>
      <p>Capture short reaction videos for challenge highlights.</p>

      <div className="recorder-actions">
        {!recording ? (
          <button type="button" onClick={start}>Start Recording</button>
        ) : (
          <button type="button" onClick={stop}>Stop Recording</button>
        )}
      </div>

      {error && <p className="error">{error}</p>}
      {clipUrl && (
        <video controls src={clipUrl} className="clip-preview" />
      )}
    </section>
  );
}
