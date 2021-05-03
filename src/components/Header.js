import PropTypes from 'prop-types'
import Button from './Button';

const Header = ({onClick, stopGame, pauseGame, viewSite}) => {
    
    

    return (
        <header className= 'header'>
            <h1 > <u> Salad Spinner:</u> A healthy alternative to cookie clicker! </h1> 

            
            <Button text = {stopGame ? 'Play' : 'Pause'} onClick={pauseGame} color = 'black'/>
            <Button text = 'Reset Game' onClick={onClick} color = 'black'/>
            <a href="https://www.salilkhanna.com" rel="noreferrer"
             target= "_blank" style = {{backgroundColor : 'goldenrod'}} onClick = {viewSite} className= 'btn'>
                Salil's Personal Page
            </a>  
            
        </header>
       
    )
}

Header.defaultProps = {
    title: 'Task Tracker',

}

Header.propTypes = {
    onClick: PropTypes.func.isRequired,

}


export default Header
