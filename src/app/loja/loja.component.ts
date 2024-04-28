import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Loja, LojaForm, Produto } from '../services/api';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

import { LojaService } from '../services/loja.service';
import { UserService } from '../services/user.service';
import { Usuario } from '../services/api';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-loja',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './loja.component.html',
  styleUrl: './loja.component.css'
})
export class LojaComponent implements OnInit {

  constructor(private lojaService: LojaService, private userService: UserService, private router: Router) { }
  async ngOnInit() {
    this.paginator = this.dataSource.paginator;
    const userId = localStorage.getItem('userId');
    const user: Usuario = await this.userService.find(+userId);
    this.change()
  }
  @ViewChild(MatTable) table!: MatTable<Loja>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  pageIndex: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  dataSource: MatTableDataSource<Loja> = new MatTableDataSource<Loja>();
  displayedColumns = ['nome', 'dtCriacao', 'acao'];
  change($event: PageEvent = { length: 0, pageIndex: this.pageIndex, pageSize: this.pageSize }) {
    this.lojaService.list(null, $event.pageIndex, $event.pageSize)
      .subscribe(res => {
        this.table.dataSource = res.items
        this.totalElements = res.count
      })
  }
  cadastrar(nome) {
    const Id = localStorage.getItem('userId');
    const novaLoja: LojaForm = { nome, userId: +Id }
    this.lojaService.create(novaLoja)
      .then(res => this.change())
  }
  cadastrarNovoProduto(id: number) {
    this.router.navigateByUrl(`/novo-produto?lojaId=${id}`)
  }
  navigate() {
    this.router.navigateByUrl('/produtos')
  }
  deleteStore(id: number) {
    console.log('id', id)
    this.lojaService.delete(id)
      .then(res => this.change())
  }
}
