import { db, auth } from "../Firebase";
import { doc, setDoc, addDoc, getDoc, updateDoc, deleteDoc, getDocs, collection, query, where, FieldValue, orderBy, limit } from "firebase/firestore";
import {useState} from 'react';
const usersCollectionRef = collection(db, "users")

class UsersDataService {
    addUser = (newUser) => {
        return addDoc(usersCollectionRef, newUser);
    }
    addStudentId = async () => {
        const q = query(usersCollectionRef, orderBy("studentId", "desc"), limit(1));
        try {
            const querySnapshot = await getDocs(q);
            var studentIdNew;
            querySnapshot.forEach((doc) => {
                // console.log("doc in addStudentId",doc.data())
                studentIdNew = parseInt(doc.data().studentId) + 1;
            })
            console.log("studentIdNew = ",studentIdNew);
            try{
                const userDoc = query(usersCollectionRef, where("studentId", "!=", studentIdNew.toString()));
                const querySnapshotStudentIdCheck = await getDocs(userDoc);
                var studentIdTrue;
                querySnapshotStudentIdCheck.forEach((doc) => {
                    studentIdTrue = doc.data().studentId;
                })
                if(studentIdTrue){
                    try {
                        const studentIdForm = {"studentId":studentIdNew.toString()}
                        console.log("await addDoc(usersCollectionRef, studentIdForm);",await addDoc(usersCollectionRef, studentIdForm));
                    } catch (err) {
                        console.log("query create id student id in studentForm :", err);
                    }
                }else{
                    console.log("studentId bi trung ")
                }
            }catch(err){
                console.log("query check studentid in users",err);
            }
            
        } catch (err) {
            console.log("query create id student id in auto increment :", err);
        }
        // return addDoc(usersCollectionRef,studentId)
    }

    updateUser = (id, updateUser) => {
        const userDoc = doc(db, "users", id);
        return updateDoc(userDoc, updateUser);
    }

    deleteUser = (id) => {
        const userDoc = doc(db, "users", id);
        return deleteDoc(userDoc);

    }

