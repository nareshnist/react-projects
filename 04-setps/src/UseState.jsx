
import { useState } from "react";


function UseState() {

    // primitive values 

    const [number, setNumber] = useState(0);
    const [userName, setUserName] = useState('');
    const [userDetails, setUserDetails] = useState(
        {
            name:"naresh",
            phone:7660034328,
            address:{
                permenant: {
                    address:"patha madugula",
                },
                present:{
                        address:"patha madugula",
                }

            }
        }
    );
    const  [users ,setUser]= useState([])

    const handleClick = () => {
        // number update based on previous state
        setNumber(() => number + 1);

        // string update based on previous state
        setUserName(user => 'Naresh royal');

        // using object

        setUserDetails(user => ({
            ...user,
            address:{
                ...user.address,
                present: {
                    address:"kurnool"
                }
            }
        }));


        // Using Arrays

        setUser(users => [...users, {name:"Naresh"},{name:"Pushpa"}]);
    }

    return (
        <>
            <p>Numbers : {number}</p>
            {userName && <p>Strings : {userName}</p>}

            <p>Objects : {userDetails.address.present.address}</p>
            {users.length > 0 &&   <p>Array :{users.map((user,idx) => <b key={`${user.name} + ${idx}`}>{user.name}    </b>)}</p> } 

            <button type="button" onClick={handleClick}>Click Me</button>
        </>
    )
}

export default UseState;