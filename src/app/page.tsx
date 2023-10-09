"use client"

import { useEffect, useState, KeyboardEvent } from "react";
import { json } from "stream/consumers";
import { Validation } from "@/components/validation";

const Page = () => {

  const [data, setData] = useState<string>("");
  const [users, setUsers] = useState<any>();
  const [message, setMessage] = useState<any>(null)
  const [clicked, setClicked] = useState<boolean>(false)

  const getInputData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
  }
  
  const handleFetch = async () => {

    try {
      const url = fetch(`https://api.github.com/users/${data}`)
      const res = await url
      const json = await res.json()

      // console.log(json);
      setMessage(json.status);
      setUsers(json)

    } catch (message) {
      
    }

  }

  const handleGetUsers = () => {
    setClicked(true)
    handleFetch()
  }

  const handleKeyDown = (e:KeyboardEvent) => {
    if(e.key === "Enter"){
      handleGetUsers()
    }
  }

  return (
    <main>

      {/* SEARCH SECTION */}
      <section className="search-section">
        <div className="search-container">
          <h1 className="title">GitHub User Finder</h1>

          <h4>Search for a User:</h4>
          <p>See the user profile information</p>

          <span className="search-bar">
            <input type="text"
            className="inputTxt"
            placeholder="username here"
            value={data}
            onChange={getInputData}
            onKeyDown={handleKeyDown}
            />
            <button className="btn" onClick={handleGetUsers}>Search</button>
          </span>

        </div>
      </section>

      {/* USER PROFILE */}
      
          {clicked == true ? 

          (<section className="user-section">
            <div className="user-container">
              <div className="img-container">
                <img src={users?.avatar_url} alt="" className="user-img" />
              </div>
              <h2 className="user-name">{users?.name}</h2>
              <p className="user-location">{users?.location}</p>
    
              <div className="follow-div">
                <span>
                  <p>Followers</p>
                  <p className="counter-follow">{users?.followers}0</p>
                </span>
    
                <span className="vertical-line"></span>
    
                <span>
                  <p>Following</p>
                  <p className="counter-follow">{users?.following}0</p>
                </span>
              </div>
    
            </div>
          </section>) : ("")}

    </main>
   );
}

export default Page;