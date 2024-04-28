import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../material.module';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Produto } from '../services/api';
import { ProdutoService } from '../services/produto.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements AfterViewInit {

  constructor(private service: ProdutoService, private router: Router, private snackBar: MatSnackBar) { }

  @ViewChild(MatTable) table!: MatTable<Produto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Produto> = new MatTableDataSource<Produto>();
  pageIndex: number = 0;
  pageSize: number = 5;
  totalElements: number = 0;

  displayedColumns = ['nome', 'descricao', 'preco', 'dtCriacao', 'foto', 'acoes'];
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;

    this.change()
  }
  change($event: PageEvent = { length: 0, pageIndex: this.pageIndex, pageSize: this.pageSize }) {
    this.service.list($event.pageIndex, $event.pageSize)
      .subscribe(
        res => {
          this.table.dataSource = res.items
          this.totalElements = res.count
        }
      )
  }
  editar(id: number) {
    this.router.navigateByUrl(`/novo-produto?produtoId=${id}`)
  }
  delete(id: number) {
    this.service.delete(id)
      .then(res => {
        this.change()
        this.snackBar.open("Deletado com sucesso", "Fechar", {
          duration: 5000
        })
      })
      .catch(() => {
        this.snackBar.open("Erro ao deletar", "Fechar", {
          duration: 5000
        })
      })
  }
  navigate() {
    this.router.navigateByUrl('/loja');
  }
}
