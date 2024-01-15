import styles from './Footer.module.scss'

/**
 * We don't even render this anywhere lol
 */
export async function Footer () {
  return (
    <footer className={styles.footer}>
      <nav>
        <ul>
          <li>
            <p>&copy;2024 compsigh</p>
          </li>
          <li>
            <p>Made with 🖤 in San Francisco</p>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
