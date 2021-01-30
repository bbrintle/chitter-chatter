import { createContext, useState, useEffect } from "react";

//Export Provider and Consumer for global state.
export const RoomContext = createContext();

export default ({ children }) => {
    const [currentRoomID, setCurrentRoomID] = useState("");

    //Return the children wrapped with the provider of the global context (once loaded).
    return (
        <div> 
            <RoomContext.Provider value={{ currentRoomID, setCurrentRoomID }}>
                { children }
            </RoomContext.Provider>
        </div>
    );
} 