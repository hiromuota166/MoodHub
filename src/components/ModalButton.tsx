import React from "react";

interface ModalButtonProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}
function ModalButton({ name, onClick }: ModalButtonProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`mx-2 px-6 py-1 flex items-center text-xl bg-red-400 border border-white-400 rounded-lg `}
      >
        {name}
      </button>
    </div>
  );
}

export default ModalButton;
