import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MaterialModule } from '../material.module';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Produto } from '../services/api';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produtos',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './produtos.component.html',
  styleUrl: './produtos.component.css'
})
export class ProdutosComponent implements AfterViewInit {

  constructor(private service: ProdutoService) { }

  @ViewChild(MatTable) table!: MatTable<Produto>;
  dataSource: MatTableDataSource<Produto> = new MatTableDataSource<Produto>();
  displayedColumns = ['nome', 'descricao', 'preco', 'dtCriacao'];
  ngAfterViewInit(): void {
    this.refresh()
  }
  refresh() {
    this.service.list()
      .subscribe(
        res => {
          console.log('res', res)
          this.table.dataSource = res
        }
      )
  }
}
