import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemsCount = 0;

  constructor(public shoppingCart: ShoppingCartService) { }

  ngOnInit() {
  }

}
