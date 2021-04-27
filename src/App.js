import './App.css';
import Header from './components/Header'
import Button from './components/Button'
import ItemBuyer from './components/ItemBuyer'
import {useState, useEffect} from 'react'


function App() {

const [stopGame, setGameState] = useState(false);
const [count, setCount] = useState(0);
const [rate, setRate] = useState(0);
const [clickRate, setClickRate] = useState(1);

const [handSpinners, setSpinners] = useState(0);
const [handSpinnersCost, setSpinnerCost] = useState(15);
const [lunchLadies, setLady] = useState(0);
const [lunchLadiesCost, setLadyCost] = useState(100);
const [farms, setFarms] = useState(0);
const [farmCost, setFarmCost] = useState(750);

function onclick1(addVal) {
  setCount(c => c + parseInt(addVal));
}

function roundTo(num) {
  return +(Math.round(num + "e+3")  + "e-3");
}

useEffect(() => {
   const timer = setInterval(() => {
      if (!stopGame) {
          setCount(c => roundTo(parseFloat(c) + parseFloat((rate/10.0))));
      }
  }, 100);
  return () => clearTimeout(timer);
}, [stopGame, rate]);

useEffect(() => {
  if (!rate) {
    setClickRate(1);
  } else {
    setClickRate(Math.ceil(rate / 10))
  }
}, [rate])


function changeGame() {
  setGameState(!stopGame);
}

function resetGame() {
  setRate(0);
  setClickRate(1);
  setCount(0);
  setGameState(false);

  setSpinners(0);
  setSpinnerCost(15);
  setLady(0);
  setLadyCost(100);
  setFarms(0);
  setFarmCost(750);

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
    alert('Not enough salads to purchase item!');
  } else {
    setCount(c => roundTo(c - cost))
    setRate(c => c + rateAdj);
    itemCostAdj(c => roundTo(c * 1.1));
    itemNumAdj(c => c + 1);
  }
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
         <Button color = "lightGreen" text = 'Click to Add Salad!' onClick={() => onclick1(clickRate)} />       
       </div>

      <div className = "header2"> 
        <p>Salads per Click: {adjDisp(clickRate)}</p> 
      </div>



      <ItemBuyer itemName="Hand Spinners" rateOfProd = {1} currentCount = {handSpinners} 
      currentCost = {handSpinnersCost} onClick={() => buyItem(handSpinnersCost, 1, setSpinnerCost, setSpinners)}/>

      <ItemBuyer itemName="Lunch Lady" rateOfProd = {10} currentCount = {lunchLadies} 
      currentCost = {lunchLadiesCost} onClick={() => buyItem(lunchLadiesCost, 10, setLadyCost, setLady)}/>

      <ItemBuyer itemName="Farm" rateOfProd = {50} currentCount = {farms} 
      currentCost = {farmCost} onClick={() => buyItem(farmCost, 50, setFarmCost, setFarms)}/>

    </div>
  );
}

export default App;
