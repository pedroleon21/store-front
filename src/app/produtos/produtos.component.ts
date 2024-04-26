import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../material.module';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Produto } from '../services/api';
import { ProdutoService } from '../services/produto.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements AfterViewInit {

  constructor(private service: ProdutoService, private router: Router) { }

  @ViewChild(MatTable) table!: MatTable<Produto>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  dataSource: MatTableDataSource<Produto> = new MatTableDataSource<Produto>();
  displayedColumns = ['nome', 'descricao', 'preco', 'dtCriacao', 'acoes'];
  ngAfterViewInit(): void {
    this.paginator = this.dataSource.paginator;
    this.change()
  }
  change() {
    this.service.list()
      .subscribe(
        res => {
          this.table.dataSource = res
        }
      )
  }
  delete(id: number) {
    this.service.delete(id)
      .then(res => this.change())
  }
  navigate(path) {
    this.router.navigateByUrl(path);
  }
}
