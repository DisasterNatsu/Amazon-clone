export type Products = {
  id: number;
  title: string;
  price: number;
  description: string;
  catagory?: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};
