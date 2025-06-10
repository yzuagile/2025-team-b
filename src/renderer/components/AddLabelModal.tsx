// src/components/AddLabelModal.tsx
import React, { useEffect } from "react";
import Modal from "react-modal";
import "../style/AddLabelModal.css";
import "../style/Modal.css"

interface Props {
  isOpen: boolean;
  existingLabels: string[];
  selectedLabels: string[];
  onToggleLabel(label: string): void;
  newLabel: string;
  onNewLabelChange(v: string): void;
  onAddNewLabel(): void;
  onCancel(): void;
  onConfirm(): void;
}

export default function AddLabelModal({
  isOpen,
  existingLabels,
  selectedLabels,
  onToggleLabel,
  newLabel,
  onNewLabelChange,
  onAddNewLabel,
  onCancel,
  onConfirm,
}: Props) {

  useEffect(() => {
    Modal.setAppElement("#root");
  }, []);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      overlayClassName="modal-backdrop"
      className="modal"
      contentLabel="加入標籤"
    >
      <h2 className="modal-header">加入標籤</h2>

      {/* 已有標籤清單 */}
      <div className="modal-label-list">
        {existingLabels.map((label) => (
          <label key={label} className="label-item">
            <input
              type="checkbox"
              checked={selectedLabels.includes(label)}
              onChange={() => onToggleLabel(label)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>

      {/* 新增標籤輸入區 */}
      <div className="modal-new-label">
        <input
          type="text"
          className="modal-input"
          placeholder="輸入新標籤"
          value={newLabel}
          onChange={(e) => onNewLabelChange(e.target.value)}
        />
        <button
          type="button"
          className="btn add-new-btn"
          onClick={onAddNewLabel}
        >
          新增
        </button>
      </div>

      {/* 底部按鈕 */}
      <div className="modal-footer">
        <button type="button" className="btn cancel-btn" onClick={onCancel}>
          取消
        </button>
        <button type="button" className="btn confirm-btn" onClick={onConfirm}>
          確定
        </button>
      </div>
    </Modal>
  );
}