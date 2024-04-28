import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { ProdutosComponent } from './produtos/produtos.component';
import { LojaComponent } from './loja/loja.component';
import { FormProdutoComponent } from './form-produto/form-produto.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'subscribe', component: SubscribeComponent },
    { path: "produtos", component: ProdutosComponent },
    { path: 'loja', component: LojaComponent },
    { path: 'novo-produto', component: FormProdutoComponent }
]

