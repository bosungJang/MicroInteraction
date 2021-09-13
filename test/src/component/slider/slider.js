import { render } from 'react-dom'
import React, { useRef, useState, Fragment, createContext, useContext } from 'react'
import clamp from 'lodash-es/clamp'
import { useSprings, animated } from '@react-spring/web'
import styled from 'styled-components'
import { useGesture } from 'react-with-gesture'
import { AccordionItem, Accordion } from './accordion'
import "./slider.css"; 

const Wrap = styled(animated.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  will-change: transform;
`

const WrapInner = styled(animated.div)`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 100%;
  height: 100%;
  will-change: transform;
  box-shadow: 0 62.5px 125px -25px rgba(50, 50, 73, 0.5), 0 37.5px 75px -37.5px rgba(0, 0, 0, 0.6);
`

const Contain = styled.div`
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 200px;
`

const Content = styled.div`
  height: 200px;
`

const Button = styled.div`
  display: ${({ unActive }) => (unActive ? 'none' : 'block')};
  width: 28px;
  height: 28px;
  border-bottom: 6px solid;
  border-left: 6px solid;
  cursor: pointer;
  position: absolute;
  top: 50%;
  margin-top: -31px;
  z-index: 200;
  transition: all 0.2s ease-in-out;
`

const ArrowRight = styled(Button)`
  transform: rotate(-135deg);
  right: 25px;

  &:hover {
    transform: scale(1.3) rotate(-135deg);
  }
`

const ArrowLeft = styled(Button)`
  transform: rotate(45deg);
  left: 25px;

  &:hover {
    transform: scale(1.3) rotate(45deg);
  }
`

const pages = [
  'https://www.elandretail.com/upload/20180409151949_1.png',
  'https://api6.card-gorilla.com:8080/storage/card/90/card_img/343/wr_cjswibeeon_card.png',
  'https://m.hanacard.co.kr/ATTACH/NEW_MOBILE/images/cardinfo/card_img/04652.png',
  'https://www.kjbank.com/resource/img/fpm/card/kjcard_credit_5307.png',
  'https://blog.kakaocdn.net/dn/cC3ZWC/btqCBxhAem1/2bKl1L3ZinnVkXOkKPKBO1/img.png'
]

function Viewpager({ items, leftBtn, rightBtn }) {
  const [currentId, setId] = useState(0)
  const index = useRef(0)
  const [props, set] = useSprings(items.length, i => ({
    x: i * window.innerWidth,
    sc: 1,
    display: 'block',
    from: { x: 1260, sc: 0 }
  }))
  const bind = useGesture(({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
    if (down && distance > window.innerWidth / 2) {
      const newId = clamp(index.current + (xDir > 0 ? -1 : 1), 0, items.length - 1)
      cancel((index.current = newId))
      setId(newId)
    }
    set(i => {
      if (i < index.current - 1 && i > index.current + 1) return { display: 'none' }
      const x = (i - index.current) * window.innerWidth + (down ? xDelta : 0)
      const sc = down ? 1 - distance / window.innerWidth / 2 : 1
      return { x, sc, display: 'block' }
    })
  })

  const nextSlide = () => {
    set(i => {
      if (i < index.current - 1 && i > index.current + 1) return { display: 'none' }
      const x = (i - index.current - 1) * window.innerWidth
      const sc = index.current === i ? 0 : 1

      return { x, sc, display: 'block' }
    })
    index.current = index.current + 1
    setId(index.current)
  }

  const prevSlide = () => {
    set(i => {
      if (i < index.current - 1 && i > index.current + 1) return { display: 'none' }
      const x = (i - index.current + 1) * window.innerWidth
      const sc = index.current === i ? 0 : 1

      return { x, sc, display: 'block' }
    })
    index.current = index.current - 1
    setId(index.current)
  }

  const renderContent = () => {
    return props.map(({ x, display, sc }, i) => {
      return (
        <Wrap {...bind()} key={i} style={{ display, transform: x.interpolate(x => `translate3d(${x}px,0,0)`) }}>
          <WrapInner style={{ transform: sc.interpolate(s => `scale(${s})`) }}>{items[i]}</WrapInner>
        </Wrap>
      )
    })
  }

  return (
    <Fragment>
      {renderContent()}
      {leftBtn({ onClick: prevSlide, unActive: currentId === 0 })}
      {rightBtn({ onClick: nextSlide, unActive: currentId === items.length - 1 })}
    </Fragment>
  )
}

const HcSlider = () => (
  <div>
  <Contain>
    <Viewpager
      items={pages.map((el, i) => (
        <Content style={{ backgroundImage: `url(${pages[i]})` }} key={i} />
      ))}
      leftBtn={({ onClick, unActive }) => <ArrowLeft onClick={onClick} unActive={unActive} />}
      rightBtn={({ onClick, unActive }) => <ArrowRight onClick={onClick} unActive={unActive} />}
    />    
  </Contain>
  <Accordion>
   <AccordionItem title="더보기" isOpen={true}>
      <div>내용</div>
    </AccordionItem>
  </Accordion>
</div>
)

export default HcSlider;
