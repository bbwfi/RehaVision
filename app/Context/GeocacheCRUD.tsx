import React, { useState, useEffect} from 'react';
import { database } from '../Config/firebaseConfig';
import { addDoc, getDocs, doc, collection, updateDoc, deleteDoc } from 'firebase/firestore';


    // seter
    const [GeoCacheList, setGeoChacheList] = useState([]);
    
    //new GeoCacheStates
    const [newGeoCacheName, setNewMovieName] = useState("")
    const [newGeoCacheDesc, setNewMovieDesc] = useState("")    
    const [newGeoCacheLong, setNewMovieLong] = useState(0)
    const [newGeoCacheLat, setNewMovieLat]   = useState(0)


    // References to the geocaches data for Accessbility
    const geocacheCollectionRef = collection(database, "GeoChaches");


//#region GeoCacheCRUD
export function GeoCacheCRUD() {

    // Create Function For GeoCaches
    const CreateGeoCache = async () => {
        try {
            await addDoc(geocacheCollectionRef, {
                name: newGeoCacheName,
                latitude: newGeoCacheLat, 
                longitude: newGeoCacheLong, 
                description: newGeoCacheDesc,
            });
        } catch (err) {
            console.error(err)
        }    
    }

    // Update funktion for Geocaches
    const updateGeoCache = async (id) => {
        const GeoCacheDoc = doc(database,"GeoCaches", id)
        await updateDoc(GeoCacheDoc, {});
    };

    // Delete funktion for Geocaches
    const deleteGeoCache = async (id) => {
        const GeoCacheDoc = doc(database,"GeoCaches", id)
        await deleteDoc(GeoCacheDoc);
    };

    // Read Funktion for Geocaches
    useEffect(() => {
            const getGeoCacheList = async () => {
            try {
                const data = await getDocs(geocacheCollectionRef);
                const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id}));
                console.log(filteredData);
            } catch (err) {
                console.error(err)
            }
        };
            
        getGeoCacheList();
    }, []);

//#endregion
    
/*
return (
    <div className="AppCRUD">
    <FirebaseAuthContext/>
        <div>
            {GeoCacheList.map((geoCache) => (
                <div> 
                    <h1> {geoCache.name}</h1>
                    <p> {geoCache.latitude} </p>
                    <p> {geoCache.longitude} </p>
                </div>
            ))}
        </div>
    </div>
)*/
}

