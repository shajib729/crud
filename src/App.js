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
  let [name,setName]=useState()
  let [age,setAge]=useState()
  
  const handleChange = (e) => {
    if (e.target.name === "name") {
      return setName(e.target.value)
    }
    if (e.target.name === "age") {
      return setAge(e.target.value)
    }
  
  }

  const handleClick = () => {
  setName("")
  setAge("")
  return setMyArray([...myArray,{id:4,myName:name,age:age}])
}
  

  const handleDelete = (id) => {
  setMyArray(myArray.filter((v, i) => {
    if (id !== i) {
      return v;
    }
  })) 
  }

  // #### screen width ####

  // const [screenWidth, setScreenWidth] = useState(window.innerWidth)
  // const [screenHeight, setScreenHeight] = useState(window.innerHeight)

  // const WHvalue = () => {
  //   setScreenWidth(window.innerWidth)
  //   setScreenHeight(window.innerHeight)
  //   console.log(document.body.scrollHeight);
  //   console.log(document.body.clientHeight);
  // }

  // useEffect(() => {
  //   window.addEventListener('resize', WHvalue)

  //   return () => {
  //     console.log("remove Event");
  //     window.removeEventListener("resize",WHvalue)
  //   }
    
  // })

  // add localStorage 
  useEffect(() => {
    localStorage.setItem('lists',JSON.stringify(myArray))
  },[myArray])

  return (
    <div className="App container">
      {/* <h1>Width : {screenWidth }</h1>
      <h1>Height : {screenHeight }</h1> */}
        <form action="#" onSubmit={e=>e.preventDefault()}>
          <input type="text" className="form-control w-50 my-3" placeholder="Enter Your Name" onChange={handleChange} name="name" value={name} />
          <input type="text" className="form-control w-50 my-3" placeholder="Enter Your Age" onChange={handleChange} name="age" value={age}/>
        
        <button type='submit' className="btn btn-primary btn-lg" onClick={name!=="" && age!==""?handleClick:null}>Click</button>
        </form>

      {
        myArray.map((list,i) => {
          return <div className="item">
          <h1 key={list.id}>{list.myName || "Your Name"} & Age: { list.age || "Your Age"}</h1>
          <button className="btn btn-primary" onClick={()=>handleDelete(i)}>Delte</button>
          </div>
        })
      }


    </div>
  );
}

export default App;

