export type UserProps = {
  name: string;
  firstName: string;
  lastName: string;
  phone: string;
  image: string;
  email: string;
  password: string;
};

export type LoginProps = {
  email : string;
  password: string;
}

export type SessionUser = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface Product {
  name: string;
  description: string;
  price: string;
  images: string[];
}

export interface StoreProduct {
  id: string;
  businessId: string;
  name: string;
  description: string | null;
  price: number;
  isActive: boolean;
  sortOrder: number;
  createdAt: Date;
  updatedAt: Date;
  images: string[]; // This is crucial: it's a string array (URLs)
  originalPrice?: number;
  rating?: number;
  reviews?: number;
  badge?: string;
}

export interface FormData {
  businessName: string;
  businessType: string;
  businessDescription: string;
  whatsappNumber: string;
  businessImageUrl: string;
  products: Product[];
  bankAccountName: string;
  bankAccountNumber: string;
  bankCode: string;
  settlementSchedule: string;
  subdomain: string;
}

export interface FormErrors {
  businessName?: string;
  businessType?: string;
  whatsappNumber?: string;
  locations?: {
    [index: number]: {
      name?: string;
      address?: string;
    };
  };
  [key: string]: any; // Allow for other potential error keys if needed
}


export interface AppSidebarProps {
  data: {
    user: {
      name: string;
      email: string;
      avatar?: string;
    } | null;
    business: {
      name: string;
      type?: string;
      image?: string;
      subdomain: string;
      whatsappNumber: string;
      isActive: boolean;
      createdAt: string;
    } | null;
  };
}