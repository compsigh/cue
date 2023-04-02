import Image from "next/image";
import Link from "next/link";
import styles from './ImportCard.module.scss';

const ImportCard = ({ onUpdateImportMethod }) => {
  const handleChange = () => {
    onUpdateImportMethod('text');
  };

  return (
    <div className={styles.importCard}>
      <h2>Import your notes to get started:</h2>
      <div className={styles.sources}>
        <Link href='#'>
          <Image
            src="/icons/Google.svg"
            alt="Google"
            width={55}
            height={55}
            style={{opacity: 0.5, cursor: 'not-allowed'}}
          />
        </Link>
        <Link href='#'>
          <Image
            src="/icons/Notion.svg"
            alt="Notion"
            width={55}
            height={55}
            style={{opacity: 0.5, cursor: 'not-allowed'}}
          />
        </Link>
        <Link href='#' onClick={handleChange}>
          <Image
            src="/icons/Text.svg"
            alt="Text"
            width={55}
            height={55}
          />
        </Link>
      </div>
    </div>
  );
}

export default ImportCard;
