import * as FileSystem from "expo-file-system";

const userDataFileUrl = `${FileSystem.documentDirectory}userData.json`;

export const loadUserData = async () => {
    try {
      const userDataString = await FileSystem.readAsStringAsync(userDataFileUrl);
      const userData = JSON.parse(userDataString);
      console.log("User data loaded:", userData); // Add this line to check if userData is loaded
      return userData;
    } catch (error) {
      console.error("Error loading user data:", error);
      return null;
    }
  };
  

export const saveUserData = async (foundCaches) => {
  try {
    const userData = {
      foundCaches,
    };
    const dataToSave = userData || {}; // Falls userData null ist, verwenden Sie ein leeres Objekt
    await FileSystem.writeAsStringAsync(
      userDataFileUrl,
      JSON.stringify(dataToSave)
    );
    console.log("User data saved:", dataToSave);
  } catch (error) {
    console.error("Error saving user data:", error);
  }
};
