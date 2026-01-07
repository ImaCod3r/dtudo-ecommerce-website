export interface ApiResponse<T = any> {
  error: boolean;
  message: string;
  data?: T;
}

export interface User {
  name: string;
  email: string;
  avatar: string;
  public_id: string;
  phone?: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  public_id: string;
  image_url: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  children: Partial<Category>[];
}

export interface Cart {
  id: string;
  items: CartItem[];
}

export interface CartItem {
  id: number;
  cart_id?: number;
  quantity: number;
  product: Product;
}

export interface CreateOrder {
  items: CartItem[];
  address: Address;
  phone: string;
  total_price: number;
  affiliate_code?: string;
}

export interface AffiliateStats {
  balance: number;
  total_earned: number;
  pending_withdrawal: number;
}

export interface Affiliate {
  is_affiliate: boolean;
  affiliate?: {
    id: number;
    code: string;
    status: 'pending' | 'approved' | 'rejected';
    created_at: string;
  };
  stats: {
    balance: number;
    total_earned: number;
    pending_withdrawal: number;
    withdrawn: number;
    code: string;
    status: string;
  };
}

export interface WithdrawalRequest {
  amount: number;
  iban: string;
  bank: string;
}

export interface Order {
  id: number;
  public_id: string;
  user_id: string;
  address_id: number;
  phone_number: string;
  total_price: number;
  shipping_fee?: number;
  items: OrderItem[];
  createdAt: string;
  status: string;
}

export interface OrderItem {
  id: number;
  category: string;
  image: string;
  name: string;
  order_id: string;
  price: number;
  product_public_id: string;
  quantity: number;
}

export interface Address {
  id: number;
  name: string;
  long: number;
  lat: number;
}

export interface Pagination {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}