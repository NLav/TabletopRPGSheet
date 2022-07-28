import React, { useState } from "react";

const UserContext = React.createContext({});

function UserProvider(props) {
    let User = localStorage.getItem("userId");
    const [userId, setUserId] = useState(User === "N" ? "N" : User);

    return (
        <UserContext.Provider value={{userId, setUserId}}>
            {props.children}
        </UserContext.Provider>
    )
}

export { UserContext, UserProvider };