import {useState,useEffect} from 'react';
import UserDataService from './services/Users.services';
import ChangePasswordStudent from './ChangePasswordStudent';
import EditUserPage1 from '../layout/pages/EditUserPage1';
import EditUserPage2 from '../layout/pages/EditUserPage2';
import EditUserPage3 from '../layout/pages/EditUserPage3';
import { UserAuth } from './Provider/AuthContextProvider';
const UserStudentForm = () => {
    const { userStudent } = UserAuth();
    console.log("UserStudent in UserStudentForm",userStudent)
    const [isInputForm, setIsInputForm] = useState({
        "firstName": userStudent.firstName,
        "password": userStudent.password,
        "lastName": userStudent.lastName,
        "studentId": userStudent.studentId,
        "address": userStudent.address,
        "avatar": userStudent.avatar,
        "birthday": userStudent.birthday,
        "email": userStudent.email,
        "gender": userStudent.gender,
        "nameClass": userStudent.nameClass,
        "scienceBranch": userStudent.scienceBranch
    });
    console.log("isInputForm in UserStudentForm",isInputForm);
    console.log("LocalStorage.getItem(Authorization) in UserStudentForm",localStorage.getItem('Authorization'))
    // const userStudent = JSON.parse(localStorage.getItem('Authorization'));
    console.log("userStudent in UserStudentForm",userStudent.password);
    const [step,setStep] = useState(1);
    useEffect(() => {

    },[]);
    const nextStep = () => {
        setStep(step+1);
    }
    const prevStep = () => {
        if(step <= 0) {
            setStep(0);
        }else{
            setStep(step-1);
        }
    }
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;
        setIsInputForm({ ...isInputForm,[name]:value});
    }
    console.log("Step " + step);
    return(
        <>
            {(() => {
                switch (step){
                    case 1:
                        return(
                            <EditUserPage1 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} isInputFormChangePassword={isInputForm} />
                        )
                    case 2: 
                        return(
                            <EditUserPage2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} isInputFormEditUser={isInputForm} />
                        )
                    case 3: 
                        return(
                            <EditUserPage3 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} isInputFormEditUser={isInputForm} />
                        )
                    default:
                        return(
                            <>
                                Home Student
                            </>
                        )
                }
            })()}
        </>
    );
}
export default UserStudentForm;