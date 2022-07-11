import {useState,useEffect} from 'react';
import UserDataService from './services/Users.services';
import ChangePasswordStudent from './ChangePasswordStudent';
import EditUser from '../layout/pages/EditUser';
const UserStudentForm = () => {
    const [isInputForm, setIsInputForm] = useState({
        "firstName": '',
        "password": "",
        "lastName": "",
        "studentId": "",
        "address": "",
        "avatar": "",
        "birthday": "",
        "email": "",
        "gender": "",
        "nameClass": "",
        "scienceBranch": ""
    });
    console.log("LocalStorage.getItem(Authorization) in UserStudentForm",localStorage.getItem('Authorization'))
    const userStudent = JSON.parse(localStorage.getItem('Authorization'));
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
                            <ChangePasswordStudent nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} isInputFormChangePassword={isInputForm} />
                        )
                    case 2: 
                        return(
                            <EditUser nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} isInputFormEditUser={isInputForm} />
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