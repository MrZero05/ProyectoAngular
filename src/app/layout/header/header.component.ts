import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from 'src/app/services/shoppingCart/shopping-cart.service';
import { InicioSessionService } from 'src/app/services/inicioSession/inicio-session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  cartItemsCount = 0;

  constructor(public shoppingCart: ShoppingCartService, public session: InicioSessionService) { }

  ngOnInit() {
  }

}
