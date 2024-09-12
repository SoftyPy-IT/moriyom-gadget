import { IProduct } from "./products.types";

export interface ISlider {
  _id: string;
  image: string;
  title: string;
  subTitle: string;
  link: string;
}

export interface IStorefront {
  shopName: string;
  description: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  socialMedia: {
    facebook: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
  policies: {
    termsPage: string;
    privacyPolicyPage: string;
    shippingPage?: string;
    aboutPage: string;
    contactPage: string;
    cookiePage?: string;
    paymentText: string;
    followText: string;
    cookieMessage?: string;
  };
  settings: {
    privateShop: boolean;
    hideEmptyBrandsCategories: boolean;
    disableCartAndPrice: boolean;
    stripe: boolean;
  };
  seo: {
    productsPageDescription: string;
  };
  logo: string;
  bankDetails?: string;
  sliders: ISlider[];
}

export interface IOffers {
  _id: string;
  title: string;
  subTitle: string;
  startDate: Date;
  endDate: Date;
  products: IProduct[];
  status: "active" | "inactive";
  createdAt: Date;
  updatedAt: Date;
}
