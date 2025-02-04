import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return(
    <div>
      <BusinessCard name={"Business Card"}
      description = {"To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. "}
        interests ={['Coding','Fitness','Music','Travel']}
        linkedin={'https://www.linkedin.com/in/abhinav-sinha-08487a1a7/'}
        github={'https://github.com/Abhinav-Sinha-XO'}
        >
        
        
      </BusinessCard>
    </div>
    
  )
  
}

function BusinessCard(props){
  return(
    <div style={styles.card}>
      <h1 style={styles.h1}>{props.name}</h1>
      <h2 style={styles.h2}>{props.description}</h2>
      <h2 style={styles.InterestHeader}>INTERESTs</h2>
      <ul style={styles.InterestList}>
        {props.interests.map((interest)=>(<li key={interest} style={styles.interest}>{interest}</li>))}
      </ul>
      <div style={styles.socialLink}>
        <a href={props.linkedin} target="_blank" rel="noopener noreferrer" style={styles.link}>Linkedin</a>
        <br></br>
        <a href={props.github} target="_blank" rel="noopener noreferrer" style={styles.link}>Github</a>

        {props.otherSocialMedia&& (
          <a href={props.otherSocialMedia} target='_blank' rel='noopener noreferrer' style={styles.link}>
            {props.otherSocialMedia.label}
          </a>
        )}
      </div>


    </div>
  )
}

const styles = {
  card: {border: '1px solidrgb(224, 224, 224)',
    borderRadius: '12px',
    height: '300px',
    margin: '100px',
    padding: '30px',
    backgroundColor: '#ffffff',
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    fontFamily: "'Inter', sans-serif",
    backgroundColor:'#fff7eb'

    
  },
  h1: {
    display:'flex',
    justifyContent:'left',
    paddingBottom:'20px',
    height:'20px',
    fontWeight:'bold',
    color: '#2d3748',
    fontFamily: "'Poppins', sans-serif",
    letterSpacing: '-0.025em',
    textDecoration: 'underline overline',
   },
  h2:{
    fontSize: '16px',
      color: '#555',
      marginBottom: '15px',
      
  },
  InterestHeader: {
      fontSize: '20px',
      marginBottom: '10px',
      color: '#333',
      textDecoration: 'underline ',
    },
  InterestList: {
    listStyle: 'none',         
    padding: 0,                
    margin: 0,                 
    display: 'flex',           
    flexDirection: 'column',
    paddingBottom:'10px',   
    marginBottom:'50px'
                   
},
socialLink: {
      display: 'flex',
      marginBottom: '15px',
    },
link:{
  display: 'inline-block',
  borderRadius:'5px',
  color:'white',
  backgroundColor:'black',
  textDecoration: 'none',
  boxShadow: '0 2px 4px rgba(13, 0, 255, 0.1)',
  marginRight: '10px',
  
  padding: '7px 10px',
}





}

export default App
