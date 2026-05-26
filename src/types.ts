export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  tag?: string;
  spiceLevel: 0 | 1 | 2 | 3;
  isVegetarian: boolean;
  isGlutenFree: boolean;
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  options?: {
    spiceLevel?: 0 | 1 | 2 | 3;
    extraNote?: string;
  };
}

export interface Testimonial {
  id: string;
  rating: number;
  comment: string;
  author: string;
  date: string;
  image?: string;
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  priceText: string;
  priceValue: number;
  tag: string;
  tagColor: string; // 'primary' | 'secondary'
  iconName: string; // Material or Lucide symbol representation
  itemsAdded: string[]; // item IDs to put in cart when clicked
}

export type OrderStatus = 'idle' | 'submitting' | 'preparing' | 'spicing' | 'out_for_delivery' | 'arrived';
