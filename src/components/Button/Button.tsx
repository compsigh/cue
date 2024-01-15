'use client'

import styles from './Button.module.scss'
import type { MouseEventHandler } from 'react'

export function Button (props: { text: string, onClick: MouseEventHandler, type: 'primary' | 'secondary'}) {
  const { text, onClick, type } = props
  const typeStyle = type === 'primary' ? styles.primary : styles.secondary

  return (
    <button className={typeStyle} onClick={onClick}>{text}</button>
  )
}
