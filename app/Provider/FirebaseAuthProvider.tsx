import React, { useContext, useEffect, useState } from "react";
import Auth, {getAuth, signInAnonymously} from "firebase/auth";
import FIREBASE_APP from "../firebaseSetup";


interface AuthProps  {
    children?: React.ReactNode
}

interface AuthUserContextProps {
    authUser: Auth.User | null,
    isLoading: boolean,
    signOut: () => Promise<void> | null
}

const auth = getAuth(FIREBASE_APP);

signInAnonymously(auth)
.then(() => {
        console.log('User signed in anonymously')
})
.catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
            console.log('Enable anonymous in your firebase console.')
        }
        console.error(error)
})

export const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState<Auth.User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const clear = () => {
        setAuthUser(null)
        setIsLoading(false)
    }

    const signOut = () => auth.signOut().then(() => {
        clear()
    })

    const authStateChanged = async (user: Auth.User | null) => {
        setIsLoading(true)
        if (!user) {
            clear()
            return
        } else {
            setAuthUser(user)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChanged)
        return () => unsubscribe()
    }, [])

    return {
        authUser: authUser,
        isLoading: isLoading,
        signOut: signOut
    }

}

export const AuthUserContext = React.createContext<AuthUserContextProps | null>({
    authUser: null,
    isLoading: true,
    signOut: () => null
})

export function AuthProvider ( {children}: AuthProps) {
    const auth = useFirebaseAuth()
    return <AuthUserContext.Provider value={auth}>{children}</AuthUserContext.Provider>
}

export const useAuth = () => useContext(AuthUserContext)