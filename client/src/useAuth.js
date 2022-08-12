import axios from 'axios';
import {useState, useEffect} from 'react'

//Outside Authorization hook

export default function useAuth(code){

    //access, refresh, and expiration tokens
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();




    useEffect(() => {
        //call api method

        //post 'code' to route
        axios
            .post('http://localhost:3001/login',{
                code,
        
            //get response, returns data
            })
            .then(res=>{
                setAccessToken(res.data.accessToken);
                setRefreshToken(res.data.refreshToken);
                setExpiresIn(res.data.expiresIn);
                window.history.pushState({}, null, '/');
                    console.log(res.data);
            })
            .catch(() => 
                window.location = '/'
            )
    }, [code])

    //when refresh or expiresIn token, run useEffect
    useEffect(() => {
        if(!refreshToken||!expiresIn) return
        const interval = setInterval(() =>{
            axios
                .post('http://localhost:3001/refresh',{
                    refreshToken,
            
                //get response, returns data
                })
                .then(res=>{
                    setAccessToken(res.data.accessToken);
                    setExpiresIn(res.data.expiresIn);
                    
                })
                .catch(() => {
                    window.location = '/'
                }) 
            }, (expiresIn - 60) *1000)
            return () => clearInterval(interval)
    }, [refreshToken, expiresIn])




return accessToken;
}