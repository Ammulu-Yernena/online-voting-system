import React,{useState,useEffect} from 'react'
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import { Pie } from 'react-chartjs-2';

const CreatePost = ()=>{
    const [data,setData] = useState([])
    const [winner, setWinner] = useState('');
    const [isTie, setIsTie] = useState(false);
    const history = useHistory();
  
    useEffect(()=>{
       fetch('http://localhost:5000/posts',{
         
       }).then(res=>res.json())
       .then(result=>{
         '['
           setData(result.posts)
           calculateWinner(result.posts);
       })
    },[])
    let total = 0;
    
    data.map(item => {
        total += (item.votes.length);
    })

    const calculateWinner = (posts) => {
      let maxVotes = 0;
      let winners = [];

      posts.forEach((post) => {
        if (post.votes.length > maxVotes) {
          maxVotes = post.votes.length;
          winners = [post];
        } else if (post.votes.length === maxVotes) {
          winners.push(post);
        }
      });
  
      if (winners.length > 1) {
        setIsTie(true);
        setWinner('Tie');
      } else if (winners.length === 1) {
        setIsTie(false);
        setWinner(winners[0].title); // Set the winner's title
      }
  };

  // Prepare data for chart
  const chartData = {
      labels: data.map(item => item.title),
      datasets: [
          {
            label: 'Votes',
            data: data.map(item => item.votes.length),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#6A0DAD',
                '#FF0000',
                '#FFA500',
                '#00FF00',
                '#0000FF',
                '#800080',
                '#FF00FF'
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#6A0DAD',
                '#FF0000',
                '#FFA500',
                '#00FF00',
                '#0000FF',
                '#800080',
                '#FF00FF'
            ]
          }
      ]
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        tooltip: {
            callbacks: {
                label: function(tooltipItem) {
                    return `${tooltipItem.label}: ${(tooltipItem.raw / total * 100).toFixed(2)}%`;
                }
            }
        }
    }
};

    
   return(
  

    <div>
        <table style={{width:"80%",marginTop:"50px",marginLeft:"10%"}}>
        <thead style={{fontSize:"22px"}}>
          <tr>
              <th >Option</th>
              <th>Symbol</th>
              <th>Vote</th>
              <th>Percentage Vote</th>
          </tr>
        </thead>

        {
            data.map(item => (
                <tbody key={item.title} style={{padding:"5px"}}>
                <tr >
                   <td>{item.title}</td>
                
                  <td>
                  <img src={item.photo} 
                                style={{width:"150px",height:"150px",paddingTop:"10px",paddingBottom:"10px"}}
                                />
                  </td>
                  <td style={{fontSize:"19px",fontWeight:"700"}}>{item.votes.length}</td>
                  <td>{((item.votes.length/total)*100).toFixed(2)}%</td>
                </tr>
              
              </tbody>
            ))
        }
      </table>
      <p style={{fontSize:"30px"}}><b style={{marginLeft:"39%",backgroundColor:"white",marginTop:"150px"}}>Total counting Vote : {total}</b></p>
      

      <div style={{ width: '80%', margin: '50px auto' }}>
                <Pie data={chartData} options={chartOptions} />
            </div>

        {winner && (
        <div style={{ marginTop: '50px', textAlign: 'center' }}>
          <h3>Winner</h3>
          <div>
            {isTie ? (
              <p><strong>It's a tie!</strong></p>
            ) : (
              <p>
                <strong>{winner}</strong> has won with{' '}
                {data.find((item) => item.title === winner).votes.length} votes!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
   )
}


export default CreatePost