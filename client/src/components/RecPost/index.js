import { Avatar } from "@material-ui/core";
import React from "react";
import "./recPost.css"

function RecPost ({profilePic, username, image, timestamp, message}) {
    return (
        <div className="recPost">
           <div className="post_top">
               <Avatar src={profilePic}
               className="post_avatar" />
               <div className="post_topInfo">
                   <h3>{username}</h3>
               </div>
           </div>

           <div className="post_bottom">
               <p>{message}</p>
           </div>

           <div className="post_image">
               <img src={image} alt="" />
           </div>
        </div>
    )
}

export default RecPost;