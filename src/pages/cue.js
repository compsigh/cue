import { useState } from "react";
import styles from "@/styles/Cue.module.scss";
import ImportCard from "@/components/ImportCard/ImportCard";
import TextCard from "@/components/TextCard/TextCard";
import ResultCard from "@/components/ResultCard/ResultCard";

export default function Cue() {
  const [importMethod, setImportMethod] = useState("");
  const [result, setResult] = useState();

  function handleImportMethod(method) {
    setImportMethod(method);
  }

  function handleResult(result) {
    setResult(result);
  }

  if (importMethod === "text" && !result)
    return (
      <div className={styles.textCard}>
        <TextCard onUpdateResult={handleResult} />
      </div>
      );

  if (result) {
    console.log(result);
    return (
      <div className={styles.resultCard}>
        <ResultCard result={result} />
      </div>
    );
  }

  return (
      <div className={styles.importCard}>
        <ImportCard onUpdateImportMethod={handleImportMethod} />
      </div>
  );
}
