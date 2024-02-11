import './App.css';
import { useState , useEffect} from 'react';
import backgroundImage from './pexels-pixabay-206359.jpg'

function App() {

  const [bodyHeight, setBodyHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setBodyHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 


  const [count, setCount] = useState(0);
  const [seconds, setseconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [start, setStart] = useState(false);
  const [pause, setPause] = useState(false);
  const [condition, setCondition] = useState(false);

  useEffect(() => {
    if(start && !pause){
      // First slot
      const intervalId = setInterval(() => {
        setCount(count => {
          if(count < 100) {
            return count + 1;
          } else {
            return 0;
          }
        });
      }, 10);
  
      // Seconds slot
      const secondsIntervalId = setInterval(() => {
        setseconds(seconds => {
          if(seconds < 60){ return seconds + 1;}
          else{return 0;}
        });
      }, 1000);
  
      // Minutes slot
      const minutesIntervalId = setInterval(() => {
        setMinutes(minutes => minutes + 1);
      }, 60000);
  
      return () => {
        clearInterval(intervalId);
        clearInterval(secondsIntervalId);
        clearInterval(minutesIntervalId);
      };
    }
  }, [pause, start]);
  
  

const StartFunction =()=>{
  setStart(true)
  setPause(false)
  setCondition(true)
}

const ResetFunction =()=>{
  setCount(0);
  setseconds(0);
  setMinutes(0);
  setPause(true);
  setCondition(false)
  setListItems([])
}

const PauseFunction =()=>{
  setPause(!pause)
}

const [listItems, setListItems] = useState([]);

const handleAddItem = () => {
    // Create a new list with the existing items and a new one
    setListItems(prevItems => [...prevItems, `Lap${prevItems.length + 1}    ${minutes} : ${seconds} : ${count}\t`]);
};

  //styles
const styles = {
  backgroundImage: `url(${backgroundImage})`,
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center',
  minHeight: '100vh', // Set a minimum height to cover the whole viewport
  height: `${bodyHeight * .75 }px`,
  width: `${bodyHeight * .65 }px`
};

  return (
    <div className="app" style={{height: `${bodyHeight}px`}}>
      <div className='container' style={styles}>
        <h1>{minutes}:{seconds}:{count}</h1>
        <div>{condition?
            (<div className='buttons'>
              <button onClick={ResetFunction}>Reset</button>
              <button onClick={PauseFunction}>Pause</button>
              <button onClick={handleAddItem}>Lap</button>
            </div>):
            (  <button onClick={StartFunction}>start</button>)
          }
        </div>
        <ul className='list'>
          {/* Render the list items */}
          {listItems.map((item, index) => (
                    <li className='item' key={index}><pre>{item}</pre></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
