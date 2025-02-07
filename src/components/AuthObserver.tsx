import { useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import { useAuthStore } from "../store/useAuthStore";

function AuthObserver() {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      useAuthStore.setState({ user, loading: false });
    });
    return () => unsubscribe();
  }, []);

  return null;
}

export default AuthObserver;
