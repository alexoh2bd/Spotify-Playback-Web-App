import {useState, useEffect} from 'react'
import useAuth from './useAuth'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import TrackSearchResult from './Track'
import Player from "./Player"
import axios from "axios"

const spotifyApi = new SpotifyWebApi({
    clientId: "a4b57b7ef000452eab8dd9362a2de875",


})

//dashboard component 
export default function Dashboard({code}) {
    const accessToken = useAuth(code)
    const [search, setSearch] = useState('')
    const [searchResults, setSearchResults] = useState([])
    const [playingTrack, setPlayingTrack] = useState()
    const [lyrics, setLyrics] = useState("")

    console.log(searchResults)

    function chooseTrack(track) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')

    }

    // Set New Access Token
    useEffect(() => {
        if(!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    
    
    }, [accessToken])


    // Search Results Effect
    useEffect(() => {
        if(!search) return setSearchResults([])
        if(!accessToken) return

        let cancel = false

        spotifyApi.searchTracks(search).then(res =>{

            if (cancel) return

            //gets search results from the response's tracks
            setSearchResults(
                res.body.tracks.items.map(track =>{
                    
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        }, 
                        track.album.images[0]
                    )

                    return {
                        artist: track.artists[0].name,
                        title: track.name,
                        uri: track.uri,
                        albumUrl: smallestAlbumImage.url
                    }
                })
            )
        })
        return () => (cancel = true)
        // make request, if a new request is made, set cancel to true.

    }, [search, accessToken])


    // Get lyrics while playing a track
    useEffect(() => {
        if (!playingTrack) return

        axios.get('http://localhost:3001/lyrics',{
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
        }
        }).then(res =>{
            setLyrics(res.data.lyrics)
        })

    }, [playingTrack])


    return (
    <Container className = "d-flex flex-column py-2" style = {{ height: "100vh"}}>
        <Form.Control // search bar
            type = "search" 
            placeholder = "Search Songs/Artists" 
            value = {search} 
            onChange = {e => setSearch(e.target.value)}
        />
         
        <div //search results container
            className = "flex-grow-1 my-2" 
            style = {{ overflowY: 'auto' }}
            >
            {searchResults.map(track => (
                <TrackSearchResult track = {track} key = {track.uri} chooseTrack = {chooseTrack} />
            ))}

            {searchResults.length === 0 && (
                <div className = "text-center" style = {{ whiteSpace: "pre"}}>
                    {lyrics}
                </div>

            )}

        </div>
        <div> 
            <Player accessToken={accessToken} trackUri = {playingTrack?.uri}/>
        </div>
    </Container> 

    )
}
