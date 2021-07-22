import { FoodItem } from "../../pages/Dashboard";

export interface ModalEditFoodProps {
    isOpen: boolean;
    setIsOpen(): void;
    handleUpdateFood(food: FoodItem): void;
    editingFood :FoodItem;
}