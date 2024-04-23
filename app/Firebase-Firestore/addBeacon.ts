// Add a document with a generated ID.
import { addDoc, collection } from "firebase/firestore"; 


try {
  const docRef = await addDoc(collection(db, "users"), {
    name: "TestenderTester",
     longitude: 52.23,
     latitude: 123.47,
     name: "Cabybara",
     description: "finde das Cabybara bei H67",
     riddle: Riddle
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}