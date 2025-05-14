import { VacancyParams } from "@entities/Vacancy";
import { ConfirmationModal } from "@shared/ui";

interface Props {
  isModalOpen: boolean;
  closeModal: () => void;
  modalText: string;
  onReset: (payload?: Array<keyof VacancyParams["filters"]>) => void;
}

export const ResetFiltersModal: React.FC<Props> = ({
  isModalOpen,
  closeModal,
  modalText,
  onReset,
}) => {
  return (
    <ConfirmationModal
      open={isModalOpen}
      setOpen={closeModal}
      handleConfirm={onReset}
      confirmButtonText="Сбросить"
    >
      {modalText}
    </ConfirmationModal>
  );
};
