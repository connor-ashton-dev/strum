import { Session } from '@supabase/supabase-js';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { supabase } from '../supabaseConfig';

type AuthProps = {
  currentUser: any;
  setCurrentUser: React.Dispatch<React.SetStateAction<any>>;
  phoneNumber: any;
  setPhoneNumber: React.Dispatch<React.SetStateAction<any>>;
  name: any;
  username: any;
  age: any;
  location: any;
  images: any;
  recording: any;
  setRecording: React.Dispatch<React.SetStateAction<any>>;
  setImages: React.Dispatch<React.SetStateAction<any>>;
  setUsername: React.Dispatch<React.SetStateAction<any>>;
  setName: React.Dispatch<React.SetStateAction<any>>;
  setAge: React.Dispatch<React.SetStateAction<any>>;
  setLocation: React.Dispatch<React.SetStateAction<any>>;
};

const AuthContext = createContext<AuthProps>({
  currentUser: null,
  setCurrentUser: () => {},
  phoneNumber: null,
  setPhoneNumber: () => {},
  name: null,
  username: null,
  age: null,
  location: null,
  images: null,
  recording: null,
  setRecording: () => {},
  setImages: () => {},
  setUsername: () => {},
  setName: () => {},
  setAge: () => {},
  setLocation: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currUser, setCurrUser] = useState<any>(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState(null);
  const [recording, setRecording] = useState();

  supabase.auth.onAuthStateChange((event, session) => {
    setCurrUser(session);
  });

  return (
    <AuthContext.Provider
      value={{
        currentUser: currUser,
        setCurrentUser: setCurrUser,
        phoneNumber: phone,
        setPhoneNumber: setPhone,
        name: name,
        age: age,
        username: username,
        location: location,
        images: images,
        recording: recording,
        setRecording: setRecording,
        setImages: setImages,
        setAge: setAge,
        setName: setName,
        setUsername: setUsername,
        setLocation: setLocation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
