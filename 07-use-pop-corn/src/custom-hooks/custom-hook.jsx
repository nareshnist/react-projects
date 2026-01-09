import { useCounter } from "./useCounter";
import { useFetch } from "./useFetch";
import Search from "./Search";
import PostCreate from './postCreate'

function Customhook() {

   const {
        count,
        increment,
        decrement
   } = useCounter();

   const{ data,isLoading,error} = useFetch('https://jsonplaceholder.typicode.com/posts');
   

//    ✅ Logic reused
//    ✅ Component stays clean

    return (
        <div>
                <h1>Custom hook</h1>
                <p>count : {count}</p>

                <button type="button" onClick={increment}>Increment</button>
                <button type="button" onClick={decrement}>Increment</button>

               {
                isLoading &&  <p>Loading</p>
               }

               {
                    data && data.length > 0 &&  <p>Data is READY</p>
               }

               {
                error && <p style={{color:"red"}}>
                    {
                        error
                    }
                </p>
               }

               <Search />
               <PostCreate />
        </div>
    )
}

export default Customhook;
