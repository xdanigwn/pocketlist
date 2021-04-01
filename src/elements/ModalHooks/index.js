import React, {useState} from 'react'

function ModalHooks() {
    const [showModal, setShowModal] = useState(false) 
  
    const openModal = () => {
      setShowModal(prev => !prev);
    }

    return (
        <>
        <div className={`modalBackground modalShowing-${showModal}`}>Ini modal</div>
        <button onClick={() => openModal()}>
            Open Modal
        </button>
        </>
    )
}

export default ModalHooks
