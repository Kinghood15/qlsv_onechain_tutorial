import {db, auth} from "../Firebase"
import { collection, getDocs, addDoc, getDoc, updateDoc,deleteDoc, doc,} from 'firebase/firestore';
const scienceBratchCollectionRef = collection(db, "science_branch")

class scienceBratchDataService{
    addUser = (newscienceBratch) => {
        return addDoc(scienceBratchCollectionRef, newscienceBratch);
    }

    updatescienceBratch = (id,updatescienceBratch) => {
        const userDoc = doc(db, "science_branch",id);
        return updateDoc(userDoc, updatescienceBratch);
    }

    deletescienceBratch = (id) => {
        const userDoc = doc(db, "science_branch",id);
        return deleteDoc(userDoc);

    }

    getAllscienceBratch = () => {
        return getDocs(scienceBratchCollectionRef);
    }

    getscienceBratch = (id) => {
        const scienceBratchDoc = doc(db, "science_branch",id);
        return getDoc(scienceBratchDoc);
    };
}
export default new scienceBratchDataService();