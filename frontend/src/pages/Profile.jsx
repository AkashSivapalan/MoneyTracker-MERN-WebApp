import React, { useEffect, useState } from 'react'
import jwtDecode from "jwt-decode";
const Profile = () => {


  // useEffect(() => {
  //       const jwt = localStorage.getItem("token");
  //   const acc = jwtDecode(jwt);
  //   setUser(acc);

  // }, []);
    const jwt = localStorage.getItem("token");
  const acc = jwtDecode(jwt);

    // setUser(acc);
  return (
    <div className="container">
      <h1>Welcome { acc.name}
       </h1>
    </div>
  )
}

export default Profile
