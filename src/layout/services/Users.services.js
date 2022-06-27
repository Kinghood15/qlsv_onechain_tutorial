import {db, auth} from "../Firebase"
import { collection, getDocs, addDoc, getDoc, updateDoc,deleteDoc, doc,} from 'firebase/firestore';
const usersCollectionRef = collection(db, "users")

class UsersDataService{
    addUser = (newUser) => {
        return addDoc(usersCollectionRef, newUser);
    }

    updateUser = (id,updateUser) => {
        const userDoc = doc(db, "users",id);
        return updateDoc(userDoc, updateUser);
    }

    deleteUser = (id) => {
        const userDoc = doc(db, "users",id);
        return deleteDoc(userDoc);

    }

    getAllUsers = () => {
        return getDocs(usersCollectionRef);
    }

    getUser = (id) => {
        const userDoc = doc(db, "users",id);
        return getDoc(userDoc);
    };
}
export default new UsersDataService();