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
  date?: string;
  created_at?: string;
  image?: string;
  image_settings?: { x: number; y: number; zoom: number };
}

export interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  price_text: string;
  tag: string;
  image: string;
  image_settings?: { x: number; y: number; zoom: number };
  created_at?: string;
}

export type OrderStatus = 'idle' | 'submitting' | 'preparing' | 'spicing' | 'out_for_delivery' | 'arrived';
