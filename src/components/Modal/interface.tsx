export interface ModalProps{
    isOpen: boolean;
    setIsOpen(): void;
    children: React.ReactNode;
}