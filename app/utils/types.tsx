export type CartItemType = {
  id: number;
  title: string;
  imgUrl: string;
  price: number;
  category: string;
  quantity: number;
};

export type CartType = {
  products: CartItemType[];
  totalItems: number;
  totalPrice: number;
};

export type OrderType = {
  id: string;
  userEmail: string;
  price: number;
  products: CartItemType[];
  status: string;
  createdAt: Date;
};

export type ActionTypes = {
  addToCart: (item: CartItemType) => void;
  removeFromCart: (item: CartItemType) => void;
  emptyCart: () => void;
  increaseQuantity: (item: CartItemType) => void;
  decreaseQuantity: (item: CartItemType) => void;
};

export type countryType = { country: String };

export type ContactFormData = {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
  postalCode: string;
  phone: string;
  address: string;
};

export type ProductFormData = {
  title: string;
  price: number;
  category: string;
};

export type SignUpFormData = {
  name: string;
  email: string;
  password: string;
};
