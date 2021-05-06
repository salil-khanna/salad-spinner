import {useState, useEffect} from 'react'
import unknown from './images/unknown.png'
import Button from './Button'
import Tooltip from "react-simple-tooltip"

const DisplayAchievement = ({achievements}) => {
    const [openAchieve, setOpenAchieve] = useState(false);
    const unknownAchieve = {text: "Achievement Not Found Yet", image: unknown}

    const [width, setWidth] = useState(window.innerWidth);
    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    let isMobile = (width <= 768);

    return (
        <div style={{textAlign: 'center'}}>
            <Button color = "maroon" text = {openAchieve ? 'Close Stats and Achievements' : 'View Stats and Achievements'} onClick={() => setOpenAchieve(!openAchieve)}/>

            {openAchieve && 
            <div className="container" style={{margin: 10 }}>

                <div className={isMobile ? "imageDiv2" : "imageDiv"} style= {{textAlign: 'center'}}>
                    <Tooltip content={unknownAchieve.text}>
                        <img src={unknownAchieve.image} alt="achievement"></img>
                    </Tooltip>
                </div>
                 
            
            
            </div>}
        </div>
    )
}

export default DisplayAchievement
