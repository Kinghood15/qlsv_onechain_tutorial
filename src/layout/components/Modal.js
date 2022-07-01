import React, { useState, useEffect } from 'react';
export default function Modal({ modal, data, closeModal }) {
  const [modalTitle, setModalTitle] = useState();
  const [modalContent, setModalContent] = useState({});
  const [modalButton, setModalButton] = useState(false);
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
    }
  }, [])
  return (
    <>
      {/* <!-- Modal --> */}
      <div className="bg-black opacity-50 fixed top-0 left-0 w-screen h-screen z-10"></div>
      <div className="modal fade fixed top-0 left-0 block w-full m-auto h-full z-20 outline-none overflow-x-hidden overflow-y-auto"
        id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" >
        <div className="modal-dialo w-[30vw] m-auto mt-32 pointer-events-none">
          <div
            className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
            <div
              className="modal-header flex flex-shrink-0 items-center justify-between p-4 border-b border-gray-200 rounded-t-md">
              <h5 className="text-xl font-medium leading-normal text-gray-800" id="exampleModalLabel">
                {modalTitle}
              </h5>
              <button type="button"
                className="btn-close box-content w-4 h-4 p-1 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                data-bs-dismiss="modal" onClick={() => closeModal(false)} aria-label="Close">X</button>
            </div>
            <div className="modal-body relative p-4">
              {(() => {
                if (modal === 'view') {
                  return (
                    <>
                      <div className="">
                        <img src={modalContent.avatar} alt={modalContent.fistName} className="w-20 h-20 rounded m-auto" />
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
                }else if(modal === 'edit'){
                  return(
                    <>
                      <img src={modalContent.avatar} className="w-28 h-28 rounded m-auto" />
                      <form>
                        <input type="file" id="avatar" name="avatar" />
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
                      <button type="button" className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-1">Lưu lại</button>
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

