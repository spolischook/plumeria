import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models/product';
import {UserService} from '../user.service';
import {faHeart} from '@fortawesome/free-solid-svg-icons';
import {library} from '@fortawesome/fontawesome-svg-core';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {far} from '@fortawesome/free-regular-svg-icons';
import {LoggerService} from '../logger.service';

library.add(fas, far);

@Component({
  selector: 'app-product-view-wishlist',
  templateUrl: './product-view-wishlist.component.html',
  styleUrls: ['./product-view-wishlist.component.scss']
})
export class ProductViewWishlistComponent implements OnInit {
  @Input() product: Product;
  wishList: Product[];
  isInWishList: boolean;
  wishIco = faHeart;
  inProgress: boolean;

  constructor(private userService: UserService, private logger: LoggerService) {
  }

  ngOnInit() {
    if (!this.userService.user) {
      this.isInWishList = false;
      return;
    }
    this.inProgress = true;
    this.userService.getWishList().subscribe(
      response => {
        this.inProgress = false;
        response.body.items.forEach(product => {
          if (product.id === this.product.id) this.isInWishList = true;
        });
        if (!this.isInWishList) this.isInWishList = false;
      },
      err => {
        this.logger.handleHttpError(err);
        this.inProgress = false;
      }
    );
  }

  toggle(event) {
    event.preventDefault();
    if (!this.userService.user) return;
    this.inProgress = true;
    if (this.isInWishList) {
      this.userService.removeFromWishList(this.product).subscribe(
        response => {
          this.inProgress = false;
          this.isInWishList = false;
        },
        err => {
          this.inProgress = false;
          this.logger.handleHttpError(err);
        }
      );
    } else {
      this.userService.addToWishList(this.product).subscribe(
        response => {
          this.inProgress = false;
          this.isInWishList = true;
        },
        err => {
          this.inProgress = false;
          this.logger.handleHttpError(err);
        }
      );
    }
  }
}
