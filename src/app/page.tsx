"use client"

import { useEffect, useState } from "react";
import { json } from "stream/consumers";

const Page = () => {

  const [data, setData] = useState<string>("");
  const [users, setUsers] = useState<any>();

  const getUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData(e.target.value)
  }
  
  const handleBtn = async () => {
    const url = fetch(`https://api.github.com/users/${data}`)
    const res = await url
    const json = await res.json()

    console.log(json);

    setUsers(json)
  }

  return (
    <main>
      <h1 className="title">GitHub API</h1>

      <label htmlFor="">Type the Username:</label><br />
      <input type="text"
      placeholder="Username"
      value={data}
      onChange={getUsers}
      />

      <button className="btn" onClick={handleBtn}>Search</button>

      {users} ? 
      <div>
        <h2>{users?.name}</h2>
        <img src={users?.avatar_url} alt="" />
      </div> : "Usuário não encontrado!"
      
    </main>
   );
}

export default Page;