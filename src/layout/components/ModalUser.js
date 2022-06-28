import React from 'react';
export default function ModalUser({modal,data,closeModal}){
    const modalDelete = () =>{

    }
    const modalEdit = () =>{

    }
    const modalAdd = () =>{
        
    }
    return(
        <>
            <div className="modalContainer">
                <button onClick={() => closeModal(false) }>X</button>
                <div className="modal-title">{}</div>
                <div className="modal-body">
                
                </div>
                <div className="modal-footer">
                    <button  onClick={() => closeModal(false) }>Hủy</button>
                    <button>Xác nhận</button>
                </div>
            </div>
        </>
    );
}