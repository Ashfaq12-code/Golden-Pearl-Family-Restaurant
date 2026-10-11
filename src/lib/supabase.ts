import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  display_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  slug: string;
  description: string;
  image_url: string;
  price_small: number | null;
  price_large: number | null;
  is_featured: boolean;
  is_available: boolean;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  rating: number;
  comment: string;
  created_at: string;
}

export interface CartItem {
  product: Product;
  size: 'small' | 'large';
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  items: CartItem[];
  total_amount: number;
  status: string;
  created_at: string;
}
