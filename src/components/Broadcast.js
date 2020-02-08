import React from 'react'

export default function Broadcast({user, status}) {
    return (
        <div className="broadcast" >
            <span>{user} is {status}ing the room.</span>
        </div>
    )
}

