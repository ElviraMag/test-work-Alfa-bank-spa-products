export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  liked: boolean;
  price?: number;
  created?: boolean;
}
