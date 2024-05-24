import React, { useState, useEffect} from 'react';
import { database } from '../Config/firebaseConfig';
import { addDoc, getDocs, doc, collection, updateDoc, deleteDoc } from 'firebase/firestore';


    // seter
    const [RouteList, setGeoChacheList] = useState([]);
    
    //new RouteStates
    const [newRouteName, setNewRouteName] = useState("")
    const [newRouteBeacons, setNewRouteBeacons] = useState("")    



    // References to the Routes data for Accessbility
    const RouteCollectionRef = collection(database, "GeoChaches");


//#region RouteCRUD
export function RouteCRUD() {

    // Create Function For Routes
    const CreateRoute = async () => {
        try {
            await addDoc(RouteCollectionRef, {
                name: newRouteName,
                Beaconsription: newRouteBeacons,
            });
        } catch (err) {
            console.error(err)
        }    
    }

    // Update funktion for Routes
    const updateRoute = async (id) => {
        const RouteDoc = doc(database,"Routes", id)
        await updateDoc(RouteDoc, {});
    };

    // Delete funktion for Routes
    const deleteRoute = async (id) => {
        const RouteDoc = doc(database,"Routes", id)
        await deleteDoc(RouteDoc);
    };

    // Read Funktion for Routes
    useEffect(() => {
            const getRouteList = async () => {
            try {
                const data = await getDocs(RouteCollectionRef);
                const filteredData = data.docs.map((doc) => ({...doc.data(),id: doc.id}));
                console.log(filteredData);
            } catch (err) {
                console.error(err)
            }
        };
            
        getRouteList();
    }, []);
//#endregion
}