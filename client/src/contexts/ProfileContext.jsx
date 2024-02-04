import { createContext, useContext } from 'react';

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  return (
    <ProfileContext.Provider value='dsa'>{children}</ProfileContext.Provider>
  );
};

// creating custom hook
const useProfile = () => {
  return useContext(ProfileContext);
};
export { ProfileContext, ProfileProvider, useProfile };
