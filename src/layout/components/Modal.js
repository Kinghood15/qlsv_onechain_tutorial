import React, { useState, useEffect } from 'react';
import ClassDataService from '../services/Class.services';
import ScienceBratchServices from '../services/ScienceBratch.services';
import UserDataService from '../services/Users.services';
import '../css/editModal.css';
import { useValidator } from "@validator.tool/hook";
import { confirmAlert } from 'react-confirm-alert';
export default function Modal({ modal, data, closeModal }) {
  const [modalTitle, setModalTitle] = useState();
  const [modalContent, setModalContent] = useState({});
  const [modalButton, setModalButton] = useState(false);
  const [colorInput, setColorInput] = useState({
    'studentId': 'border-gray-300',
    'firstName': 'border-gray-300',
    'lastName': 'border-gray-300',
    'nameClass': 'border-gray-300',
    'address': 'border-gray-300',
    'email': 'border-gray-300',
    'birthday': 'border-gray-300',
    'scienceBranch': 'border-gray-300',
    'gender': 'border-gray-300',
  })
  const [validateInput, setValidateInput] = useState({
    'studentId': '',
    'firstName': '',
    'lastName': '',
    'nameClass': '',
    'address': '',
    'email': '',
    'birthday': '',
    'scienceBranch': '',
    'gender': '',
  })

  const [isScienceBranch, setIsScienceBranch] = useState([]);
  const getScienceBratch = async () => {
    try {
      const data = await ScienceBratchServices.getAllscienceBratch();
      setIsScienceBranch(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
    } catch (e) {
      console.log("Message" + e.message);
    }
  }
  const [isClass, setIsClass] = useState([]);
  const getClass = async () => {
    const data = await ClassDataService.getAllClass();
    setIsClass(data.docs.map((docs) => ({ ...docs.data(), id: docs.id })));
  }
  useEffect(() => {
    if (modal === 'view') {
      setModalTitle('Thông tin chi tiết người dùng');
      setModalContent({
        "studentId": data.studentId,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "address": data.address,
        "birthday": data.birthday,
        "nameClass": data.nameClass,
        "gender": data.gender,
        "email": data.email,
        "avatar": data.avatar,
        "scienceBranch": data.scienceBranch
      });
      setModalButton(false);
    } else if (modal === 'edit') {
      setModalTitle('Sửa thông tin chi tiết người dùng');
      setModalContent({
        "studentId": data.studentId,
        "firstName": data.firstName,
        "lastName": data.lastName,
        "address": data.address,
        "birthday": data.birthday,
        "nameClass": data.nameClass,
        "gender": data.gender,
        "email": data.email,
        "avatar": data.avatar,
        "scienceBranch": data.scienceBranch
      });
      setModalButton(true);
      getScienceBratch();
      getClass();
    }
  }, [])
  const [isInputForm, setIsInputForm] = useState({
    "studentId": data.studentId,
    "firstName": data.firstName,
    "lastName": data.lastName,
    "address": data.address,
    "birthday": data.birthday,
    "nameClass": data.nameClass,
    "gender": data.gender,
    "email": data.email,
    "avatar": data.avatar,
    "scienceBranch": data.scienceBranch
});

  const onReset = (value) => {
    setIsInputForm({ ...value });
  }
  const getEmergencyFoundImg = (urlImg) => {
    var reader = new FileReader();
    var baseString;
    reader.onloadend = function () {
        baseString = reader.result;
        setIsInputForm({...isInputForm, ['avatar']: baseString});
    };
    reader.readAsDataURL(urlImg.target.files[0]);
  };
  function handleChange(env) {
    const target = env.target;

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setIsInputForm({ ...isInputForm, [name]: value });
  }
  // const onSubmit = async (value) => {
    // try {
      // console.log("isInputForm in Submit", isInputForm)
     
    // } catch (error) {
      // console.log("Message: UserDataService.updateUser ", error);
    // }
  // }
  const { validator, handleReset, handleSubmit } = useValidator({
    initValues: isInputForm
  });
  const editHandler = (id) => {
    confirmAlert({
        title: 'Cảnh báo',
        message: 'Bạn có chắc chắn muốn sửa người dùng này không ?',
        buttons: [
            {
                label: 'Yes',
                onClick: async () => {
                  await UserDataService.updateUser(data.id, isInputForm)
                  closeModal(false)
                }
            },
            {
                label: 'No',
                onClick: () => true
            }
        ]
    })
};
  return (
    <>
      {/* <!-- Modal --> */}
      <div className="bg-black opacity-50 fixed top-0 left-0 w-screen h-screen z-10"></div>
      <div className="modal fade fixed top-0 left-0 block w-full m-auto h-full z-20 outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" >
        <div className={(modal === 'view' ? 'w-[30vw] ' : 'w-[60vw] ') + `modal-dialo m-auto mt-8 pointer-events-none`}>
          <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
              className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                {modalTitle}
              </h5>
              <button type="button"
                className="btn-close box-content text-center w-5 h-5 bg-sky-500 p-1 flex items-center justify-center font-bold rounded text-white border-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" onClick={() => closeModal(false)} aria-label="Close">X</button>
            </div>
            <div className="modal-body relative p-4">
              {(() => {
                if (modal === 'view') {
                  return (
                    <>
                      <div className="avatar">
                        <img src={modalContent.avatar} alt={modalContent.fistName} className="w-28 h-28 rounded-full m-auto" />
                      </div>
                      <div className="flex justify-space-between p-2">
                        <h5 className="text-black font-bold px-5">Mã sinh viên :</h5>
                        <p className="text-black">{modalContent.studentId}</p>
                      </div>
                      <div className="flex justify-space-between p-2">
                        <h5 className="text-black font-bold px-5">Họ và tên sinh viên :</h5>
                        <p className="text-black">{modalContent.firstName + ' ' + modalContent.lastName}</p>
                      </div>
                      <div className="flex justify-space-between p-2">
                        <h5 className="text-black font-bold px-5">Địa chỉ:</h5>
                        <p className="text-black">{modalContent.address}</p>
                      </div>
                      <div className="flex justify-space-between p-2">
                        <h5 className="text-black font-bold px-5">Ngày sinh:</h5>
                        <p className="text-black">{modalContent.birthday}</p>
                      </div>
                      <div className="flex justify-space-between p-2">
                        <h5 className="text-black font-bold px-5">Email:</h5>
                        <p className="text-black">{modalContent.email}</p>
                      </div>
                      <div className="flex justify-space-between p-2">
                        <h5 className="text-black font-bold px-5">Lớp học:</h5>
                        <p className="text-black">{modalContent.nameClass}</p>
                      </div>
                      <div className="flex justify-space-between p-2">
                        <h5 className="text-black font-bold px-5">Giới tính:</h5>
                        <p className="text-black">{modalContent.gender}</p>
                      </div>
                      <div className="flex justify-space-between p-2">
                        <h5 className="text-black font-bold px-5">Khoa ngành:</h5>
                        <p className="text-black">{modalContent.scienceBranch}</p>
                      </div>
                    </>
                  );
                } else if (modal === 'edit') {
                  return (
                    <>
                      <form onReset={handleReset(onReset)} onSubmit={handleSubmit(editHandler)} onChange={handleChange}>
                        <div className="profile-pic">
                          <label className="-label" htmlFor="file">
                            <span className="glyphicon glyphicon-camera"></span>
                            <span>Change Image</span>
                          </label>
                          <input id="file" type="file" onChange={getEmergencyFoundImg} />
                          <img src={isInputForm.avatar} id="output" className="w-28 h-28  rounded-full m-auto" />
                        </div>
                        <div className="mb-10 xl:w-96">
                          <label className="form-label inline-block mb-2 text-gray-700" htmlFor="studentId">Mã sinh viên</label>
                          <input value={isInputForm.studentId} name="studentId" required type="text" className={`${colorInput.studentId} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 text-black bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="studentId" placeholder="Mã sinh viên" />
                          <span className={`${colorInput.studentId}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.studentId}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" htmlFor="firstName">Họ sinh viên</label>
                            <input value={isInputForm.firstName} placeholder="Họ sinh viên" required type="text" className={`${colorInput.firstName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="firstName`} name="firstName" />
                          </div>
                          <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" htmlFor="lastName">Tên sinh viên</label>
                            <input value={isInputForm.lastName} placeholder="Tên sinh viên" required type="text" className={`${colorInput.lastName} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="lastName" name="lastName" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" htmlFor="email">Email</label>
                            <input value={isInputForm.email} placeholder="Email" required type="email" className={`${colorInput.email} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="email" name="email" />
                            <span className={`${colorInput.email}` === 'border-red-300' ? 'text-red-400' : 'text-green-400'}>{validateInput.email}</span>
                          </div>
                          <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" htmlFor="address">Địa chỉ</label>
                            <input value={isInputForm.address} placeholder="Địa chỉ" required type="text" className={`${colorInput.address} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="address" name="address" />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" htmlFor="birthday">Ngày sinh sinh viên</label>
                            <input value={isInputForm.birthday} required type="date" className={`${colorInput.birthday} form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} id="birthday" name="birthday" />
                          </div>
                          <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" htmlFor="gender">Giới tính:</label>
                            <select value={isInputForm.gender} name="gender" id="gender" className={`${colorInput.gender} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="gender">
                              <option name="gender" value="Nam" selected>Nam</option>
                              <option name="gender" value="Nữ">Nữ</option>
                            </select>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" htmlFor="scienceBranch">Khoa ngành:</label>
                            <select value={isInputForm.scienceBranch} name="scienceBranch" id="scienceBranch" className={`${colorInput.scienceBranch} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Khoa nganh">
                              {isScienceBranch.map((item) => {
                                if (isInputForm.scienceBranch === item.nameScienceBranch) {
                                  return (
                                    <>
                                      <option name="scienceBranch" key={item.id} selected value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
                                    </>
                                  );
                                } else {
                                  return (
                                    <>
                                      <option name="scienceBranch" key={item.id} value={item.nameScienceBranch}>{item.nameScienceBranch}</option>
                                    </>
                                  );
                                }
                              })}
                            </select>
                          </div>
                          <div className="mb-10 xl:w-96">
                            <label className="form-label inline-block mb-2 text-gray-700" htmlFor="class">Lớp:</label>
                            <select value={isInputForm.nameClass} name="nameClass" id="nameClass" className={`${colorInput.nameClass} form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`} aria-label="Lop hoc">
                              {isClass.map((item) => {
                                if (item.nameClass === isInputForm.nameClass) {
                                  return (
                                    <>
                                      <option name="nameClass" key={item.id} value={item.nameClass} selected> {item.nameClass}</option>
                                    </>
                                  );
                                } else {
                                  return (
                                    <>
                                      <option name="nameClass" key={item.id} value={item.nameClass}>{item.nameClass}</option>
                                    </>
                                  );
                                }
                              })}
                            </select>
                          </div>
                        </div>
                      </form>
                    </>
                  );
                }
              })()}
            </div>
            <div className="modal-footer flex flex-shrink-0 flex-wrap items-center justify-end p-4 border-t border-gray-200 rounded-b-md">
              {(() => {
                if (!modalButton) {
                  return (
                    <>
                      <button onClick={() => closeModal(false)} type="button" className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">Đóng</button>
                    </>
                  );
                } else {
                  return (
                    <>
                      <button onClick={() => closeModal(false)} type="button" className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out" data-bs-dismiss="modal">Đóng</button>
                      {/* <button type="reset" className=" px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Xóa hết</button> */}
                      <button onClick={editHandler} type="button" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Lưu lại</button>
                    </>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

