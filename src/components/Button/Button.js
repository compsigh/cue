import styles from './Button.module.scss';

const Button = (props) => {
  const { text, onClick, type } = props;
  const typeStyle = type === 'primary' ? styles.primary : styles.secondary;
  return (
    <button className={typeStyle} onClick={onClick}>{text}</button>
  );
}

export default Button;
