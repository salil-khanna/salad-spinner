import './App.css';
import Header from './components/Header'
import Button from './components/Button'
import ItemBuyer from './components/ItemBuyer'
import {useState, useEffect} from 'react'
import { useSpring, animated as a} from 'react-spring'
import UnknownItem from './components/UnknownItem';
import swal from 'sweetalert';

function App() {

const [stopGame, setGameState] = useState(false);

const [totalSalads, setTotal] = useState(0);

const [count, setCount] = useState(0);
const [rate, setRate] = useState(0);
const [clickRate, setClickRate] = useState(1);

const [unlockables, setUnlockables] = useState(2);

const [handSpinners, setSpinners] = useState(0);
const [handSpinnersCost, setSpinnerCost] = useState(15);
const [lunchLadies, setLady] = useState(0);
const [lunchLadiesCost, setLadyCost] = useState(100);
const [farms, setFarms] = useState(0);
const [farmCost, setFarmCost] = useState(1100);
const [mafia, setMafia] = useState(-1);
const [mafiaCost, setMafiaCost] = useState(6000);
const [town, setTown] = useState(-1);
const [townCost, setTownCost] = useState(20000);


useEffect(() => {
  setTimeout(() => {
    swal({
      title: "Welcome to Salad Spinner!",
      text: `As the healthy alternative to cookie clicker, this site does not use cookies to keep track of any progress,
            so make sure not to close out the tab if you want to save your salads! Thanks for playing my game! 
            Signed, Salil`,
      className: "intro",
      closeOnClickOutside: false,
      button: "Lets get Spinning!",
    });
  }, 1300);

}, [])



function onclick1(addVal) {
  setCount(c => c + parseInt(addVal));
  setTotal(c => c + parseInt(addVal));
}

function roundTo(num) {
  return +(Math.round(num + "e+3")  + "e-3");
}

useEffect(() => {
   const timer = setInterval(() => {
      if (!stopGame) {
          setTotal(c => roundTo(parseFloat(c) + parseFloat((rate/10.0))));
          setCount(c => roundTo(parseFloat(c) + parseFloat((rate/10.0))));
      }
  }, 100);
  return () => clearTimeout(timer);
}, [stopGame, rate]);

useEffect(() => {
  if (!rate) {
    setClickRate(1);
  } else {
    setClickRate(Math.ceil(rate / 15))
  }
}, [rate])

function changeGame() {
  setGameState(!stopGame);
}

async function resetGame() {

  const willDelete = await swal({
    title: "Are you sure you want to reset your progress?",
    icon: "warning",
    dangerMode: true,
    buttons: ["Cancel", "Ok"],
  });
  
  if (willDelete) {
    setRate(0);
    setClickRate(1);
    setCount(0);
    setTotal(0);
    setGameState(false);

    setUnlockables(2);

    setSpinners(0);
    setSpinnerCost(15);
    setLady(0);
    setLadyCost(100);
    setFarms(0);
    setFarmCost(1100);
    setMafia(-1);
    setMafiaCost(6000);
    setTown(-1);
    setTownCost(20000);
    swal("Your game has been reset!", "", "success");
  }

}

function adjDisp(valueToBeFixed) {
   if (valueToBeFixed > Math.pow(10,15) ) {
    return roundTo(valueToBeFixed/Math.pow(10,15)) + " quadrillion";
  } else if (valueToBeFixed > Math.pow(10,12) ) {
    return roundTo(valueToBeFixed/Math.pow(10,12)) + " trillion";
  } else if (valueToBeFixed > Math.pow(10,9) ) {
    return roundTo(valueToBeFixed/Math.pow(10,9)) + " billion";
  } else if (valueToBeFixed > Math.pow(10,6) ) {
    return roundTo(valueToBeFixed/Math.pow(10,6)) + " million";
  } else if (valueToBeFixed > Math.pow(10,4)) {
    return roundTo(valueToBeFixed/Math.pow(10,3)) + " thousand";
  } else {
    return valueToBeFixed;
  }
}


function buyItem(cost, rateAdj, itemCostAdj, itemNumAdj) {
  if (cost > count) {
    swal('Not enough salads to purchase item!');
  } else {
    setCount(c => roundTo(c - cost))
    setRate(c => c + rateAdj);
    itemCostAdj(c => roundTo(c * 1.1));
    itemNumAdj(c => c + 1);
  }
}

  useEffect(() => {
    if (count > 5000 && mafia === -1) {
      setMafia(0);
      setUnlockables(c => c - 1)
    }
    if (count > 15000 && town === -1) {
      setTown(0);
      setUnlockables(c => c - 1)
      console.log(totalSalads);
    }

    

  }, [count, mafia, town, totalSalads])

  function displayItem(unlockVal) {
    return unlockVal !== -1;
  }



  return (
    <div className="container">
      <Header onClick={resetGame} stopGame={stopGame} pauseGame = {changeGame}/>
      
      <p className="header3"> <b>Salad Stats</b></p>

      {/* turn this into a component */}
      <div className = "header2">
        <p>Total Salads: {adjDisp(count)} </p>        
      </div>

      {/* Add an image to click instead of a button to manually create salads */}
      <div className = "header2">
         <p >Salads per Second: {adjDisp(rate)} </p>  
         <Button color = "limeGreen" text = 'Click to Add Salad!' onClick={() => onclick1(clickRate)} />       
       </div>

      <div className = "header2"> 
        <p>Salads per Click: {adjDisp(clickRate)}</p> 
      </div>


        <ItemBuyer itemName="Hand Spinners" rateOfProd = {1} currentCount = {handSpinners} saladCount = {count} delayAmount = {100}
        currentCost = {handSpinnersCost} onClick={() => buyItem(handSpinnersCost, 1, setSpinnerCost, setSpinners)}/>

      
        <ItemBuyer itemName="Lunch Lady" rateOfProd = {10} currentCount = {lunchLadies} saladCount = {count} delayAmount = {400}
        currentCost = {lunchLadiesCost} onClick={() => buyItem(lunchLadiesCost, 10, setLadyCost, setLady)}/>
      
      <ItemBuyer itemName="Farm" rateOfProd = {50} currentCount = {farms} saladCount = {count} delayAmount = {700}
      currentCost = {farmCost} onClick={() => buyItem(farmCost, 50, setFarmCost, setFarms)}/>
    
    <a.div style = {useSpring({from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 }, delay: 1000, }) }>
      {
       displayItem(mafia) ? <ItemBuyer itemName="Underground Salad Mafia" rateOfProd = {115} currentCount = {mafia} saladCount = {count} 
            currentCost = {mafiaCost} onClick={() => buyItem(mafiaCost, 115, setMafiaCost, setMafia)}/> : <UnknownItem unlock = {5000}/>
      } 
      </a.div>
      
      {
       displayItem(town) ? <ItemBuyer itemName="Tomato Town" rateOfProd = {500} currentCount = {town} saladCount = {count} 
            currentCost = {townCost} onClick={() => buyItem(townCost, 500, setTownCost, setTown)}/> : mafia > -1 && <UnknownItem unlock = {15000} />

      } 
       
      
      <div className = "header2"> 
        <p style= {{marginTop: 10, }}> <b>{unlockables === 0 ? "No more items to unlock! :D" : 
        `Keep Making Salads to Unlock ${unlockables} More Items!!` }</b></p> 
      </div>
     

      <div > 
        <footer>
          Developed by Salil Khanna @ <a href="https://www.salilkhanna.com" 
          target= "_blank" style = {{color:"goldenrod"}} rel="noreferrer"> salilkhanna.com</a> with React JS
          <br></br>
          <a href="https://github.com/salil-khanna/salad-spinner" target= "_blank" style = {{color:"goldenrod"}} 
          rel="noreferrer"> View the Code Here </a>
        </footer>
      </div>

    </div>
  );
}

export default App;
