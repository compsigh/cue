import { useState } from "react";
import styles from "@/styles/Cue.module.scss";
import ImportCard from "@/components/ImportCard/ImportCard";
import TextCard from "@/components/TextCard/TextCard";

export default function Cue() {
  const [importMethod, setImportMethod] = useState("");

  function handleImportMethod(method) {
    setImportMethod(method);
  }

  if (importMethod === "text")
    return (
      <div className={styles.textCard}>
        <TextCard />
      </div>
      );

  return (
      <div className={styles.importCard}>
        <ImportCard onUpdateImportMethod={handleImportMethod} />
      </div>
  );
}
