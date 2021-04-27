import PropTypes from 'prop-types'
import Button from './Button';

const Header = ({onClick, stopGame, pauseGame}) => {
    

    return (
        <header className= 'header'>
            <h1 > <u> Salad Spinner:</u> A healthy alternative to cookie clicker! </h1> 
            <h2 >  </h2>
            <Button text = {stopGame ? 'Play' : 'Pause'} onClick={pauseGame} color = 'black'/>
            <Button text = 'Reset Game' onClick={onClick} color = 'black'/>
            
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
