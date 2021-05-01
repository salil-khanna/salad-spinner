import React from 'react'
import { useSpring, animated as a} from 'react-spring'

const UnknownItem = ({unlock}) => {
    return (
        <a.div style = {useSpring({from: { opacity: 0 }, to: { opacity: 1 }, config: { duration: 1000 }, delay: 900, }) }>
            <div className = "header2">
            <p > <b>???</b> Unlocks at {unlock} total salads </p>
            </div>
        </a.div>
    )
}

export default UnknownItem
