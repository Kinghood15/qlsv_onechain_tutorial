import { db, auth } from "../Firebase";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where, FieldValue, orderBy, limit } from "firebase/firestore";
const usersCollectionRef = collection(db, "usersTeacher")

class UsersTeacherDataService {
    addUserTeacher = (newUser) => {
        return addDoc(usersCollectionRef, newUser);
    }

    updateUserTeacher = (id, updateUser) => {
        const userDoc = doc(db, "usersTeacher", id);
        return updateDoc(userDoc, updateUser);
    }

    deleteUserTeacher = (id) => {
        const userDoc = doc(db, "usersTeacher", id);
        return deleteDoc(userDoc);

    }

    getAllUsers = () => {
        // console.log("getAllUsers",getDocs(usersCollectionRef))
        return getDocs(usersCollectionRef);
    }
    getUser = (id) => {
        const userDoc = doc(db, "usersTeacher", id);
        return getDoc(userDoc);
    };
    getUserById = (id) => {
        const userDoc = doc(db, "usersTeacher", id);
        return getDoc(userDoc).studentId;
    };
    // getUserByStudentId = async (studentId) => {
    //     const userDoc = doc(db, "usersTeacher", where("studentId", "==", studentId));
    //     return getDoc(userDoc);

    // }
    // checkUserByStudentId = async (studentId) => {
    //     const userDoc = query(usersCollectionRef, where("studentId", "==", studentId));
    //     return await getDocs(userDoc);
        // var studentIdTrue;
        // querySnapshotStudentIdCheck.forEach((doc) => {
        //     return doc
        // })
    // }
}
export default new UsersTeacherDataService();