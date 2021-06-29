import React, { useState,useEffect } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

// initial data of list
const myBioData = [
  {
    id:0,myName:"Shajib",age:20
  },
  {
    id:1,myName:"Thapa",age:26
  },
  {
    id:2,myName:"Jishan",age:20
  },
  {
    id:3,myName:"Sadman",age:19
  }
]

// to get the data from localStorage
const getLocalItems = () => {
  let list = localStorage.getItem('lists');

  if (list) {
    return JSON.parse(localStorage.getItem('lists'))
  } else {
    return [myBioData]
  }
  
}


function App() {

  let [myArray,setMyArray]=useState(getLocalItems())
  let [name,setName]=useState('')
  let [age,setAge]=useState('')
  let [buttonStatus, setButtonStatus] =useState(true);
  let [isEdit, setIsEdit] =useState(null);
  let [editItem, setEditItem] =useState();
  
  const handleChange = (e) => {
    if (e.target.name === "name") {
      return setName(e.target.value)
    }
    if (e.target.name === "age") {
      return setAge(e.target.value)
    }
  
  }

  // create item 
  const handleClick = () => {
    if (name !== "" && age !== "" && !isEdit) {
      
      setName("")
      setAge("")
  
      const allInputData = {id:new Date().getTime().toString(),myName:name,age:age}
      return setMyArray([...myArray, allInputData]);
    } else if (name && age && isEdit) {
      
      setName("")
      setAge("")
  
      setMyArray([...myArray.filter((elem)=> {
        return isEdit!==elem.id
        }),{id:new Date().getTime().toString(),myName:name,age:age}])
      }
}
  
// Edit item 
  const handleEdit = (id) => {
    let newEditItem = myArray.find((elem) => {
      return id===elem.id
    })
    setName(newEditItem.myName)
    setAge(newEditItem.age)

    setIsEdit(id)
  }
  
// Delete item 
  const handleDelete = (id) => {
  setMyArray(myArray.filter((v) => {
    if (id !== v.id) {
      return v;
    }
  })) 
  }

  // add localStorage 
  useEffect(() => {
    localStorage.setItem('lists', JSON.stringify(myArray))
    
    if (name && age) {
      setButtonStatus(false)
    } else {
      setButtonStatus(true)
    }
  },[myArray,name,age])

  return (
    <div className="App container">
        <form action="#" onSubmit={e=>e.preventDefault()}>
          <input type="text" className="form-control w-50 my-3" placeholder="Enter Your Name" onChange={handleChange} name="name" value={name} />
          <input type="text" className="form-control w-50 my-3" placeholder="Enter Your Age" onChange={handleChange} name="age" value={age}/>
        
        <button type='submit' className="btn btn-primary btn-lg" onClick={name === "" && age === "" ?  null:handleClick } disabled={buttonStatus}>Submit</button>
        </form>

      {
        myArray.map((list) => {
          return <div className="item" key={list.id}>
          <h1 key={list.id}>{list.myName || "Your Name"} & Age: { list.age || 'Your Age'}</h1>
          <button className="btn btn-primary mx-2" onClick={()=>handleEdit(list.id)}>Edit</button>
          <button className="btn btn-danger" onClick={()=>handleDelete(list.id)}>Delte</button>
          </div>
        })
      }


    </div>
  );
}

export default App;

