// import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// interface User {
//   username: string;
//   password: string | null;
//   userID: string;
//   token: string | null;
//   role: string | null;
//   email: string | null;
//   firstName: string | null;
//   lastName: string | null;
//   phoneNumber: string | null;
// }

// interface UserContextProps {
//   user: User;
//   setUser: (user: User) => void;
//   logout: () => void;
// }

// const UserContext = createContext<UserContextProps | undefined>(undefined);

// export const useUserContext = () => {
//   const context = useContext(UserContext);
//   if (!context) {
//     throw new Error('useUserContext must be used within a UserProvider');
//   }
//   return context;
// };

// const defaultUser: User = {
//   username: '',
//   password: null,
//   userID: '',
//   token: null,
//   role: null,
//   email: null,
//   firstName: null,
//   lastName: null,
//   phoneNumber: null,
// };

// export const UserProvider = ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User>(defaultUser);

//   // Persist user data in localStorage
//   const persistUser = (user: User) => {
//     setUser(user);
//     localStorage.setItem('auth_token', user.token || '');
//     localStorage.setItem('role', user.role || '');
//     localStorage.setItem('username', user.username || '');
//     localStorage.setItem('password', user.password || '');
//     localStorage.setItem('userID', user.userID || '');
//     localStorage.setItem('email', user.email || '');
//     localStorage.setItem('firstName', user.firstName || '');
//     localStorage.setItem('lastName', user.lastName || '');
//   };

//   // Load user data from localStorage on app startup
//   useEffect(() => {
//     const storedToken = localStorage.getItem('auth_token');
//     const storedRole = localStorage.getItem('role');
//     const storedUsername = localStorage.getItem('username');
//     const storedPassword = localStorage.getItem('password');
//     const storedUserID = localStorage.getItem('userID');
//     const storedEmail = localStorage.getItem('email');
//     const storedFirstName = localStorage.getItem('firstName');
//     const storedLastName = localStorage.getItem('lastName');    
//     const storedPhoneNumber = localStorage.getItem('phoneNumber');
//     if (storedToken && storedRole && storedUsername && storedUserID) {
//       setUser({
//         username: storedUsername,
//         password: storedPassword,
//         userID: storedUserID,
//         token: storedToken,
//         role: storedRole,
//         email: storedEmail,
//         firstName: storedFirstName,
//         lastName: storedLastName,
//         phoneNumber: storedPhoneNumber, // Add phone number if needed
//       });
//     }

//     console.log('Restoring user from localStorage:', {
//       storedToken,
//       username: localStorage.getItem('username'),
//       userID: localStorage.getItem('userID'),
//     });
//   }, []);

//   // Logout function
//   const logout = () => {
//     localStorage.clear();
//     setUser(defaultUser);
//   };

//   return (
//     <UserContext.Provider value={{ user, setUser: persistUser, logout }}>
//       {children}
//     </UserContext.Provider>
//   );
// };










import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  username: string;
  password?: string | null; // Optional to avoid sensitive data handling
  userID: string;
  token: string | null;
  role: string | null;
  email: string | null;
  firstName: string | null;
  lastName: string | null;
  phoneNumber: string | null;
}

interface UserContextProps {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

const defaultUser: User = {
  username: '',
  password: null,
  userID: '',
  token: null,
  role: null,
  email: null,
  firstName: null,
  lastName: null,
  phoneNumber: null,
};

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User>(defaultUser);

  // Persist user data in localStorage
  const persistUser = (user: User) => {
    setUser(user);
    localStorage.setItem('auth_token', user.token || '');
    localStorage.setItem('role', user.role || '');
    localStorage.setItem('username', user.username || '');
    localStorage.setItem('userID', user.userID || '');
    localStorage.setItem('email', user.email || '');
    localStorage.setItem('firstName', user.firstName || '');
    localStorage.setItem('lastName', user.lastName || '');
    localStorage.setItem('phoneNumber', user.phoneNumber || '');
  };

  // Load user data from localStorage on app startup
  useEffect(() => {
    const storedUser: User = {
      username: localStorage.getItem('username') || '',
      userID: localStorage.getItem('userID') || '',
      token: localStorage.getItem('auth_token'),
      role: localStorage.getItem('role'),
      email: localStorage.getItem('email'),
      firstName: localStorage.getItem('firstName'),
      lastName: localStorage.getItem('lastName'),
      phoneNumber: localStorage.getItem('phoneNumber'),
    };

    setUser(storedUser);

    console.log('User restored from localStorage:', storedUser, user);
  }, []);

  // Logout function
  const logout = () => {
    localStorage.clear();
    setUser(defaultUser);
  };

  return (
    <UserContext.Provider value={{ user, setUser: persistUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};
