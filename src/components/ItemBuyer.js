import Button from './Button'
import { useSpring, animated as a} from 'react-spring'

/**
 * 
 * @param {*} param0 all the props
 * @returns the react component for an item that can be bought
 */
const ItemBuyer = ({itemName, rateOfProd, currentCount, currentCost, onClick, saladCount, delayAmount}) => {

  /**
   * Rounds a number to three places
   * 
   * @param {*} num the number to be rounded
   * @returns the rounded number
   */
  function roundTo(num) {
    return +(Math.round(num + "e+3")  + "e-3");
  }

  /**
   * Helps in adjusting to value to be displayed
   * 
   * @param {*} valueToBeFixed the value needing a rounding as well as the label
   * @returns the rounded value with a label
   */
  function adjDisp(valueToBeFixed) {
    if (valueToBeFixed > Math.pow(10,15) ) {
      return roundTo(valueToBeFixed/Math.pow(10,15)) + "quad";
    } else if (valueToBeFixed > Math.pow(10,12) ) {
      return roundTo(valueToBeFixed/Math.pow(10,12)) + "tril";
    } else if (valueToBeFixed > Math.pow(10,9) ) {
      return roundTo(valueToBeFixed/Math.pow(10,9)) + "bil";
    } else if (valueToBeFixed > Math.pow(10,6) ) {
      return roundTo(valueToBeFixed/Math.pow(10,6)) + "mil";
    } else if (valueToBeFixed > Math.pow(10,3)) {
      return roundTo(valueToBeFixed/Math.pow(10,3)) + "k";
    } else {
      return valueToBeFixed;
    }
  }

  return (
    <a.div style = {useSpring({from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 }, delay: delayAmount, }) }>
      <div className = "header2">
        <p > <b>{itemName}</b>: Produces {rateOfProd} Salads per Second (Current Count = {currentCount}) </p>
        <Button text = {"Click to Buy For " + adjDisp(currentCost) + " salads"} onClick={onClick} 
          color = {saladCount >= currentCost ? "green" : "red"}
        />
      </div>
    </a.div>
  )
    
}

export default ItemBuyer
