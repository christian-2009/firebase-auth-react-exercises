import axios from "axios";
import React, { useState } from "react";
import {auth, googleAuthProvider} from './configureFirebase'
import { signInWithPopup, UserCredential } from "firebase/auth";

export function AuthDemoStart(): JSX.Element {

    const [lastAPIReply, setLastAPIReply] = useState<string>("");
    const [user, setUser] = useState<UserCredential | null>()


    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        setLastAPIReply(reply.data);
    }

    async function handleFetchWisdomClicked() {
        //This SHOULD be hard to get, eventually.
        const reply = await axios.get("http://localhost:4000/wisdom");
        setLastAPIReply(reply.data);
    }

    const  handleSignIn = async () => {
       const response = await signInWithPopup(auth, googleAuthProvider)
       setUser(response)
       console.log(user)
    }

    const handleSignOut = async () => {
        auth.signOut()
        setUser(null)
    }

    return (
        <div>
            <h2>Auth Demo</h2>
            {user &&<h3>Hello {user?.user.displayName}</h3>}
            {user?.user.photoURL && <img src={user?.user.photoURL} alt='mug shot'/>}

            <button onClick={handleSignIn}>Sign in</button>
            <button onClick={handleSignOut}>Sign out</button>

            <hr />
            <h3>Talk to the API</h3>
            <button onClick={handleFetchTimeClicked}>Fetch Time</button>
            <button onClick={handleFetchWisdomClicked}>Fetch Ancient Wisdom!</button>
            <h4>Last successful reply from API</h4>
            <div>{lastAPIReply}</div>
            <br />
            <pre>{JSON.stringify(user, null, 2)}</pre>
            <i>(also check console for any failures)</i>

            <hr />

        </div>
    );
}

