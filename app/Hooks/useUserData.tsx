import { useEffect, useState } from "react"
import { loadUserData } from "../Functions/userDataManager"

export const useUserData = () => {
    const [userData, setUserData] = useState(null)
    
    useEffect(() => {
        async function getUserData() {
            try {
                const userData = await loadUserData()
                setUserData(userData)
            } catch (error) {
                console.error("Error loading user data:", error)
            }
        }

        getUserData()

        return () => {}
    },[])

    return userData;
}