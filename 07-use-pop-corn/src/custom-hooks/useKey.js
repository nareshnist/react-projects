const { useEffect } = require("react");


function useKay(key,cb) {


    useEffect(() =>{




        return () =>{
            document.removeEventListener('keypress',cb);
        }
    },[key])

}