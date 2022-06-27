import React from 'react';
export default function Modal({modal,data,closeModal}){
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