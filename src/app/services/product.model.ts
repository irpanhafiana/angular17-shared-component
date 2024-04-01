export interface ICategory {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  title: string;
  price: number;
  description: string;
  category: ICategory;
}
