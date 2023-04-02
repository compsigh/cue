import { useState } from "react";
import styles from './TextCard.module.scss';

const TextCard = () => {
  const [notesInput, setNotesInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ notes: notesInput }),
      });

      const data = await response.json();
      if (response.status !== 200)
        throw data.error || new Error(`Request failed with status ${response.status}`);

      setResult(data.result);
      alert(data.result);
      setNotesInput("");
    }
    catch(error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div className={styles.textCard}>
      <main className={styles.main}>
        <h2>Paste your notes here:</h2>
        <form onSubmit={onSubmit}>
          <input
            type="textarea"
            name="notes"
            placeholder="The Roman Republic..."
            value={notesInput}
            onChange={(e) => setNotesInput(e.target.value)}
          />
          <button type="submit"></button>
        </form>
      </main>
    </div>
  );
}


export default TextCard;
