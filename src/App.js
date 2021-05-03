import './App.css';
import Header from './components/Header'
import Button from './components/Button'
import ItemBuyer from './components/ItemBuyer'
import {useState, useEffect } from 'react'
import UnknownItem from './components/UnknownItem';
import swal from 'sweetalert';
import { toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

const [stopGame, setGameState] = useState(false);

const [totalSalads, setTotal] = useState(0);

const [count, setCount] = useState(0);
const [rate, setRate] = useState(0);
const [clickRate, setClickRate] = useState(1);

const [unlockables, setUnlockables] = useState(4);

const [handSpinners, setSpinners] = useState(0);
const [handSpinnersCost, setSpinnerCost] = useState(15);
const [lunchLadies, setLady] = useState(-1);
const [lunchLadiesCost, setLadyCost] = useState(100);
const [farms, setFarms] = useState(-1);
const [farmCost, setFarmCost] = useState(1100);
const [mafia, setMafia] = useState(-1);
const [mafiaCost, setMafiaCost] = useState(6000);
const [town, setTown] = useState(-1);
const [townCost, setTownCost] = useState(20000);

////////////////////////////////////////////////////////////////////////
    ////////////////////////// SECTION FOR ACHIEVEMENTS CODE ///////////////
    ////////////////////////////////////////////////////////////////////////
    const achievementList = [
      {
          key: 1,
          text: "Your first salad! They grow up so fast :')",
          found: false,
      },
      {
          key: 2,
          text: "Own 1 Salad Spinner: We All Start Somewhere",
          found: false,
      }, 
      {
          key: 3,
          text: "You unlocked all items! Now touch some grass",
          found: false,
      },
      {
          key: 4,
          text: "5 achievements: You've hit the big leagues!",
          found: false,
      },
      {
          key: 5,
          text: "Pausing the Game: Bathroom break I guess?",
          found: false,
      },
      {
          key: 69,
          text: "Nice.",
          found: false,
      },
      {
          key: 6,
          text: "Unlocked All Achievements: Go home, I'm out of things for you to do",
          found: false,
      },
      {
        key: 7,
        text: "Salads per Second > 50: Now this is spinning out of control...",
        found: false,
    },
    {
        key: 8,
        text: "Salads per Click > 10: Your fingers must be tired",
        found: false,
    }, 
      {
          key: 9,
          text: "Own 1 Lunch Lady: Whats for lunch?",
          found: false,
      },
      {
          key: 10,
          text: "Own 1 Farm: Land Development!",
          found: false,
      },
      {
          key: 11,
          text: "Own 1 Mafia: Am I in debt??",
          found: false,
      },
      {
          key: 12,
          text: "Own 1 Town: Fortnite x Salad Spinner When?",
          found: false,
      },
      {
        key: 13,
        text: "Pass 10k All Time Salads: Started from the bottom now we here.",
        found: false,
    },
    ];
    const [achievements, setAchievements] = useState(achievementList)
    const [achievementsNum, setAchievementsNum] = useState(0);

    function achievementToastGen(text) {
      setAchievementsNum(c => c + 1);
      return toast.dark(text, {
        position: "bottom-center",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
        
    }

    const adjustAchievements = (val) => {
     setAchievements( achievements.filter( (achievement) => {
          return !achievement.found
      }).map( (achievement) => {
          if (achievement.key === val) {
              achievementToastGen(achievement.text)
              return {...achievement, found: true}
          } else {
              return achievement;
          }
      }))
}


    ///////////////////////////////////////////////////////////////////

useEffect(() => {
  setTimeout(() => {
    swal({
      title: "Welcome to Salad Spinner!",
      text: `As the healthy alternative to cookie clicker, this site does not use cookies to keep track of any progress, so make sure to not refresh or close out the tab if you want to save your salads! 
      Thanks for playing my game :D 
      Signed, Salil`,
      className: "intro",
      closeOnClickOutside: false,
      button: "Lets get Spinning!",
    });
  }, 1100);

}, [])


function onclick1(addVal) {
  if (totalSalads === 0) {
    adjustAchievements(1);
  }
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
  adjustAchievements(5);
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

/**
 * All the changes to be made when a new item is bought
 * 
 * @param {*} cost cost of the items
 * @param {*} rateAdj how much to increase the rate of production by
 * @param {*} itemCostAdj the corresponding function which allows the new cost to be set
 * @param {*} itemNumAdj the correspond function which allows the new number of items to be set
 */
function buyItem(cost, rateAdj, itemCostAdj, itemNumAdj, item, itemName) {
  if (cost > count) {
    toast.error('Not enough Salads to purchase item !', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      });
  } else {
    if (item === 0) {
      if (itemName === "Hand Spinners") {
        adjustAchievements(2);
      } else if (itemName === "Lunch Ladies") {
        adjustAchievements(9);
      } else if (itemName === "Farms") {
        adjustAchievements(10);
      } else if (itemName === "Mafias") {
        adjustAchievements(11);
      } else if (itemName === "Towns") {
        adjustAchievements(12);
      }

    }

    setCount(c => roundTo(c - cost))
    setRate(c => c + rateAdj);
    itemCostAdj(c => roundTo(c * 1.1));
    itemNumAdj(c => c + 1);
    
  }

  
}

/**
 * Use Effect is for unlocking items
 */
  useEffect(() => {
    if (count >= 10 && lunchLadies === -1) {
      setLady(0);
      setUnlockables(c => c - 1)
    }

    if (count >= 500 && farms === -1) {
      setFarms(0);
      setUnlockables(c => c - 1)
    }

    if (count >= 5000 && mafia === -1) {
      setMafia(0);
      setUnlockables(c => c - 1)
    }
    if (count >= 15000 && town === -1) {
      setTown(0);
      setUnlockables(c => c - 1)
      achievementToastGen("You unlocked all items! Now touch some grass.")

    }

  }, [count, lunchLadies, farms, mafia, town])

  /**
 * Use Effect is for unlocking achivements
 */
   useEffect(() => {
    if (handSpinners === 69 && lunchLadies === 69 && 
      farms === 69 && mafia === 69 && town === 69 ) {
      achievementToastGen("Nice.")
    }

    if (handSpinners === 100 && lunchLadies === 100 && 
      farms === 100 && mafia === 100 && town === 100 ) {
      achievementToastGen("100s On The Board: I think this means you win now")
    }

  }, [handSpinners, lunchLadies, farms, mafia, town])

  function displayItem(unlockVal) {
    return unlockVal !== -1;
  }

  function displayUnknown(prevVal) {
    return prevVal > -1;
  }



    async function resetGame() {

      const willDelete = await swal({
        title: "Are you sure you want to reset your progress?",
        icon: "warning",
        dangerMode: true,
        buttons: ["Cancel", "Ok"],
      });
      
      if (willDelete) {
        
        setTotal(0);
        setRate(0);
        setClickRate(1);
        setCount(0);
        setGameState(false);
    
        setUnlockables(4);
    
        setSpinners(0);
        setSpinnerCost(15);
        setLady(-1);
        setLadyCost(100);
        setFarms(-1);
        setFarmCost(1100);
        setMafia(-1);
        setMafiaCost(6000);
        setTown(-1);
        setTownCost(20000);
    
        setAchievements(achievementList);
        setAchievementsNum(0);
        await swal("Your game has been reset!", "", "success");
        
      }
    
    }


  return (
     
    <div className="container">
     
      <Header onClick={resetGame} stopGame={stopGame} pauseGame = {changeGame} />


      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
      
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
        currentCost = {handSpinnersCost} onClick={() => buyItem(handSpinnersCost, 1, setSpinnerCost, setSpinners, handSpinners, "Hand Spinners")} /> 

    
       { displayItem(lunchLadies) ? <ItemBuyer itemName="Lunch Lady" rateOfProd = {10} currentCount = {lunchLadies} saladCount = {count} 
        currentCost = {lunchLadiesCost} onClick={() => buyItem(lunchLadiesCost, 10, setLadyCost, setLady, lunchLadies, "Lunch Ladies")}/> 
        : <UnknownItem unlock = {10} delayVal = {600}/> 
        }
   

      
     { displayItem(farms) ? <ItemBuyer itemName="Farm" rateOfProd = {50} currentCount = {farms} saladCount = {count} 
      currentCost = {farmCost} onClick={() => buyItem(farmCost, 50, setFarmCost, setFarms, farms, "Farms")}/> 
      : <UnknownItem unlock = {500} delayVal = {1100}/> 
      }
    
    
      {
       displayItem(mafia) ? <ItemBuyer itemName="Underground Salad Mafia" rateOfProd = {115} currentCount = {mafia} saladCount = {count} 
            currentCost = {mafiaCost} onClick={() => buyItem(mafiaCost, 115, setMafiaCost, setMafia, mafia, "Mafias")}/> 
            : displayUnknown(lunchLadies) && <UnknownItem unlock = {5000}/>
      } 
      
      
      {
       displayItem(town) ? <ItemBuyer itemName="Tomato Town" rateOfProd = {500} currentCount = {town} saladCount = {count} 
            currentCost = {townCost} onClick={() => buyItem(townCost, 500, setTownCost, setTown, town, "Towns")}/> 
            : displayUnknown(farms) && <UnknownItem unlock = {15000}/>

      } 
       
      
      <div className = "header2"> 
        <p style= {{marginTop: 10, }}> <b>{unlockables === 0 ? "No more items to unlock! :D" : 
        `Keep Making Salads to Unlock ${unlockables} More Items!!` }</b></p> 
      </div>

      <div className = "header2"> 
        <p style= {{marginTop: 10, }}> Achievements found: <b> {achievementsNum} </b></p> 
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
