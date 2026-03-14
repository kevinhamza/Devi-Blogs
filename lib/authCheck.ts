import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";


export function checkAuth(callback : any) {
    onAuthStateChanged(auth, (user) => {
        callback(user);
    });
}