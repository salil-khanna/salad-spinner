//Imports For Components
import Header from './components/Header'
import Button from './components/Button'
import ItemBuyer from './components/ItemBuyer'
import UnknownItem from './components/UnknownItem';
import Confetti from 'react-confetti'
import swal from 'sweetalert';

//Imports for Hooks
import {useState, useEffect } from 'react'
import { toast, ToastContainer } from "react-toastify";
import {useWindowSize} from 'react-use';

//Imports for Styling
import './App.css';
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [stopGame, setGameState] = useState(false);

  const [totalSalads, setTotal] = useState(0);
  const [totalHandSalads, setTotalHandSalads] = useState(0);

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

  const [arrayOfItems, setArray] = useState([
    {val: 0, key: 100} , {val: 0, key: 101}, 
    {val: 0, key: 102} , {val: 0, key: 103}, 
    {val: 0, key: 104}
  ]);

  ////////////////////////////////////////////////////////////////////////
  ////////////////////////// SECTION FOR ACHIEVEMENTS CODE ///////////////
  ////////////////////////////////////////////////////////////////////////
  let achievementList = [
    { key: 1, text: "Your first salad! They grow up so fast :')", found: false, },
    { key: 2, text: "30s on Deck: Solid work chief!", found: false, },  
    { key: 3, text: "Nice.", found: false, },
    { key: 4, text: "100s On The Board: I think this means you win now", found: false, },
    { key: 5, text: "Pausing the Game: Bathroom break I guess?", found: false, },
    { key: 6, text: "Lucky 5s: Jeff Bezos Who?", found: false, },
    { key: 7, text: "Salads per Second @ 50: Now this is spinning out of control...", found: false, },
    { key: 8, text: "Salads per Click @ 10: Your fingers must be tired", found: false, }, 
    { key: 9, text: "Visiting My Site: Awwwww, thank you so much <3", found: false, }, 
    { key: 10, text: 'Viewing the Code: console.log("Ha, Nerd.")', found: false, }, 
    { key: 11, text: "Buying In Red: Debt really isn't fun", found: false, }, 
    { key: 12, text: "Disabling Confetti: Party Pooper.", found: false, }, 
    { key: 13, text: "Clicked 10k All Time Salads: Started from the bottom now we here.", found: false, },
    { key: 100, text: "Own 1 Hand Spinner: We All Start Somewhere", found: false, }, 
    { key: 101, text: "Own 1 Lunch Lady: Whats for lunch?", found: false, },
    { key: 102, text: "Own 1 Farm: Land Development!", found: false, },
    { key: 103, text: "Own 1 Mafia: Doesn't the mafia usually own you?", found: false, },
    { key: 104, text: "Own 1 Town: Fortnite x Salad Spinner When?", found: false, },
    { key: 110, text: "Own 10 Hand Spinners: Spin Spin Spin away, Spin Spin Spin all day...", found: false, }, 
    { key: 111, text: "Own 10 Lunch Ladies: This cafeteria is getting a bit crowded", found: false, },
    { key: 112, text: "Own 10 Farms: I think we'll need a bigger scarecrow...", found: false, },
    { key: 113, text: "Own 10 Mafias: Didn't know the GodFather loved Salad", found: false, },
    { key: 114, text: "Own 10 Towns: ~Number 1 Victory Royale~", found: false, },
    { key: 120, text: "Own 50 Hand Spinners: Automation is the future", found: false,}, 
    { key: 121, text: "Own 50 Lunch Ladies: I think Michelle Obama's plan is working", found: false, },
    { key: 122, text: "Own 50 Farms: We are Farmers, bum ba dum bum bum bum bum", found: false, },
    { key: 123, text: "Own 50 Mafias: So thats why it's called Italian Caesar Dressing", found: false, },
    { key: 124, text: "Own 50 Towns: ~Just Wiped Out Tomato Town~", found: false, },
    ];

    const [achievements, setAchievements] = useState(achievementList)
    const [achievementsNum, setAchievementsNum] = useState(0);
    const [confetti, setConfetti] = useState(0);
    const [showConfetti, setShowConfetti] = useState(true);

    const {width, height} = useWindowSize();

    /**
     * Use effect in adjusting confetti
     */
    useEffect(() => {
      if (achievementsNum === 0) {
        setConfetti(0);
      } else {
        setConfetti(200);
      }
      setTimeout(() => {
        setConfetti(0);
      }, 2000)
    }, [achievementsNum]);

    /**
     * Helps in displaying an achievement and incrementing the number of achievements
     * 
     * @param {*} text the text of the achievement to be displayed as a toast 
     * @returns a generated toast with the text input
     */
    function achievementToastGen(text) {
      setAchievementsNum(c => c + 1);
      return  toast.dark(text, {
        position: "bottom-center",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        });
    }

    /**
     * Helps in remapping the list of achievemets so that they will not be repeated
     * 
     * @param {*} val the key for achievement list
     */
    const adjustAchievements = (val) => {
     setAchievements( achievements.filter( (achievement) => {
          return !achievement.found
      }).map( (achievement) => {
          if (achievement.key === val) {
              achievementToastGen(achievement.text)
              return {key: achievement.key, text: achievement.text, found: true}
          } else {
              return achievement;
          }
      }))
    }

  ///////////////////////////////////////////////////////////////////
  /////////// END OF SETTING STATES AND STUFF ///////////////////////
  ///////////////////////////////////////////////////////////////////


  /**
   * Use effect when game is first generated
   */
  useEffect(() => {
    setConfetti(0);
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


  /**
   * What occurs when the main button to add salads is pressed
   * 
   * @param {*} addVal the value to be added by (usually the click rate)
   */
  function onclick1(addVal) {
    if (totalSalads === 0) {
      adjustAchievements(1);
    }
    if (totalHandSalads + addVal >= 9999) {
      adjustAchievements(13);
    }
    setCount(c => c + parseInt(addVal));
    setTotal(c => c + parseInt(addVal));
    setTotalHandSalads(c => c + parseInt(addVal));

  }

  /**
   * Helps in rounded the number to 3 digits
   * 
   * @param {*} num the number to be rounded
   * @returns the rounded number
   */
  function roundTo(num) {
    return +(Math.round(num + "e+3")  + "e-3");
  }

  /**
   * Use effect is for updating the number of salads every 0.1 seconds based on if the game is in play
   */
  useEffect(() => {
    const timer = setInterval(() => {
        if (!stopGame) {
            setTotal(c => roundTo(parseFloat(c) + parseFloat((rate/10.0))));
            setCount(c => roundTo(parseFloat(c) + parseFloat((rate/10.0))));
        }
    }, 100);
    return () => clearTimeout(timer);
  }, [stopGame, rate]);

  /**
   * Use effect is for adjusting the clickrate
   */
  useEffect(() => {
    if (!rate) {
      setClickRate(1);
    } else {
      setClickRate(Math.ceil(rate / 15))
    }
  }, [rate])

  /**
   * Sets the gamestate to the opposite when clicked and also generates an achievement for it
   */
  function changeGame() {
    setGameState(!stopGame);
    adjustAchievements(5);
  }

  /**
   * Generates an achievement for viewing my personal site
   */
  function viewSite() {
    adjustAchievements(9);
  }

  /**
   * Generates an achievement for viewing the code for Salad Spinner
   */
  function viewCode() {
    adjustAchievements(10);
  }

  
  /**
   * Generates an achievement for disabling the confetti
   */
   function changeConfetti(e) {
    setShowConfetti(e.currentTarget.checked)
    adjustAchievements(12);
  }

  /**
   * Helps in adjusting the displayed number so that it will be rounded with a label 
   * 
   * @param {*} valueToBeFixed the number to be rounded
   * @returns a number which is rounded with a label
   */
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
   * Determines if all the counts are past a certain number
   * 
   * @param {*} pastVal the number that all the vaues should be past by
   * @param {*} copyArrayItems the copied array of total values as states update async
   * @returns a boolean determining if all items in the copy array are above the pastVal
   */
  function checkAllPast(pastVal, copyArrayItems) {
    const val = copyArrayItems.every((item) => 
      item.val >= pastVal
    );
    return val;
  }

  /**
   * Determining the rate achievements as updates to the rate are async
   * 
   * @param {*} rateAdj the amount the rate will be adjusted by
   */
  function updateRateAchieve(rateAdj) {
    const tempRate = rateAdj + rate;
    const tempClickRate = Math.ceil(tempRate / 15);
    if (tempRate >= 50) {
      adjustAchievements(7);
    }
  
    if (tempClickRate >= 10) {
      adjustAchievements(8);
    }
  
  }

  /**
   * All the changes to be made when a new item is bought, as well as all achievements
   * 
   * @param {*} cost cost of the items
   * @param {*} rateAdj how much to increase the rate of production by
   * @param {*} itemCostAdj the corresponding function which allows the new cost to be set
   * @param {*} itemNumAdj the correspond function which allows the new number of items to be set
   */
  function buyItem(cost, rateAdj, itemCostAdj, itemNumAdj, item, achievementKey) {
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
      adjustAchievements(11);
    } else {

      let copyArrayItems = arrayOfItems;
      copyArrayItems = copyArrayItems.map((item) => {
        if (item.key === achievementKey) {
          return {val: item.val + 1, key: item.key}
        } else {
          return item;
        }
      })
      
      if (item === 4 && checkAllPast(5, copyArrayItems)) {
        adjustAchievements(6)
      } 
      if (item === 29 && checkAllPast(30, copyArrayItems)) {
        adjustAchievements(2)
      } 
      if (item === 68 && checkAllPast(69, copyArrayItems)) {
        adjustAchievements(3)
      } 
      if (item === 99 && checkAllPast(100, copyArrayItems)) {
        adjustAchievements(4)
      }

      setArray(copyArrayItems);
      
      if (item === 0) {
      adjustAchievements(achievementKey);
      } 
      if (item === 9) {
        adjustAchievements(achievementKey + 10);
      }
      if (item === 49) {
        adjustAchievements(achievementKey + 20);
      }

      setCount(c => roundTo(c - cost))
      setRate(c => c + rateAdj);
      updateRateAchieve(rateAdj);
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
   * Use Effect is for unlocking achivements related to achievementsNum
   */
  useEffect(() => {

    if (achievementsNum === 5) {
      achievementToastGen("5 achievements: You've hit the big leagues!");
    }

    if (achievementsNum === 15) {
      achievementToastGen("15 achievements: I think you should pick up another hobby");
    }

    if (achievementsNum === 31) {
      achievementToastGen("Unlocked All Achievements: Go home, I'm out of things for you to do");
    }

  }, [achievementsNum])


  /**
   * Used in determining if the item should be displayed
   * 
   * @param {*} unlockVal the item to be unlocked
   * @returns a boolean determining whether the value should be unlocked.
   */
  function displayItem(unlockVal) {
    return unlockVal !== -1;
  }

  /**
   * Used in determining if the item should be displayed as an unknown item
   * 
   * @param {*} prevVal the value determined if negative 1
   * @returns the boolean determining if the item is unknown or not
   */
  function displayUnknown(prevVal) {
    return prevVal > -1;
  }

  /**
   * Function runs when hitting reset button, allows for modal message if confirming the reset,
   * and if so, then function resets.
   */
  async function resetGame() {

    const willDelete = await swal({
      title: "Are you sure you want to reset your progress?",
      icon: "warning",
      dangerMode: true,
      buttons: ["Cancel", "Ok"],
    });
    
    if (willDelete) {
      
      setTotal(0);
      setTotalHandSalads(0);
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
      
      setShowConfetti(true);
      setArray([{val: 0, key: 100} , {val: 0, key: 101}, 
        {val: 0, key: 102} , {val: 0, key: 103}, 
        {val: 0, key: 104}])
      setAchievements(achievementList);
      setAchievementsNum(0);
      
      await swal("Your game has been reset!", "", "success");
      
    }
  
  }


  return (

    <div className="container">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={confetti} gravity={0.3}/> }

      <Header onClick={resetGame} stopGame={stopGame} pauseGame = {changeGame} viewSite = {viewSite}/>

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
      
      <p className="header3" > <b>Salad Stats</b></p>

      <div className = "header2">
        <p>Total Salads: {adjDisp(count)} </p>        
      </div>
   
      <div className = "header2">
         <p >Salads per Second: {adjDisp(rate)} </p>  
         <Button color = "limeGreen" text = 'Click to Add Salad!' onClick={() => onclick1(clickRate)} />       
       </div>

      <div className = "header2"> 
        <p>Salads per Click: {adjDisp(clickRate)}</p> 
      </div>

      <ItemBuyer itemName="Hand Spinners" rateOfProd = {1} currentCount = {handSpinners} saladCount = {count} delayAmount = {100}
        currentCost = {handSpinnersCost} onClick={() => buyItem(handSpinnersCost, 1, setSpinnerCost, setSpinners, handSpinners, 100)} /> 

    
      { displayItem(lunchLadies) ? <ItemBuyer itemName="Lunch Lady" rateOfProd = {10} currentCount = {lunchLadies} saladCount = {count} 
          currentCost = {lunchLadiesCost} onClick={() => buyItem(lunchLadiesCost, 10, setLadyCost, setLady, lunchLadies, 101)}/> 
          : <UnknownItem unlock = {10} delayVal = {600}/> 
      }
   

      
     { displayItem(farms) ? <ItemBuyer itemName="Farm" rateOfProd = {50} currentCount = {farms} saladCount = {count} 
        currentCost = {farmCost} onClick={() => buyItem(farmCost, 50, setFarmCost, setFarms, farms, 102)}/> 
        : <UnknownItem unlock = {500} delayVal = {1100}/> 
      }
    
    
      {
       displayItem(mafia) ? <ItemBuyer itemName="Underground Salad Mafia" rateOfProd = {115} currentCount = {mafia} saladCount = {count} 
          currentCost = {mafiaCost} onClick={() => buyItem(mafiaCost, 115, setMafiaCost, setMafia, mafia, 103)}/> 
          : displayUnknown(lunchLadies) && <UnknownItem unlock = {5000}/>
      } 
      
      
      {
       displayItem(town) ? <ItemBuyer itemName="Tomato Town" rateOfProd = {500} currentCount = {town} saladCount = {count} 
          currentCost = {townCost} onClick={() => buyItem(townCost, 500, setTownCost, setTown, town, 104)}/> 
          : displayUnknown(farms) && <UnknownItem unlock = {15000}/>

      } 
      
      <div className = "header2" style = {{marginTop: 10, justifyContent: 'space-between'}}> 
        <p > <b>{unlockables === 0 ? "No more items to unlock! :D" : 
        `Keep Making Salads to Unlock ${unlockables} More Items!!` }</b></p> 
        <p > Achievements found: <b> {achievementsNum} / 31 </b></p> 
       
      </div>
      
      <div style ={{ marginTop: 10}}>
        <p style={{float: 'left', }}><b>Click to {showConfetti ? "Disable" : "Enable"} Confetti </b></p>
        <input type='checkbox' style={{ margin: 5, marginLeft: 10, }} checked = {showConfetti} value = {showConfetti} onChange={changeConfetti}/>
      </div>

      <div > 
        <footer>
          Developed by Salil Khanna @ <a href="https://www.salilkhanna.com" 
          target= "_blank" style = {{color:"goldenrod"}} rel="noreferrer" onClick = {viewSite}> salilkhanna.com</a> with React JS
          <br></br>
          <a href="https://github.com/salil-khanna/salad-spinner" onClick = {viewCode} target= "_blank" style = {{color:"goldenrod"}} 
          rel="noreferrer"> View the Code Here </a>
        </footer>
      </div>

    </div>
  );
}

export default App;
