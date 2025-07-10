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

export interface FormData {
  businessName: string;
  businessType: string;
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
