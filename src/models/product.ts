export class Product {
  id: number;
  name: string;
  description: string;
  price: number;
  sku: string;
  image_urls: Array<string>;
}

export class ProductList {
  items: Array<Product>;
  pageNumber: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
