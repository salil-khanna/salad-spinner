import Button from './Button'


const ItemBuyer = ({itemName, rateOfProd, currentCount, currentCost, onClick, saladCount}) => {


    function roundTo(num) {
        return +(Math.round(num + "e+3")  + "e-3");
      }

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
    <div className = "header2">
        <p > <b>{itemName}</b>: Produces {rateOfProd} Salads per Second (Current Count = {currentCount}) </p>
        <Button text = {"Click to Buy For " + adjDisp(currentCost) + " salads"} onClick={onClick} 
          color = {saladCount >= currentCost ? "green" : "red"}
        />
      </div>
    )
}

export default ItemBuyer
