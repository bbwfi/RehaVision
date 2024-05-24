import React, { useState, useEffect} from 'react';
import { database } from '../Config/firebaseConfig';
import { addDoc, getDocs, doc, collection, updateDoc, deleteDoc } from 'firebase/firestore';


    // seter
    const [RiddleList, setGeoChacheList] = useState([]);
    
    //new RiddleStates
    const [newRiddleHint, setNewMovieHint] = useState("")
    const [newRiddleDesc, setNewMovieDesc] = useState("")    



    // References to the Riddles data for Accessbility
    const RiddleCollectionRef = collection(database, "GeoChaches");


//#region RiddleCRUD
export function RiddleCRUD() {

    // Create Function For Riddles
    const CreateRiddle = async () => {
        try {
            await addDoc(RiddleCollectionRef, {
                name: newRiddleHint,
                description: newRiddleDesc,
            });
        } catch (err) {
            console.error(err)
        }    
    }

    // Update funktion for Riddles
    const updateRiddle = async (id) => {
        const RiddleDoc = doc(database,"Riddles", id)
        await updateDoc(RiddleDoc, {});
    };

    // Delete funktion for Riddles
    const deleteRiddle = async (id) => {
        const RiddleDoc = doc(database,"Riddles", id)
        await deleteDoc(RiddleDoc);
    };

    // Read Funktion for Riddles
    useEffect(() => {
            const getRiddleList = async () => {
            try {
                const data = await getDocs(RiddleCollectionRef);
                const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id}));
                console.log(filteredData);
            } catch (err) {
                console.error(err)
            }
        };
            
        getRiddleList();
    }, []);
//#endregion
}