import React, {createContext, useState, useContext, ReactNode} from 'react';

// Definisikan tipe untuk user
interface User {
  name: string;
  username: string;
}

// Tipe untuk nilai context
interface UserContextType {
  user: User | null;
  signin: (userData: User) => void;
  signout: () => void;
}

// Buat context dengan default value null
const UserContext = createContext<UserContextType | undefined>(undefined);

// Provider untuk UserContext
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({children}) => {
  const [user, setUser] = useState<User | null>(null); // Menyimpan data user

  // Fungsi untuk signin
  const signin = (userData: User) => {
    setUser(userData); // Set data user saat signin
  };

  // Fungsi untuk signout
  const signout = () => {
    setUser(null); // Hapus data user saat signout
  };

  return (
    <UserContext.Provider value={{user, signin, signout}}>
      {children}
    </UserContext.Provider>
  );
};

// Hook untuk menggunakan UserContext di komponen lain
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
