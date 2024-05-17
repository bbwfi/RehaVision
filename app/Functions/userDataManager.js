// Import necessary modules
import * as FileSystem from "expo-file-system";

// Define the file path for userData
const userDataFileUrl = `${FileSystem.documentDirectory}userData.json`;

// Function to load user data from the file system
export const loadUserData = async () => {
  try {
    // Read the user data from the file system
    const userDataString = await FileSystem.readAsStringAsync(userDataFileUrl);
    
    // Parse the user data JSON
    const userData = JSON.parse(userDataString);

    // Log the loaded user data
    console.log("User data loaded:", userData);

    // Return the loaded user data
    return userData;
  } catch (error) {
    // Handle errors while loading user data
    console.error("Error loading user data:", error);

    // Return null if loading fails
    return null;
  }
};

// Function to save user data to the file system
export const saveUserData = async (userData) => {
  try {
    // Serialize the user data to JSON
    const dataToSave = JSON.stringify(userData || {});

    // Write the serialized data to the file system
    await FileSystem.writeAsStringAsync(userDataFileUrl, dataToSave);

    // Log the saved user data
    console.log("User data saved:", userData);
  } catch (error) {
    // Handle errors while saving user data
    console.error("Error saving user data:", error);
  }
};
