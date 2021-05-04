/**
 * 
 * @param {*} param0 props destructered
 * @returns code for a basic button with inputted function, text, and color
 */
const Button = ({color, text, onClick}) => {
    
    return (
        <div>
              <button onClick={onClick} style = {{backgroundColor : color}} className= 'btn'>
                  {text}
            </button>  
        </div>
    )
}

export default Button
