import {db, auth} from "../Firebase"
import { collection, getDocs, addDoc, getDoc, updateDoc,deleteDoc, doc,} from 'firebase/firestore';
const classCollectionRef = collection(db, "class")

class ClassDataService{
    addUser = (newClass) => {
        return addDoc(classCollectionRef, newClass);
    }

    updateClass = (id,updateClass) => {
        const userDoc = doc(db, "class",id);
        return updateDoc(userDoc, updateClass);
    }

    deleteClass = (id) => {
        const userDoc = doc(db, "class",id);
        return deleteDoc(userDoc);

    }

    getAllClass = () => {
        return getDocs(classCollectionRef);
    }

    getClass = (id) => {
        const classDoc = doc(db, "class",id);
        return getDoc(classDoc);
    };
}
export default new ClassDataService();