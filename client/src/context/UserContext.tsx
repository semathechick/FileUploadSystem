import React, { createContext, useState } from 'react'

// Define the types for the User and UserContext
type UserType = {
  id: string,
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: number,
  message?: string,
}

type UserContextType = {
  userLoggedIn: UserType,
  setUserLoggedIn: React.Dispatch<React.SetStateAction<UserType>>,
  isUserLoggedIn: boolean,
  setIsUserLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

// Create the UserContext
export const UserContext = createContext<UserContextType | null>(null)

function UserContextProvider({ children }: { children: React.ReactNode }) {
  // Initialize the userLoggedIn state
  const [userLoggedIn, setUserLoggedIn] = useState<UserType>({
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: 0,
    message: "",
  })

  // Initialize the isUserLoggedIn state
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false)

  // Create the value object
  const value: UserContextType = {
    userLoggedIn,
    setUserLoggedIn,
    isUserLoggedIn,
    setIsUserLoggedIn
  }

  return (
    // Provide the value object to the UserContext.Provider
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider