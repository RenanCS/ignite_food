import { FoodItem } from "../../pages/Dashboard";

export interface FoodProps {
    food: FoodItem;
    handleEditFood(food: FoodItem): void;
    handleDelete(id: number): void;
  }


  export interface FoodStyleProps {
    available: Boolean;
  }