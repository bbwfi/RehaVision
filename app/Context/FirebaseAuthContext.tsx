import Auth from 'firebase/auth';
import React from "react";

export const FirebaseAuthContext = React.createContext<Auth.User | null> (null);