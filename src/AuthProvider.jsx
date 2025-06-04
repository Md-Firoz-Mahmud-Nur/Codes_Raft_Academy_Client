//my edited private route
import { createContext, useEffect, useState } from "react";

import auth from "./Firebase.config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import useAxiosPublic from "./Hooks/useAxiosPublic";
export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  // const [archiveData, setArchiveData] = useState([]);

  // const updateArchiveData = (newData) => {
  //   setArchiveData(newData);
  //   console.log("Updated archiveData:", newData);
  // };

  const googleSigIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserprofile = (name, photo) => {
    setLoading(true);

    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(async () => {
        setLoading(false);
        await auth.currentUser.reload();
        setUser(auth.currentUser);
      })
      .catch((error) => {
        alert(error);
        setLoading(false);
      });
  };

  const updateUser = (u) => {
    setUser(u);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  const passwordResetEmail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // setUser(currentUser);
      // console.log("effeect", currentUser);

      if (currentUser) {
        setUser(currentUser);
        // console.log("effeect", currentUser);
        const userInfo = { email: currentUser.email };
        // console.log(userInfo);
        axiosPublic.post("/jwt", userInfo).then((res) => {
          // console.log(res.data.token);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
            setLoading(false);
          }
        });
      } else {
        setUser(null);
        localStorage.removeItem("access-token");
      }
      setLoading(false);
    });
    return () => {
      return unsubscribe();
    };
  }, [auth]);
  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    logout,
    updateUserprofile,
    googleSigIn,
    updateUser,
    isModalOpen,
    setIsModalOpen,
    passwordResetEmail,
    sendEmailVerification,
    // archiveData,
    // setArchiveData,
    // updateArchiveData,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
