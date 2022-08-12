import React from 'react'
import {Container} from 'react-bootstrap'

// authorized login url
const AUTH_URL = "http://accounts.spotify.com/authorize?client_id=a4b57b7ef000452eab8dd9362a2de875&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-read-playback-state%20user-modify-playback-state"

export default function login() {
    
// display login button
  return (<Container className='d-flex justify-content-center align-items-center'style = {{minHeight: '100vh'}}>
    <a className="btn btn-success btn-lg" href={AUTH_URL}>Login with Spotify</a>
  </Container>)

  
}
