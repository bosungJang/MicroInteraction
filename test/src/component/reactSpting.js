import 'antd/dist/antd.css'
import './style.css'
import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import { Keyframes, animated, config } from 'react-spring'
import { Form, Typography} from 'antd'
import delay from 'delay'
import {HomeOutlined, MenuUnfoldOutlined, MenuFoldOutlined, ProjectFilled, NotificationFilled} from '@ant-design/icons'

const { Paragraph } = Typography;

const fast = { ...config.stiff, restSpeedThreshold: 1, restDisplacementThreshold: 0.01 }

// Creates a spring with predefined animation slots
const Sidebar = Keyframes.Spring({
  // Slots can take arrays/chains,
  peek: [
    { delay: 500, from: { x: -100 }, to: { x: 0 }, config: fast },
    { delay: 800, to: { x: -100 }, config: config.slow }
  ],
  // single items,
  open: { to: { x: 0 }, config: config.default },
  // or async functions with side-effects
  close: async call => {
    await delay(400)
    await call({ to: { x: -100 }, config: config.gentle })
  }
})

// Creates a keyframed trail
const Content = Keyframes.Trail({
  peek: [{ delay: 600, from: { x: -100, opacity: 0 }, to: { x: 0, opacity: 1 } }, { to: { x: -100, opacity: 0 } }],
  open: { delay: 100, to: { x: 0, opacity: 1 } },
  close: { to: { x: -100, opacity: 0 } }
})
/*
const items = [
  <Avatar src="https://semantic-ui.com/images/avatar2/large/elyse.png" />,
  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />,
  <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />,
  <Fragment>
    <Checkbox>Remember me</Checkbox>
    <a className="login-form-forgot" href="#" children="Forgot password" />
    <Button type="primary" htmlType="submit" className="login-form-button" children="Log in" />
    Or <a href="#">register now!</a>
  </Fragment>
]
*/

const items = [
  <HomeOutlined />,
  <Paragraph>home</Paragraph>,
  <ProjectFilled />,
  <Paragraph>project</Paragraph>,
  <NotificationFilled />,
  <Paragraph>notification</Paragraph>,
]

class App extends React.Component {
  state = { open: false }
  toggle = () => {this.setState(state => ({ open: !state.open }));} 

  render() {
    const state = this.state.open === undefined ? 'peek' : this.state.open ? 'open' : 'close'
    //const icon = this.state.open ? 'fold' : 'unfold'

    return (
      <Fragment>
        {
          this.state.open === false ?
          <MenuUnfoldOutlined className="toggle" onClick={this.toggle}/> :
          <MenuFoldOutlined className="toggle" onClick={this.toggle}/>
        }        
        
        {/* 
        <Icon type={`menu-${icon}`} className="toggle" onClick={this.toggle} />
        */}
        <Sidebar native state={state}>
          {({ x }) => (
            <animated.div className="sidebar" style={{ transform: x.interpolate(x => `translate3d(${x}%,0,0)`) }}>
              <Content native keys={items.map((_, i) => i)} config={{ tension: 200, friction: 20 }} state={state}>
                {items.map((item, i) => ({ x, ...props }) => (
                  <animated.div
                    style={{
                      transform: x.interpolate(x => `translate3d(${x}%,0,0)`),
                      ...props
                    }}>
                    <Form.Item className={i === 0 ? 'middle' : ''}>{item}</Form.Item>
                  </animated.div>
                ))}
              </Content>
            </animated.div>
          )}
        </Sidebar>
      </Fragment>
    )
  }
}

export default App;
