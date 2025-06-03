import React, { useState, useEffect } from "react";
import Modal from "react-modal";

export default function RenameModal(){

    const [openRenameModal, setOpenRenameModal] = useState<boolean>(false);

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape"){
            setOpenRenameModal(false);
        }
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, [openRenameModal]);

    return (
        <Modal isOpen={openRenameModal}>
            <h2 id="rename-modal-title" className="modal-header">
          重新命名筆記
        </h2>

        <div className="modal-body">
          <input
            type="text"
            className="modal-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            autoFocus
          />
        </div>

        <div className="modal-footer">
          <button className="btn cancel-btn" onClick={onClose}>
            取消
          </button>
          <button className="btn confirm-btn" onClick={handleConfirm}>
            確定
          </button>
        </div>
        </Modal>
    )
}