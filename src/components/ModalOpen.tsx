import React from "react";

function ModalOpen() {
  const [, setIsOpen] = React.useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
    </div>
  );
}

export default ModalOpen;