    getAllUsers = () => {
        // console.log("getAllUsers",getDocs(usersCollectionRef))
        return getDocs(usersCollectionRef);
    }
    getUser = (id) => {
        const userDoc = doc(db, "users", id);
        return getDoc(userDoc);
    };
    getUserById = (id) => {
        const userDoc = doc(db, "users", id);
        return getDoc(userDoc).studentId;
    };
    getUserByStudentId = (studentId) => {
        console.log("studentId in getUserByStudentId",studentId);
        const userDoc = doc(db, "users", where("studentId", "==", studentId));
        return getDoc(userDoc);

    }
    signinStudent = (studentId, password) => {
        // const userDocs =doc(db, "users", where("studentId","==", studentId.trim()), where("password","==",password.trim()));
        // const userDoc = doc(db, "users", where("studentId", "==", studentId));
        
        // console.log("userDocs in UserService",userDocs);
        // console.log("getDoc in UserService",getDoc(userDocs));
        const userDoc =query(collection(db, "users"), where("studentId", "==", studentId),where("password", "==", password));
        return getDocs(userDoc);
        
    }
    checkUserByStudentId = (studentId) => {
        const userDoc =query(collection(db, "users"), where("studentId", "==", studentId));
        return getDocs(userDoc);
    }
    checkUserByEmail = (email) => {
        const userDoc =query(collection(db, "users"), where("email", "==", email));
        return getDocs(userDoc);
    }
    getUsersByStudentIdAsc = () => {
        const userDoc = query(collection(db, "users"), orderBy("studentId",'asc'));
        return getDocs(userDoc);
    }
    getUsersByStudentIdDesc = () => {
        const userDoc = query(collection(db, "users"), orderBy("studentId",'desc'));
        return getDocs(userDoc);
    }
    getUsersByEmailAsc = () => {
        const userDoc = query(collection(db, "users"), orderBy("email",'asc'));
        return getDocs(userDoc);
    }
    getUsersByEmailDesc = () => {
        const userDoc = query(collection(db, "users"), orderBy("email",'desc'));
        return getDocs(userDoc);
    }
    getUsersByAddressAsc = () => {
        const userDoc = query(collection(db, "users"), orderBy("address",'asc'));
        return getDocs(userDoc);
    }
    getUsersByAddressDesc = () => {
        const userDoc = query(collection(db, "users"), orderBy("address",'desc'));
        return getDocs(userDoc);
    }
    getUsersByScienceBranchAsc = () => {
        const userDoc = query(collection(db, "users"), orderBy("scienceBranch",'asc'));
        return getDocs(userDoc);
    }
    getUsersByScienceBranchDesc = () => {
        const userDoc = query(collection(db, "users"), orderBy("scienceBranch",'desc'));
        return getDocs(userDoc);
    }
    getUsersByNameClassAsc = () => {
        const userDoc = query(collection(db, "users"), orderBy("nameClass",'asc'));
        return getDocs(userDoc);
    }
    getUsersByNameClassDesc = () => {
        const userDoc = query(collection(db, "users"), orderBy("nameClass",'desc'));
        return getDocs(userDoc);
    }
    getUsersByGenderMale = () => {
        const userDoc = query(collection(db, "users"), where("gender",'==','Nam'));
        return getDocs(userDoc);
    }
    getUsersByGenderFemale = () => {
        const userDoc = query(collection(db, "users"), where("gender",'==','N???'));
        return getDocs(userDoc);
    }
    getUsersByGender = async(gender) => {
        const userDoc = query(collection(db, "users"), where("gender",'in',gender));
        return await getDocs(userDoc);
    }
    getUsersByNameClass = async(nameClass) => {
        const userDoc = query(collection(db, "users"), where("nameClass",'in',nameClass));
        return await getDocs(userDoc);
    }
    getUsersByScienceBranch = async(scienceBranch) => {
        const userDoc = query(collection(db, "users"), where("scienceBranch",'in',scienceBranch));
        return await getDocs(userDoc);
    }
    getUsersByFilter = (gender,scienceBranch,nameClass) => {
        // const countTrue = 0;
        // if(Array.isArray(gender) === false){
        //     const genderArr = gender.split(",");
        //     // const scienceBranchArr = scienceBranch.split(",");
        //     // const nameClassArr = nameClass.split(",");
        //     //  getDocument;
        //     var getDocument;
        //     genderArr.forEach((doc) => {
        //         if(doc === ""){
        //             console.log("doc is null");
        //         }else{
        //             console.log("doc in genderArr: " + doc);
        //             const userDocs = query(collection(db, "users"),where("gender",'==',doc));
        //             if(getDocument === undefined){
        //                 getDocument = getDocs(userDocs);
        //             }else{
        //                 getDocument += getDocs(userDocs);
        //             }
        //         }
            
        //     })
        //     console.log("getDocument: ",getDocument);
        // }



        if(Array.isArray(gender) === false){
            const genderArr = gender.split(",");
            // const scienceBranchArr = scienceBranch.split(",");
            // const nameClassArr = nameClass.split(",");
            var  getDocument;
            var dataDocument;
            genderArr.forEach((doc) => {
                if(doc === ""){
                    console.log("doc is null");
                }else{
                    console.log("doc in genderArr: " + doc);
                    // getDocument = getUsersByGender(doc);
                    console.log("getDocument in genderArr: ",getDocument); 
                    getDocument.forEach((item) =>{
                        if(item.data()){
                            if(dataDocument === undefined){
                                dataDocument = item.data();
                            }else{
                                dataDocument += item.data();
                            }
                        }
                    })         
                }
            
            })
            console.log("getDocument: ",getDocument);


            console.log("dataDocument: ",dataDocument);
        }
        console.log("scienceBranch",scienceBranch);
        console.log("scienceBranch.isArray([])",Array.isArray(scienceBranch));
        // console.log("nameClass.isArray([])",nameClass.isArray([]));



        // if(genderArr.length > 0 && scienceBranchArr.length === 0 && nameClassArr.length === 0){
        //     var userDoc;
        //     for(var i=0; i<genderArr.length; i++){
        //         userDoc = query(collection(db, "users"),where("gender",'==',genderArr[i]));
        //     }
        //     // const userDoc = query(collection(db, "users"),where("gender",'==',genderArr[0]), where("gender",'==',genderArr[1]));
        //     return getDocs(userDoc);
        // }else if(genderArr.length === 0 && scienceBranchArr.length > 0 && nameClassArr.length === 0){
        //     const userDoc = query(collection(db, "users"),where("scienceBranch",'==',scienceBranchArr[0]), where("scienceBranch",'==',scienceBranchArr[1]));
        //     return getDocs(userDoc);
        // }else if(genderArr.length === 0 && scienceBranchArr.length === 0 && nameClassArr.length > 0){
        //     const userDoc = query(collection(db, "users"),where("nameClass",'==',nameClassArr[0]), where("nameClass",'==',nameClassArr[1]));
        //     return getDocs(userDoc);
        // }else if(genderArr.length > 0 && scienceBranchArr.length > 0 && nameClassArr.length === 0){
            
        // }else if(genderArr.length === 0 && scienceBranchArr.length > 0 && nameClassArr.length > 0){
            
        // }else if(genderArr.length > 0 && scienceBranchArr.length === 0 && nameClassArr.length > 0){
            
        // }else if(genderArr.length > 0 && scienceBranchArr.length > 0 && nameClassArr.length > 0){
            
        // }
        // // if(gender.length > 0 && address.length > 0 && scienceBranch.length >0 && nameClass.length > 0){
        // //     const userDoc = query(collection(db, "users"),where("gender",'==',gender), where("address",'==',address), where("scienceBranch",'==',scienceBranch), where("nameClass",'==',nameClass));
        // //     return getDocs(userDoc);
        // // }
        // let queryCheck;
        // if(isCheckMenu.gender.length > 0 && isCheckMenu.scienceBranch.length > 0 && isCheckMenu.nameClass.length > 0) {
        //     const userDoc = query(collection(db, "users"),where("gender",'==',gender), where("scienceBranch",'==',scienceBranch), where("nameClass",'==',nameClass));
        //     return getDocs(userDoc);
        // }else if(isCheckMenu.gender.length === 0 && isCheckMenu.scienceBranch.length > 0 && isCheckMenu.nameClass.length > 0){
        //     const userDoc = query(collection(db, "users"),where("gender",'>=',gender), where("scienceBranch",'==',scienceBranch), where("nameClass",'==',nameClass));
        //     return getDocs(userDoc);
        // }else if(isCheckMenu.gender.length > 0 && isCheckMenu.scienceBranch.length === 0 && isCheckMenu.nameClass.length > 0){
        //     const userDoc = query(collection(db, "users"),where("gender",'==',gender), where("scienceBranch",'>=',scienceBranch), where("nameClass",'==',nameClass));
        //     return getDocs(userDoc);
        // }else if(isCheckMenu.gender.length > 0 && isCheckMenu.scienceBranch.length > 0 && isCheckMenu.nameClass.length === 0){
        //     const userDoc = query(collection(db, "users"),where("gender",'==',gender), where("scienceBranch",'==',scienceBranch), where("nameClass",'>=',nameClass));
        //     return getDocs(userDoc);
        // }else if(isCheckMenu.gender.length === 0 && isCheckMenu.scienceBranch.length === 0 && isCheckMenu.nameClass.length > 0){
        //     const userDoc = query(collection(db, "users"),where("gender",'>=',gender), where("scienceBranch",'>=',scienceBranch), where("nameClass",'==',nameClass));
        //     return getDocs(userDoc);
        // }else if(isCheckMenu.gender.length > 0 && isCheckMenu.scienceBranch.length === 0 && isCheckMenu.nameClass.length === 0){
        //     const userDoc = query(collection(db, "users"),where("gender",'==',gender), where("scienceBranch",'>=',scienceBranch), where("nameClass",'>=',nameClass));
        //     return getDocs(userDoc);
        // }else if(isCheckMenu.gender.length === 0 && isCheckMenu.scienceBranch.length > 0 && isCheckMenu.nameClass.length === 0){
        //     const userDoc = query(collection(db, "users"),where("gender",'>=',gender), where("scienceBranch",'==',scienceBranch), where("nameClass",'>=',nameClass));
        //     return getDocs(userDoc);
        // }else{
        //     const userDoc = query(collection(db, "users"),where("gender",'>=',gender), where("scienceBranch",'>=',scienceBranch), where("nameClass",'>=',nameClass));
        //     return getDocs(userDoc);
        // }
    }
}
export default new UsersDataService();