import React,{useState,useContext,} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {userType} from '../utils'
import {UserContext} from '../../App'
import Posts from "./Posts";
import M from 'materialize-css'
import Image from "../../Image/Capture.JPG";

const SignIn  = ()=>{
    const {state,dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [userItem,setuserItem]=useState('Voter')

    const PostData = ()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("http://localhost:5000/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email,
                userItem
            })
        }).then(res=>res.json())
        .then(data=>{
           
           if(data.error){
              M.toast({html: data.error,classes:"#c62828 red darken-3"})
           }
           else{
               localStorage.setItem("jwt",data.token)
               localStorage.setItem("user",JSON.stringify(data.user))
               dispatch({type:"USER",payload:data.user})
             
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }
   return (
      <div className="mycard" style={{display: "flex", justifyContent: "space-between", paddingTop: "5%"}}>
          <p><b style={{marginLeft:"5%",fontSize:"24px"}}></b></p> 
      
          < div className="clo-6" style={{ flex: 1, marginRight: "2%", marginLeft: "10%" }}>
             
           <Posts  />
           </div>
          <div className="col-6" style={{flex: 1, maxWidth: "400px" }}>   
          <div className="card " style={{paddingLeft:"40px",paddingRight:"40px",paddingTop:"20px",border:"1px solid black", marginRight: "30%"}}>
            
             <img src={Image} alt="image" style={{height:"90px",width:"90px",borderRadius:"50%",
             alignSelf:"center",marginBottom:"15px"}} />
            
            <div >
            <div className="col">
            <input
            type="text"
            placeholder="email"
            value={email}
           className='form-control'
           style={{height:"50px",width:"100%",marginBottom: "10px"}}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <br />
            </div>
            <div className="col">
            <input
            type="password"
            placeholder="password"
            value={password}
            style={{height:"50px",width:"100%",marginBottom: "10px"}}
            onChange={(e)=>setPasword(e.target.value)}
            className='form-control'
            />
            </div>
            <br />

            <div className="col">
            
            <select  className="form-select" value={userItem} onChange={(e)=> setuserItem(e.target.value)}
              style={{height:"50px",width:"100%",marginBottom: "20px"}}
            >
            {userType.map((item) => (
                  <option value={item} key={item} >
                    {" "}
                    {item}{" "}
                  </option>
                ))}
            </select>
        </div>

          </div>
      
            <button className="btn btn-success mt-4 "
             style={{height:"50px",width:"100%"}}
            onClick={()=>PostData()}
            >
                Login
            </button>
            <p style={{fontFamily:"Raleway",textAlign:"center",fontSize:"17px",marginTop:"20px"}}>
               Not Register ? <Link to="/signup" style={{color:"grey",fontWeight:"600"}}>Register here</Link>
            </p>
    
        </div>
        </div>
      
    
      </div>
   )
}


export default SignIn