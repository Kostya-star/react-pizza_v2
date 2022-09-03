import React from 'react'
import styles from './NotFoundBlock.module.scss'


function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😢</span>
        <br/>
        Nothing found
      </h1>
      <p className={styles.description}>К сожалению, данная стр недоступна!</p>
    </div>
  )
}

export default NotFoundBlock;