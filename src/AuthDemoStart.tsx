import axios from "axios";
import React, { useState, useEffect } from "react";
import {auth, googleAuthProvider} from './configureFirebase'
import { signInWithPopup, User } from "firebase/auth";

export function AuthDemoStart(): JSX.Element {

    const [lastAPIReply, setLastAPIReply] = useState<string>("");
    const [user, setUser] = useState<User | null>()

    useEffect(() => {
        function handleAuthStateChange(user: User | null) {
            setUser(user)
        }

        const unsubscribeFn = auth.onAuthStateChanged(handleAuthStateChange)
        return unsubscribeFn
    }, [])

    async function handleFetchTimeClicked() {
        const reply = await axios.get("http://localhost:4000/");
        setLastAPIReply(reply.data);
    }

    async function handleFetchWisdomClicked() {
        //This SHOULD be hard to get, eventually.
        if (!user){
            return
        }
        const idToken = await user.getIdToken()
        const config = {headers: {'Authorization': 'Bearer ' + idToken}}
        const reply = await axios.get("http://localhost:4000/wisdom", config);
        setLastAPIReply(reply.data);
    }

    const handleSignIn = async () => {
       const response = await signInWithPopup(auth, googleAuthProvider)
       setUser(response.user)
       
    }

    const handleSignOut = async () => {
        auth.signOut()
        setUser(null)
    }

    return (
        <div>
            <h2>Auth Demo</h2>
            {user &&<h3>Hello {user?.displayName}</h3>}
            {user?.photoURL && <img src={user?.photoURL} alt='mug shot'/>}

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

