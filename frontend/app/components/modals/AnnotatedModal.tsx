'use client';

import useAnnotatedModal from '../hooks/useAnnotatedModal';
import Modal from './Modal';

const AnnotatedModal = () => {
  const imageModal = useAnnotatedModal();

  const bodyContent = (
    <div className="flex items-center justify-center h-auto lg:h-[600px] xl:h-[800px] w-auto">
      <img src={`data:image/png;base64,${imageModal.image}`} alt="modal" className="h-auto lg:h-auto w-auto lg:w-full" />
    </div>
  );

  return <Modal isOpen={imageModal.isOpen} onClose={imageModal.onClose} body={bodyContent} />;
};

export default AnnotatedModal;