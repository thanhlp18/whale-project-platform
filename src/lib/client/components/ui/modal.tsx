import WhaleButton from "@/lib/client/components/systemDesign/button";
import React from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actionButton?: React.ReactNode;
};


export default function WhaleModal({
  isOpen,
  onClose,
  title,
  children,
  actionButton
}: ModalProps) {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <dialog id="religion-detail_modal" className="modal bg-opacity-20 bg-black " open>
      <div className="modal-box">
        <h3 className="font-bold text-lg">{title}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <WhaleButton variant="outline"  onClick={onClose}>
            Close
          </WhaleButton>
          {actionButton}
        </div>
      </div>
    </dialog>,
    document.body
  );
};
