import { useEffect, useState } from "react";
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
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [redirectAfterLogin, setRedirectAfterLogin] = useState(null);

  // const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  const axiosPublic = useAxiosPublic();

  const googleSigIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateUserProfileName = (name) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
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
      setLoading(true);
      if (currentUser) {
        setUser(currentUser);
        const userInfo = { email: currentUser.email };
        axiosPublic.post("/jwt", userInfo).then((res) => {
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
  }, [axiosPublic]);

  const authInfo = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signInUser,
    logout,
    updateUserProfileName,
    googleSigIn,
    updateUser,
    isModalOpen,
    setIsModalOpen,
    passwordResetEmail,
    sendEmailVerification,
    // isEnrollModalOpen,
    // setIsEnrollModalOpen,
    redirectAfterLogin,
    setRedirectAfterLogin,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
