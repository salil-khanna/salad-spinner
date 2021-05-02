import {useState, useEffect, useCallback, useMemo} from 'react'
import { toast } from "react-toastify";

const AchievementHandler = 
({stopGame, totalSalads, count, rate, clickRate, unlockables, 
    handSpinners, handSpinnersCost, lunchLadies, lunchLadiesCost,
farms, farmCost, mafia, mafiaCost, town, townCost, reset}) => {

    const achievementList = useMemo(() => [
        {
            key: 1,
            text: "Your first salad! They grow up so fast :')",
            found: false,
        },
        {
            key: 2,
            text: "We All Start Somewhere",
            found: false,
        }, 
        {
            key: 3,
            text: "You unlocked all items!",
            found: false,
        },
        {
            key: 4,
            text: "5 achievements, you've hit the big leagues!",
            found: false,
        },
        {
            key: 5,
            text: "Bathroom break I guess?",
            found: false,
        }

    ], [])
    const [achievements, setAchievements] = useState(achievementList)
    const [achievementsNum, setAchievementsNum] = useState(0);


    useEffect(() => {
        console.log(reset);
        setAchievements(achievementList);
        setAchievementsNum(0);
    }, [reset, achievementList])


    function achievementTostGen(text) {
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

      const adjustAchievements = useCallback((val) => {
        const result = achievements.filter((achievement) => {
            return !achievement.found
        }).map((achievement) => {
            if (achievement.key === val) {
                achievementTostGen(achievement.text)
                setAchievementsNum(c => c + 1);
                return {...achievement, found: true}
            } else {
                return achievement;
            }
        })

        setAchievements(result);
      }, [achievements])

      useEffect(() => {
        if (totalSalads === 1) {
            adjustAchievements(1);
        }

        if (handSpinners === 1) {
            adjustAchievements(2);
        }

        if (unlockables === 0) {
            adjustAchievements(3);
        }
        
        if (achievementsNum === 5) {
            adjustAchievements(4);
        }

        if (stopGame) {
            adjustAchievements(5);
        }


      
      }, [stopGame, totalSalads, count, rate, clickRate, unlockables, 
        handSpinners, handSpinnersCost, lunchLadies, lunchLadiesCost,
        farms, farmCost, mafia, mafiaCost, town, townCost, achievementsNum, reset, adjustAchievements])

    return (
        <div>

        </div>
    )
}

export default AchievementHandler
