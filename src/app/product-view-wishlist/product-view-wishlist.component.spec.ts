import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductViewWishlistComponent } from './product-view-wishlist.component';

describe('ProductViewWishlistComponent', () => {
  let component: ProductViewWishlistComponent;
  let fixture: ComponentFixture<ProductViewWishlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductViewWishlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductViewWishlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
