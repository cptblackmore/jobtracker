import { useRef, useState } from 'react';
import { filterLabelsMap } from './filterLabelsMap';

export const useResetModal = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const [modalText, setModalText] = useState<string>('');
  const onResetRef = useRef<(() => void) | null>(null);
  const incompatibleFiltersRef = useRef<string[]>([]);

  const openModal = (text: string, onReset: () => void, incompatibleFilters?: string[]) => {
    setModalText(text);
    if (incompatibleFilters?.length) {
      incompatibleFiltersRef.current = incompatibleFilters.map(filter => filterLabelsMap[filter]);
    } else {
      incompatibleFiltersRef.current = [];
    }
    onResetRef.current = onReset;
    setModalOpen(true);
  };

  const onConfirm = () => {
    onResetRef.current?.();
    setModalOpen(false);
  }

  return { 
    isModalOpen, 
    setModalOpen,
    modalText,
    incompatibleFiltersRef,
    onConfirm,
    openModal,
  }
};
