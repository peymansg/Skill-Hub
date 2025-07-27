import React, { createContext, useState, ReactNode } from "react";
import UserModel from "../../models/UserModel";

// Define the context type
interface UserContextType {
  userData: UserModel; // Replace 'any' with your actual user type if available
  setUserData: React.Dispatch<React.SetStateAction<any>>;
}

// Create context with proper type (nullable)
export const UserContext = createContext<UserContextType | null>(null);

// Define props type for the provider
interface UserProviderProps {
  children: ReactNode;
}

// Context provider component
export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<any>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};
