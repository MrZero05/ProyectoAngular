import { ShoppingItem } from './shopping-item';
export interface ShoppingCart {
  shoppingItems: ShoppingItem[];
  totalPrice: number;
}
