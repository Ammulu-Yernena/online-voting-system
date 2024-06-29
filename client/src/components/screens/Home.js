import React,{useState,useEffect,useContext} from 'react'
import swal from 'sweetalert'
import {UserContext} from '../../App'
// import {Link} from 'react-router-dom'
// import Chart from "./Chart";
import Profile from "./Profile";

const Home  = ()=>{
    const [data,setData] = useState([])
    const {state} = useContext(UserContext)
    useEffect(()=>{
       fetch('http://localhost:5000/allpost',{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("jwt")
           }
       }).then(res=>res.json())
       .then(result=>{
           console.log(result)
           if (result && result.posts && result.posts.length > 0) {
            setData(result.posts); // Assuming result.posts is the array of posts
          } else {
            setData([]);
          }
       })
       .catch(err => console.error('Error fetching posts:', err));
    },[])

    const votePlayer = (id,userId)=>{
        swal({
            title: "Are you sure?",
            text: "Once selected, you will not be able to reselect the options!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                fetch('http://localhost:5000/vote',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        postId:id,
                        userId
                    })
                }).then(res=>res.json())
                .then(result=>{
                console.log(result)
                  const newData = data.map(item=>{
                      if(item._id===result._id){
                          return result
                      }else{
                          return item
                      }
                  })
                  setData(newData)
                }).catch(err=>{
                    console.error('Error voting:', err)
                })  
              swal("You successfully has given your vote!", {
                icon: "success",
              });
            } else {
              swal("Again ,select your option!");
            }
          });
         
    }
   
    
    let isVote;
    let user = localStorage.getItem("user");
    if (user) {
        user = JSON.parse(user);
        isVote = user._id;
    }

    const userId = user ? user._id : null;

    const userIdExist = data.map(item => item.votes.filter(vote => vote));

    let newVlaue = false;
    for(let key of userIdExist) {
      if(key.length > 0 ){
         
         for(let key2 of key){
             if(key2 === isVote){
                newVlaue = true ;
             }
        }
      }
    }

return (
    <div>
      <div className="col-md-8" style={{ margin: "auto", paddingTop: "5%" }}>
        <div className='col-md-3' style={{ float: "left", border: "1px solid green"}}>
          <Profile />
        </div>
        <div className='col-md-8' style={{ float: "right", backgroundColor: "white", padding: "10px" }}>
          {data.length > 0 ? (
            data.map((item, index) => (
              <div key={item._id} style={{ marginBottom: "10px", backgroundColor: "#f2f4f6", height: "100px", borderRadius: "15px", padding: "25px" }}>
                <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                  <h6><b>{index + 1}</b></h6>
                  <h6><b>{item.title.split(" ")[0]}</b></h6>
                  <img src={item.photo} style={{ height: "75px", width: "75px", margin: "-15px"}} alt="post" />
                  <div className="card-content">
                    {!item.votes.includes(state._id) && !newVlaue ? (
                      <button className="btn btn-success" onClick={() => votePlayer(item._id, userId)}>Vote</button>
                    ) : (
                      <button className="btn disabled" style={{ marginLeft: "47px", background: "red" }}>
                        Already Voted
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No posts available</p>
          )}
        </div>
      </div>
    </div>
  );
};



export default Home