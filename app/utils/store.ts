import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ActionTypes, CartType } from "../types/types";

export const categories = [
  {value: 'Other', text: 'All'},
  {value: 'Laptop', text: 'Laptop'},
  {value: 'Tablet', text: 'Tablet'},
  {value: 'Phone', text: 'Phone'},
];

export const orderStatusOptions = ['Being_Prepared','Delivered','Cancelled'];

const INITIAL_STATE = {
    products: [],
    totalItems: 0,
    totalPrice: 0
}

export const useCartStore = create(
    persist<CartType & ActionTypes>(
      (set, get) => ({
        products: INITIAL_STATE.products,
        totalItems: INITIAL_STATE.totalItems,
        totalPrice: INITIAL_STATE.totalPrice,

        addToCart(item) {
          const products = get().products;
          const productInState = products.find(
            (product) => product.id === item.id
          );
  
          if (productInState) {

            const products = get().products;
            const productInState = products.find( (product) => product.id === item.id );
  
            if(!productInState) return set((state) => ({ products: [...state.products] }));
  
            const updatedProduct = products.map((item) => {
              if (item.id === productInState.id) return { ...item, quantity: item.quantity + 1 }; 
              return item; 
            });
  
            set((state) => ({
              products: updatedProduct,
              totalItems: state.totalItems + 1,
              totalPrice: state.totalPrice + item.price,
            }));

          } else {
            set((state) => ({
              products: [...state.products, item],
              totalItems: state.totalItems + item.quantity,
              totalPrice: state.totalPrice + item.price,
            }));
          }
          toast.success('The product added to the cart!');
        },

        removeFromCart(item) {
          set((state) => ({
            products: state.products.filter((product) => product.id !== item.id),
            totalItems: state.totalItems - item.quantity,
            totalPrice: state.totalPrice - (item.price * item.quantity),
          }));
          toast.error('Item removed from the cart!');
        },

        emptyCart() {
          set((state) => ({
            products: [],
            totalItems: 0,
            totalPrice: 0,
          }));
        },

        increaseQuantity(item) {
          const products = get().products;
          const productInState = products.find( (product) => product.id === item.id );

          if(!productInState) return set((state) => ({ products: [...state.products] }));

          const updatedProduct = products.map((item) => {
            if (item.id === productInState.id) return { ...item, quantity: item.quantity + 1 }; 
            return item; 
          });

          set((state) => ({
            products: updatedProduct,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + item.price,
          }));
        },

        decreaseQuantity(item) {
          const products = get().products;
          const productInState = products.find( (product) => product.id === item.id );

          if(!productInState) return set((state) => ({ products: [...state.products] }));

          const updatedProduct = products.map((item) => {
            if (item.id === productInState.id) return { ...item, quantity: item.quantity - 1 }; 
            return item; 
          });

          set((state) => ({
            products: updatedProduct,
            totalItems: state.totalItems - 1,
            totalPrice: state.totalPrice - item.price,
          }));
        },


      }),
      { name: "cart", skipHydration: true }
    )
  );