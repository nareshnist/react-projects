import { useEffect, useRef } from "react"

// lift up examples
function Form({searchPost,onChange}) {


  const inputElement =   useRef(null);
  const countRef = useRef(0);
  let count = 0;


    // useEffect(() => {

        // This is not correct way to access the dom in react.
        // const el = document.getElementById("input");
        // console.log(el)
        // el.focus();

      


    // },[]);


      // since react is an declarative , refs are best wat to do it (accessing the dom)
        // useReft is 3 steps process.
        
        // step 1 import and assigne default vaklie
        // step 2 use in the html element useng ref={ref_variable}
        // step3 accessing element


    useEffect(() => {
       
      const handleEvent =  function(e){
          console.log(inputElement.current);
          console.dir(e)

          if(document.activeElement === inputElement.current) return;
          if(e.code ==='Enter'){
            inputElement.current.focus();
            onChange('')
          }
      }


      document.addEventListener('keydown',handleEvent);

      return () =>{
         document.removeEventListener('keydown',handleEvent);
      }
       
    },[onChange]);



    // another example is persisiting the value between rendedrs without re rendter the dom 
    // ex event the how many characters enter into the serach box


    useEffect(() =>{
        if(searchPost){ //. if we don't add if condition for onload also it will count as 1 
            // have doubt remove if condition and check it once.
            countRef.current +=1;
            count += 1;
            // normal variable does not persisted 

        }

        
       
    },[searchPost]);
    
    return (
        <div style={{padding:"10rem"}}>
            <label htmlFor="searchpost">Search Post :</label>
            <input ref={inputElement} id="input" style={{padding:"1rem"}} type="text" placeholder="Search Post" value={searchPost}  onChange={(e) => onChange(e.target.value)}/>
        </div>
    )
}

export default Form
