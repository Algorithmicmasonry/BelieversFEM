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

export interface product {
  name: string;
  description: string;
  price: string;
  imageUrl: string
}

export interface FormData {
  businessName: string;
  businessType: string;
  whatsappNumber: string;
  businessImageUrl: string;
  products: product[];
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
