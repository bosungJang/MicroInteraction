import {Rotate, Pop, Gesture} from '../src/component/test'
import SpringReact from '../src/component/reactSpting'
import Spinner from '../src/component/spinning'
import FlipCard from '../src/component/flipCard'
import AccordianSlider from './component/slider/slider'

function App() {
  return (
    <div className="App" style={{marginTop: 100, marginLeft: 100, textAlign:'left'}}>
      <div>
        <SpringReact/>
      </div>
      <div style={{width:100, height:100, backgroundColor:'white', padding: 10}}>
        <Spinner/>
      </div>
      <div style={{width: 100, height: 100, display:'inline-block'}}>
        <FlipCard style={{width:'100%', height:'100%'}}/>
      </div>
      <div>
        <AccordianSlider/>
      </div>
    </div>
  );
}

export default App;
