import {useState, useEffect, useCallback, useMemo} from 'react'
import { toast } from "react-toastify";

const AchievementHandler = 
({stopGame, totalSalads, count, rate, clickRate, unlockables, 
    handSpinners, handSpinnersCost, lunchLadies, lunchLadiesCost,
farms, farmCost, mafia, mafiaCost, town, townCost, reset, viewPage}) => {

    const achievementList = useMemo(() => [
        {
            key: 1,
            text: "Your first salad! They grow up so fast :')",
            found: false,
        },
        {
            key: 2,
            text: "Own 1 Salad Spinner: We All Start Somewhere",
            found: false,
        }, 
        {
            key: 3,
            text: "You unlocked all items! Now touch some grass",
            found: false,
        },
        {
            key: 4,
            text: "5 achievements: You've hit the big leagues!",
            found: false,
        },
        {
            key: 5,
            text: "Pausing the Game: Bathroom break I guess?",
            found: false,
        },
        {
            key: 69,
            text: "Nice.",
            found: false,
        },
        {
            key: 6,
            text: "Unlocked All Achievements: Go home, I'm out of things for you to do",
            found: false,
        },
        {
            key: 7,
            text: "Salads per Second > 50: Now this is spinning out of control...",
            found: false,
        },
        {
            key: 8,
            text: "Salads per Click > 10: Your fingers must be tired",
            found: false,
        }, 
        {
            key: 9,
            text: "Own 1 Lunch Lady: Whats for lunch?",
            found: false,
        },
        {
            key: 10,
            text: "Own 1 Farm: Land Development!",
            found: false,
        },
        {
            key: 11,
            text: "Own 1 Mafia: Am I in debt??",
            found: false,
        },
        {
            key: 12,
            text: "Own 1 Town: Fortnite x Salad Spinner When?",
            found: false,
        },
        {
            key: 13,
            text: "Visit My Site: How thoughtful of you <3",
            found: false,
        },
        

    ], [])
    const [achievements, setAchievements] = useState(achievementList)
    const [achievementsNum, setAchievementsNum] = useState(0);


    useEffect(() => {
        console.log(reset);
        setAchievements(achievementList);
        setAchievementsNum(0);
    }, [reset, achievementList])


    function achievementToastGen(text) {
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
                achievementToastGen(achievement.text)
                setAchievementsNum(c => c + 1);
                return {...achievement, found: true}
            } else {
                return achievement;
            }
        })

        setAchievements(result);
      }, [achievements])

      useEffect((achievementList) => {
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

        if (handSpinners === 69 && lunchLadies === 69 && 
            farms === 69 && mafia === 69 && town === 69) {
            adjustAchievements(69);
        }

        if (achievementsNum === achievements.length) {
            adjustAchievements(6);
        }

        if (rate >= 50) {
            adjustAchievements(7);
        }

        if (clickRate >= 10) {
            adjustAchievements(8);
        }

        if (lunchLadies === 1) {
            adjustAchievements(9);
        }

        if (farms === 1) {
            adjustAchievements(10);
        }

        if (mafia === 1) {
            adjustAchievements(11);
        }

        if (town === 1) {
            adjustAchievements(12);
        }

        if (viewPage) {
            adjustAchievements(13);
        }
      
      }, [stopGame, totalSalads, count, rate, clickRate, unlockables, 
        handSpinners, handSpinnersCost, lunchLadies, lunchLadiesCost,
        farms, farmCost, mafia, mafiaCost, town, townCost, achievements, 
        achievementsNum, reset, adjustAchievements, viewPage])

    return (
        <div>

        </div>
    )
}

export default AchievementHandler
