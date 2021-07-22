import { FoodItem } from "../../pages/Dashboard";

export interface ModalAddFoodPropos{
    isOpen: boolean;
    setIsOpen(): void;
    handleAddFood(food:FoodItem):void;
}