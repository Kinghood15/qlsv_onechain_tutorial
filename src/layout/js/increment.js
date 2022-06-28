import {db, auth} from "../Firebase"
import { collection, getDocs, addDoc, getDoc, updateDoc,deleteDoc, doc, FieldValue} from 'firebase/firestore';

const increment = FieldValue.increment(1);
const batch = db.batch();
// const 