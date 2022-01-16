import React, { useState, useEffect } from "react"
import "./style.css"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const ShowsList = () => {
  const [searchValue, setSearchValue] = useState("")
  const [showsList, setShowsList] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const getEpisodesData = async (search) => {
    setLoading(true)
    try {
      const response = await axios.get(`https://api.tvmaze.com/shows`)
      if (response.data) {
        setLoading(false)
        let tempShows = []
        if (search) {
          console.log("searching")
          response.data.forEach((item) => {
            if (new RegExp(search, "gi").test(item.name.toLowerCase())) {
              tempShows.push(item)
            }
          })
          console.log(`tempShows`, tempShows)
        } else tempShows = response.data

        setShowsList(tempShows)
      }
    } catch (error) {
      setError(true)
    }
  }

  useEffect(() => {
    getEpisodesData("")
  }, [])

  useEffect(() => {
    if (searchValue && searchValue.length <= 8) {
      getEpisodesData(searchValue)
    }
  }, [searchValue])

  return (
    <div style={{ height: "100%" }}>
      <div className="searchbox">
        <input
          type="text"
          className={`searchBoxInput ${searchValue.length > 9 ? "error" : ""}`}
          placeholder="Search shows..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value.trim())}
        />

        <button
          className="searchClearButton"
          onClick={() => {
            setSearchValue("")
            getEpisodesData("")
          }}
          disabled={loading}
        >
          Clear
        </button>
      </div>
      {searchValue.length > 8 && (
        <center className="errorText">
          search text should not be more than 8 characters
        </center>
      )}
      <div className="cardContainer">
        {showsList.map((item) => {
          return (
            <div className="card" key={item.id}>
              <div className="cardHeader">
                <img src={item.image.original} alt={item.image.name} />
              </div>
              <div className="cardBody">
                <div
                  className="cardTitle"
                  onClick={() => navigate(`/shows/${item.id}`)}
                >
                  {" "}
                  {item.name}
                </div>
                <div
                  className="cardContent"
                  dangerouslySetInnerHTML={{ __html: item.summary }}
                />
              </div>
            </div>
          )
        })}
        {loading && <div className="dataLoading">Loading...</div>}
        {error && (
          <div className="dataLoading">
            Something went Wrong.Please Try Again
          </div>
        )}
      </div>
      {showsList.length <= 0 && !loading && (
        <div className="noData">
          <img src="/nodata.png" alt="nodata" />
          <div className="noDataTitle">No Data</div>
        </div>
      )}
    </div>
  )
}

export default ShowsList
