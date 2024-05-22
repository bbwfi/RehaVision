import React, { useState, useEffect} from 'react';
import { FirebaseAuthContext } from './FirebaseAuth';
import { database } from '../Config/firebaseConfig';
import { addDoc, getDocs, doc, collection, updateDoc, deleteDoc } from 'firebase/firestore';


    // seter
    const [JourneyList, setGeoChacheList] = useState([]);
    
    //new JourneyStates - for the Create function 
 
    const [newJourneyUser, setNewMovieUser] = useState()
    const [newJourneyRoute, setNewMovieRoute] = useState()    
    const [newJourneyCache, setNewMovieCache] = useState()
    const [newJourneyDuration, setNewMovieDuration] = useState()
    
    // References to the Journeys data for Accessbility
    const JourneyCollectionRef = collection(database, "GeoChaches");


//#region JourneyCRUD
export function JourneyCRUD() {

/* WIP - needs customiced Create Funktion

    // Create Function For Journeys
   const CreateJourney = async () => {
        try {
            await addDoc(JourneyCollectionRef, {
                user: newJourneyUser,
                currentcache: newJourneyCache, 
                duration: newJourneyDuration, 
                route: newJourneyRoute,
            });
        } catch (err) {
            console.error(err)
        }    
    }
    
*/

    // Update funktion for Journeys
    const updateJourney = async (id) => {
        const JourneyDoc = doc(database,"Journeys", id)
        await updateDoc(JourneyDoc, {});
    };

    // Delete funktion for Journeys
    const deleteJourney = async (id) => {
        const JourneyDoc = doc(database,"Journeys", id)
        await deleteDoc(JourneyDoc);
    };

    // Read Funktion for Journeys
    useEffect(() => {
            const getJourneyList = async () => {
            try {
                const data = await getDocs(JourneyCollectionRef);
                const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id}));
                console.log(filteredData);
            } catch (err) {
                console.error(err)
            }
        };
            
        getJourneyList();
    }, []);

//#endregion
}

