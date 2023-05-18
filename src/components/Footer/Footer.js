import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li>
            <p>&copy;2023 compsigh</p>
          </li>
          <li>
            <p>Made with 🖤 in San Francisco</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}

export default Footer
