import React, { useState } from 'react'
import { useSpring, a } from '@react-spring/web'
import {AmazonOutlined, InstagramOutlined, AppleOutlined, FacebookOutlined} from '@ant-design/icons'

import styles from './flipCard.module.css'

export default function App() {
  const [flipped, set] = useState(false)
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 },
  })
  return (
    <div className="flex fill center" >
      <a.div
        className={`${styles.c} ${styles.back}`}
        style={{ opacity: opacity.to(o => 1 - o), transform }}
        onClick={() => set(state => !state)}
      >FRONT</a.div>
      <a.div
        className={`${styles.c} ${styles.front}`}
        style={{
          opacity,
          transform,
          rotateX: '180deg',
        }}
      >
            <span onClick={() => set(state => !state)}><AmazonOutlined /></span>
            <span onClick={() => set(state => !state)}><InstagramOutlined /></span>
            <span onClick={() => set(state => !state)}><AppleOutlined /></span>
            <span onClick={() => set(state => !state)}><FacebookOutlined /></span>
        </a.div>
    </div>
  )
}
