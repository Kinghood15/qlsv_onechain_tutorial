import { db, auth } from "../Firebase";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where, FieldValue, orderBy, limit } from "firebase/firestore";
const usersCollectionRef = collection(db, "userTeachers")

class UsersTeacherDataService {
    addUserTeacher = (newUser) => {
        return addDoc(usersCollectionRef, newUser);
    }

    updateUserTeacher = (id, updateUser) => {
        const userDoc = doc(db, "userTeachers", id);
        return updateDoc(userDoc, updateUser);
    }

    deleteUserTeacher = (id) => {
        const userDoc = doc(db, "userTeachers", id);
        return deleteDoc(userDoc);

    }

    getAllUsers = () => {
        // console.log("getAllUsers",getDocs(usersCollectionRef))
        return getDocs(usersCollectionRef);
    }
    getUser = (id) => {
        const userDoc = doc(db, "userTeachers", id);
        return getDoc(userDoc);
    };
    getUserById = (id) => {
        const userDoc = doc(db, "userTeachers", id);
        return getDoc(userDoc).studentId;
    };
}
export default new UsersTeacherDataService();