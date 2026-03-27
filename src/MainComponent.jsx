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
    const btnRef = useRef(0); 

    useEffect(() => {

        const imagePaths = ['/1.webp', '/2.webp', '/3.png', '/4.png', '/5.png', '/6.png'];
        const images = imagePaths.map(src => {
            const img = new Image();
            img.src = src;
            return img;
        });

    }, []); // snatched this function from AI because i do not understand a damn thing.

    function handleClick(){

        if(btnRef.current == 0){

            setStart(true);
            btnRef.current = 1;

        }
        else if(btnRef.current == 1){

            bgRef.current.style.backgroundImage = "url('/5.png')";
            bgRef.current.style.WebkitTextStroke = "1px white";
            setText("The fuck are you shooting at ?\nClick anywhere to start again");
            btnRef.current = 0;
            setStart(false);

        }
        else{

            if(elapsed < 250){

                bgRef.current.style.backgroundImage = "url('/4.png')";
                setText(`you reacted in ${elapsed} ms\ndonk from spirit frfr\nClick anywhere to start again`);

            }
            else if(elapsed < 300){

                bgRef.current.style.backgroundImage = "url('/6.png')";
                setText(`you reacted in ${elapsed} ms\nyou are pretty tough for a silver\nClick anywhere to start again`);

            }
            else{

                bgRef.current.style.backgroundImage = "url('/3.png')";
                setText(`you reacted in ${elapsed} ms\nput the fries in the bag old man get off cs\nClick anywhere to start again`);


            }
            bgRef.current.style.WebkitTextStroke = "1px white";
            btnRef.current = 0;
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

                btnRef.current = 2;
                bgRef.current.style.backgroundImage = "url('/2.webp')"
                startTimeRef.current = Date.now();
                setIsRunning(true);

            }, delay)


            return () => clearTimeout(timer);

        }

    }, [start]);

    useEffect(() => {

        if(isRunning){

            intervalRef.current = setInterval(() => {

                setElapsed(Date.now() - startTimeRef.current);

            }, 10)

        }

        return () => clearInterval(intervalRef.current);

    }, [isRunning]);

    return(

        <div className="container" onClick={handleClick} ref={bgRef}>
        
            {text}

        </div>

    )

}