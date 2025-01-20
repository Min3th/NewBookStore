import React, { useEffect } from 'react';
import { useAuthContext } from "@asgardeo/auth-react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';


// TypeScript types for the book objects




const Home: React.FC = () => {


  const { signIn, getAccessToken,getDecodedIDToken } = useAuthContext();

  
  
  useEffect(()=>{
    getAccessToken().then((accessToken)=>{
      console.log(accessToken);
    }).catch((error)=>{console.log(error);}
    );
  },[]);

  getDecodedIDToken().then((decodedIDToken)=>{
    console.log(decodedIDToken);
  }).catch((error)=>{
    console.log(error);
  })

 

  return (
    <div className='flex flex-col items-center justify-center w-screen min-h-screen bg-[#C4A484]'>
      <div className='font-medium text-[30px]'>Welcome to the</div>
      
      <div className='font-semibold text-[100px] rounded-[10px] bg-[#7a5f51] shadow-lg p-4 tracking-[0.06em]'><FontAwesomeIcon icon={faBook} className='text-[90px] mr-3' />BOOKSTORE</div>

      <button className='text-[30px] absolute top-0 right-2 rounded-[10px] p-2 bg-[#8b6c5c] m-1' onClick={ () => signIn() }>Login</button>

      


     
       
      
    </div>
  );
};

export default Home;
