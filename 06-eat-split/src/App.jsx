import { useState } from 'react'
import './App.css'

function App() {

  const initialFriends = [
    {
      id: 118836,
      name: "Clark",
      image: "https://i.pravatar.cc/48?u=118836",
      balance: -7,
    },
    {
      id: 933372,
      name: "Sarah",
      image: "https://i.pravatar.cc/48?u=933372",
      balance: 20,
    },
    {
      id: 499476,
      name: "Anthony",
      image: "https://i.pravatar.cc/48?u=499476",
      balance: 0,
    },
  ];

  const [friends, setFriends] = useState(initialFriends)
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [selectedFriend,setSelectedFriend] = useState(null);

  const text = showAddFriend ? 'Close' : 'Add Friend';

  const handleShowAddFriend = () => {
    setShowAddFriend(show => !show);
  }

  const handleAddFriend = (friend) => {
    setFriends(friends => [...friends, friend]);
    setShowAddFriend(false);
  }

  function handleSelection(frined){
    // setSelectedFriend(frined)

    setSelectedFriend(selected => selected?.id === frined?.id ? null : frined);
    setShowAddFriend(false);
   
  }

  function handleSplitBill(value){
    console.log("spilt fill", value);
    setFriends(friends => friends.map(friend => friend.id === selectedFriend.id ? {...friend ,balance: value + friend?.balance}: friend));
    setSelectedFriend(null);
  } 
 
  return (
    <div className='app'>
      <div className='sidebar'>
        <FriendsList friends={friends} onSelectedFriend={handleSelection} selectedFriend={selectedFriend} />
        {showAddFriend && <FormAddFriend onAddFriend={handleAddFriend} />}
        <Button text={text} onClick={handleShowAddFriend} />
      </div>

      {selectedFriend && <FormSplitBill friend={selectedFriend} onSplitBill={handleSplitBill} />}
    </div>
  )
}


function FriendsList({ friends,onSelectedFriend ,selectedFriend}) {


  return (
    <>
      <ul>
        {
          friends.map((friend) => <Friend friend={friend} selectedFriend={selectedFriend} key={friend.id} onSelectedFriend={()=> onSelectedFriend(friend)} />)
        }
      </ul>
    </>
  )
}

function Friend({friend,selectedFriend,onSelectedFriend}) {
  const isSelectd = selectedFriend?.id === friend?.id

  return (
    <li className={`${isSelectd} ? 'selected' :''`}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && <p className='red'>You owe {friend.name} {Math.abs(friend.balance)}</p>}
      {friend.balance > 0 && <p className='green'> {friend.name}  owe you {Math.abs(friend.balance)}</p>}
      {friend.balance === 0 && <p >You and {friend.name} are even</p>}
      <Button text={isSelectd ? 'Clsoe' :'Select'} onClick={onSelectedFriend} />
    </li>
  )
}


function FormAddFriend({ onAddFriend }) {
  const [friendName, setFriendName] = useState('');
  const [fiendimageUrl, setFiendimageUrl] = useState('https://i.pravatar.cc/48');


  const handleSubmit = (e) => {
    e.preventDefault();

    if (!friendName || !fiendimageUrl) return;

    const id = crypto.randomUUID(32);
    const newFrined = {
      id,
      name: friendName,
      image: `${fiendimageUrl}?=${id}`,
      balance: 0,
    }



    onAddFriend(newFrined)
    setFriendName('');
    console.log(newFrined);
  }


  return (
    <form className='form-add-friend' onSubmit={handleSubmit}>
      <label >Friend name</label>
      <input type="text" value={friendName} onChange={(e) => setFriendName(e.target.value)} />
      <label >Image Url</label>
      <input type="text" value={fiendimageUrl} onChange={(e) => setFiendimageUrl(e.target.value)} />
      <Button text='Add' />
    </form>
  )
}

function FormSplitBill({friend,onSplitBill}) {

  const [bill,setBill] = useState('');
  const [paidByUser,setPaidByUser] = useState('');
  const [whoIsPaying,setWhoIsPaying] = useState('user');
  const  paidByFriend = bill  ? bill - paidByUser : "";


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!bill || !paidByUser) return
    onSplitBill(whoIsPaying === 'user' ? paidByFriend : -paidByFriend);

    setBill('');
    setPaidByUser('');
    setWhoIsPaying('user');

  }


  console.log(friend)
  return (
    <form className='form-split-bill' onSubmit={handleSubmit}>
      <h2>Split a bill with {friend.name}</h2>
      <label> 💰 Bill Value</label>
      <input type="text"  value={bill} onChange={(e) => {setBill(+e.target.value)}}/>

      <label> 🧍‍♂️Your expense</label>
      <input type="text"  value={paidByUser} onChange={(e) => setPaidByUser(+e.target.value > bill ? paidByUser : +e.target.value )}/> 

      <label> 👫 {friend.name}'s expense</label>
      <input type="text" disabled  value={paidByFriend}/>

      <label> 🤮 Who is paying the bill</label>
      <select  value={whoIsPaying} onChange={(e) => setWhoIsPaying(e.target.value)}>
        <option value="user">You</option>
        <option value="friend">{friend.name}</option>
      </select>
      <Button text='Split bill' />
    </form>
  )
}

function Button({ text, onClick }) {
  return (
    <button className='button' onClick={onClick}>{text}</button>
  )
}

export default App
