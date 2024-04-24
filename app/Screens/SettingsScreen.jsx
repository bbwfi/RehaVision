import React, {useContext} from "react";
import { View, Text, Button, Switch } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useAppContext } from "../Context/AppContext";

function SettingsScreen({ navigation }) {
  const { debugMode, setDebugMode } = useAppContext();

  const toggleSwitch = () => {
    setDebugMode(!debugMode); // Toggle debugMode state
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", alignItems: "center", padding: 10 }}>
        <MaterialIcons
          name="arrow-back"
          size={24}
          color="black"
          onPress={() => navigation.goBack()}
        />
        <Text style={{ marginLeft: 10 }}>Settings</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <View>
          <Text>Debug Mode</Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={debugMode ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={debugMode}
          />
        </View>
      </View>
    </View>
  );
}

export default SettingsScreen;
