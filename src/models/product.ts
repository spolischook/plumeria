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
  page_number: number;
  page_size: number;
  total_items: number;
  total_pages: number;

  get pageNumber() {
    return this.page_number;
  }
}
