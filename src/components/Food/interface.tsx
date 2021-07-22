import { MouseEventHandler } from "react";

export interface FoodProps {
    food: any;
    handleEditFood(food: any): void;
    handleDelete(id: number): void;
  }


  export interface FoodStyleProps {
    available: Boolean;
  }