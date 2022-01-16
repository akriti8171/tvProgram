import React,{useState,useEffect} from 'react'
import { useParams,useNavigate } from "react-router-dom"
import axios from "axios"
import "./style.css"

const ShowDetail = () => {
    const {id}=useParams()
    const [loading, setLoading] = useState(true)
    const [show, setShow] = useState({})
    const navigate=useNavigate()
    const inclusiveFields=["genres","language","status","language"]

    const capitalizeFirstLetter=(string) =>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const getText=(value)=>{
        switch(typeof value) {
            case "object": {
                return value.join(" , ")
            } 

            default: {
                return capitalizeFirstLetter(value)}
        }
    }

    useEffect(() => {
        (async()=>{
            try {
                setLoading(true)
                const response = await axios.get(`https://api.tvmaze.com/shows/${id}`)
                console.log(`response`, response)
                if (response.data) {
                    setLoading(false)
                    setShow(response.data)
                }
            } catch (error) {
                navigate("/shows")
            }
           
        })()
    }, [id, navigate])

    return (
        <div style={{ height: "100%" }}>
            {loading && <div className="dataLoading">Loading...</div>}
            <button className='goBackButton' onClick={()=>navigate("/shows")} disabled={loading}>Go Back</button>
            <div className="gridContainer">
                <div className="gridItem_1">
                    <img src={show.image?.original} alt={show.name}/>
                </div>
                <div className="gridItem_2">
                    <center className="movieTitle"><b>{show.name}</b></center>
                    {
                        Object.entries(show).map(([key,value],index)=>{
                           if (inclusiveFields.includes(key)) { 
                               return (
                                <div className='info' key={index}>
                                    {capitalizeFirstLetter(key)} : {getText(value)}
                                </div>
                            )}else {
                                return <React.Fragment key={index}/>
                            }
                        })
                    }
                    {!loading && <div className='info' > Country : {show.network?.country?.name} </div>}
                    {!loading && <div className='info' > Ratings : {show.rating?.average} </div>}
                    {show.schedule?.days &&  <div className='info' > Program Schedule Days: {show.schedule?.days.join(" , ")} </div>}
                    {show.schedule?.time &&  <div className='info' > Program Schedule Time : {show.schedule?.time} </div>}
                    <div className='info'  dangerouslySetInnerHTML={{ __html: show.summary }} />
                </div>
            </div>
        </div>
    )
}

export default ShowDetail
