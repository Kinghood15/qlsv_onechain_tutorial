import { useState, useEffect } from 'react';
import UserDataService from './services/Users.services';
import ChangePasswordStudent from './ChangePasswordStudent';
import EditUserPage1 from './pages/EditUserPage1';
import EditUserPage2 from './pages/EditUserPage2';
import EditUserPage3 from './pages/EditUserPage3';
import ScienceBratchServices from './services/ScienceBratch.services';
import { UserAuth } from './Provider/AuthContextProvider';
import { Navigate } from 'react-router-dom';
import { AVATAR_USER } from './env';
const UserTeacherForm = () => {
    const { userStudent } = UserAuth();
    const [isInputForm, setIsInputForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        position: "Giáo viên",
        birthday: "",
        nameScienceBranch: "",
        gender: "Nam",
        avatar: AVATAR_USER,
    });
    const [step, setStep] = useState(1);
    useEffect(() => {

    }, []);
    const nextStep = () => {
        setStep(step + 1);
    }
    const prevStep = () => {
        if (step <= 0) {
            setStep(0);
        } else {
            setStep(step - 1);
        }
    }
    const handleChange = (e) => {
        const target = e.target;
        const name = target.name;
        const value = target.type === "checkbox" ? target.checked : target.value;
        if(name !== ""){
            setIsInputForm({ ...isInputForm, [name]: value });
        }
    }
    console.log("Step " + step);
    const [isScienceBranch, setIsScienceBranch] = useState([]);
    const getScienceBratch = async () => {
        try {
            const data = await ScienceBratchServices.getAllscienceBratch();
            setIsScienceBranch(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
        } catch (e) {
            console.log("Message" + e.message);
        }
    }
    useEffect(() => {
        getScienceBratch();
    },[])
    useEffect(() => {
        if (isScienceBranch && isScienceBranch.length > 0) {
            isScienceBranch.map((item, index) => {
                if (index === 0) {
                    setIsInputForm({ ...isInputForm, ['nameScienceBranch']: item.nameScienceBranch });
                }
            })
        }
    }, [isScienceBranch]);
    return (
        <>
            <section className="h-screen">
                <div className="px-6 h-full text-gray-800">
                    <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
                        <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
                            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="w-full" alt="Sample image" />
                        </div>
                        <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
                            
                            {(() => {
                                switch (step) {
                                    case 1:
                                        return (
                                            <EditUserPage1 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} isInputFormName={isInputForm} />
                                        )
                                    case 2:
                                        return (
                                            <EditUserPage2 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} isInputFormPassword={isInputForm} />
                                        )
                                    case 3:
                                        return (
                                            <EditUserPage3 nextStep={nextStep} prevStep={prevStep} handleChange={handleChange} isInputFormEditUser={isInputForm} />
                                        )
                                    default:
                                        return (
                                            <Navigate to="/giao-vien/sinh-vien" />
                                        )
                                }
                            })()}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
export default UserTeacherForm;