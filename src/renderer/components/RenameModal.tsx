import React, { useEffect } from "react";
import Modal from "react-modal";
import "../style/RenameModal.css";

interface Props {
  isOpen: boolean;
  value: string;
  onChange(v: string): void;
  onCancel(): void;
  onConfirm(): void;
}

export default function RenameModal({ isOpen, value, onChange, onCancel, onConfirm }: Props) {
  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      contentLabel="重新命名筆記"
      overlayClassName="modal-backdrop"  // ← 這裡
      className="modal"
    >
      <h2 className="modal-header">重新命名筆記</h2>
      <div className="modal-body">
        <input
          type="text"
          className="modal-input"
          value={value}
          onChange={e => onChange(e.target.value)}
          autoFocus
        />
      </div>
      <div className="modal-footer">
        <button type="button" className="btn cancel-btn" onClick={onCancel}>取消</button>
        <button type="button" className="btn confirm-btn" onClick={onConfirm}>確定</button>
      </div>
    </Modal>
  );
}