import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Loja, LojaForm, Produto } from '../services/api';
import { MatPaginator } from '@angular/material/paginator';
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

  constructor(private lojaService: LojaService, private userService: UserService) { }
  async ngOnInit() {
    this.paginator = this.dataSource.paginator;
    const userId = localStorage.getItem('userId');
    const user: Usuario = await this.userService.find(+userId);
    this.refresh()
  }
  showForm = false;
  @ViewChild(MatTable) table!: MatTable<Loja>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Loja> = new MatTableDataSource<Loja>();
  displayedColumns = ['nome', 'dtCriacao', 'acao'];
  refresh() {
    const userId = localStorage.getItem('userId');
    this.lojaService.list(+userId)
      .subscribe(res => this.table.dataSource = res)
  }
  cadastrar(nome) {
    const Id = localStorage.getItem('userId');
    const novaLoja: LojaForm = { nome, userId: +Id }
    this.lojaService.create(novaLoja)
  }
  toggleShowForm() {
    this.showForm = !this.showForm
  }
}
