import { useState, useRef, useEffect } from "react";

export default function MainComponent(){

    const [start, setStart] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const [btn, setBtn] = useState(0);
    const [text, setText] = useState("Click anywhere to begin")
    const bgRef = useRef();
    const startTimeRef = useRef(0);
    const intervalRef = useRef(); 

    function handleClick(){

        if(btn == 0){

            setStart(true);
            setBtn(1);

        }
        else if(btn == 1){

            bgRef.current.style.backgroundImage = "url('/5.png')";
            bgRef.current.style.WebkitTextStroke = "1px white";
            setText("The fuck are you shooting at ?\nClick anywhere to start again");
            setBtn(0);
            setStart(false);

        }
        else{

            if(elapsed < 250){

                bgRef.current.style.backgroundImage = "url('/4.png";
                setText(`you reacted in ${elapsed} ms\ndonk from spirit frfr\nClick anywhere to start again`);

            }
            else if(elapsed < 300){

                bgRef.current.style.backgroundImage = "url('/6.png";
                setText(`you reacted in ${elapsed} ms\nyou are pretty tough for a silver\nClick anywhere to start again`);

            }
            else{

                bgRef.current.style.backgroundImage = "url('/3.png";
                setText(`you reacted in ${elapsed} ms\nput the fries in the bag old man get off cs\nClick anywhere to start again`);


            }
            bgRef.current.style.WebkitTextStroke = "1px white";
            setBtn(0);
            setIsRunning(false);
            setStart(false);

        }

    }

    useEffect(() => {

        if(start){

            bgRef.current.style.backgroundImage = "url('/1.webp')";
            setText("");

            let delay = Math.random() * (6000 - 600 + 1) + 600;
            const timer = setTimeout(() => {

                setBtn(2);
                bgRef.current.style.backgroundImage = "url('/2.webp')"
                setIsRunning(true);
                startTimeRef.current = Date.now();

            }, delay)


            return () => clearTimeout(timer);

        }

    }, [start]);

    useEffect(() => {

        if(isRunning){

            intervalRef.current = setInterval(() => {

                setElapsed(Date.now() - startTimeRef.current);

            }, 1)

        }

        return () => clearInterval(intervalRef.current);

    }, [isRunning]);

    return(

        <div className="container" onClick={handleClick} ref={bgRef}>
        
            {text}

        </div>

    )

}