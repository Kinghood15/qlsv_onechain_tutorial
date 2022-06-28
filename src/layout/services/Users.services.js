import {db, auth} from "../Firebase";
import { doc, setDoc, addDoc, getDoc,updateDoc,deleteDoc,getDocs, collection, query, where,FieldValue,orderBy,limit } from "firebase/firestore";
const usersCollectionRef = collection(db, "users")

class UsersDataService{
    addUser = (newUser) => {
        return addDoc(usersCollectionRef, newUser);
    }
    addStudentId = async() => {
        const q = query(usersCollectionRef,orderBy("studentId","desc"),limit(1));
        const querySnapshot = await getDocs(q);
        var studentIdNew;
        querySnapshot.forEach((doc) => {
            console.log("doc in addStudentId",doc.data())
            studentIdNew = parseInt(doc.data().studentId) + 1;
        })
        const studentId = {"studentId":studentIdNew.toString()}
        const checkStudentId = this.getUserByStudentId(studentIdNew.toString());
        console.log("checkStudentId",checkStudentId)
        // return addDoc(usersCollectionRef,studentId)
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
        // console.log("getAllUsers",getDocs(usersCollectionRef))
        return getDocs(usersCollectionRef);
    }

    getUser = (id) => {
        const userDoc = doc(db, "users",id);
        return getDoc(userDoc);
    };
    getUserById = (id) => {
        const userDoc = doc(db, "users",id);
        return getDoc(userDoc).studentId;
    };
    getUserByStudentId = async(studentId) => {
        const userDoc = doc(db, "users",where("studentId","==",studentId));
        return getDoc(userDoc);

    }
}
export default new UsersDataService();