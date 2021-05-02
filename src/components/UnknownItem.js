import React from 'react'
import { useSpring, animated as a} from 'react-spring'

const UnknownItem = ({unlock, delayVal}) => {
    return (
        <a.div style = {useSpring({from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 }, delay: delayVal, }) }>
            <div className = "header2">
            <p style= {{marginBottom: 5, marginTop: 5}}> <b>???</b> Unlocks at {unlock} total salads </p>
            </div>
        </a.div>
    )
}

UnknownItem.defaultProps = {
    delayVal : 500,
}

export default UnknownItem
