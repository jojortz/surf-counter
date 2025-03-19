import { create } from 'zustand';

interface ImageModalStore {
  isOpen: boolean;
  image: string;
  onOpen: () => void;
  onClose: () => void;
  setImage: (image: string) => void;
}

const useAnnotatedModal = create<ImageModalStore>((set) => ({
  isOpen: false,
  image: '',
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  setImage: (image) => set({ image }),
}));

export default useAnnotatedModal;