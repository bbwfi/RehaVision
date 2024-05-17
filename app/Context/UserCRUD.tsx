import React, { useState, useEffect} from 'react';
import { FirebaseAuthContext } from './FirebaseAuth';
import { database } from '../Config/firebaseConfig';
import { addDoc, getDocs, doc, collection, updateDoc, deleteDoc } from 'firebase/firestore';


    // seter
    const [UserList, setUserList] = useState([]);
    
    //new UserStates
    const [newUserNickname, setNewUserNickname] = useState("")
    const [newUserTimestamp, setNewUserTimestamp] = useState("")    


    // References to the Users data for Accessbility
    const UserCollectionRef = collection(database, "User");


//#region UserCRUD
function UserCRUD() {

    // Create Function For Users
    const CreateUser = async () => {
        try {
            await addDoc(UserCollectionRef, {
                name: newUserNickname,
                description: newUserTimestamp,
            });
        } catch (err) {
            console.error(err)
        }    
    }

    // Update funktion for Users
    const updateUser = async (id) => {
        const UserDoc = doc(database,"Users", id)
        await updateDoc(UserDoc, {});
    };

    // Delete funktion for Users
    const deleteUser = async (id) => {
        const UserDoc = doc(database,"Users", id)
        await deleteDoc(UserDoc);
    };

    // Read Funktion for Users
    useEffect(() => {
            const getUserList = async () => {
            try {
                const data = await getDocs(UserCollectionRef);
                const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id}));
                console.log(filteredData);
            } catch (err) {
                console.error(err)
            }
        };
            
        getUserList();
    }, []);

//#endregion
    
/*
return (
    <div className="AppCRUD">
    <FirebaseAuthContext/>
        <div>
            {UserList.map((User) => (
                <div> 
                    <h1> {User.name}</h1>
                    <p> {User.latitude} </p>
                    <p> {User.longitude} </p>
                </div>
            ))}
        </div>
    </div>
)*/
}

