import Firebase from "../../firebaseConfig";
import React, {useContext, useState} from "React";

export const firebaseContext = React.createContext ();

export const useFirebaseAuth = () => {
    const [authUser, setAuthUser] = useState<FirebaseAuthTypes.User | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const clear = () => {
        setAuthUser(null)
        setIsLoading(false)
    }

    const signOut = () => auth().signOut().then(() => {
        clear()
    })

    const authStateChanged = async (user: FirebaseAuthTypes.User | null) => {
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
        const unsubscribe = auth().onAuthStateChanged(authStateChanged)
        return () => unsubscribe()
    }, [])

    return {
        authUser: authUser,
        isLoading: isLoading,
        signOut: signOut
    }


}