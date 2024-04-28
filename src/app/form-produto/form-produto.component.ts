import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { Produto, ProdutoFrom } from '../services/api';
import { MaterialModule } from '../material.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-produto',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.css'
})
export class FormProdutoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: ProdutoService, private router: Router, private snackBar: MatSnackBar) { }
  lojaId: number;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params["lojaId"])
        this.lojaId = params["lojaId"] as number;
      if (params && params["produtoId"])
        this.service.find(+params["produtoId"])
          .subscribe(res => {
            this.selectedFileName = "Substituir foto"
            this.produto = res
            this.lojaId = res.lojaId
          })
    });
  }
  fotoBase64?: string
  produto?: Produto;
  selectedFileName?: string

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.convertToBase64(file);
    }
  }
  convertToBase64(file: File) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.fotoBase64 = reader.result as string;
    };
    reader.onerror = error => {
      console.error('Error converting file to base64:', error);
    };
  }
  onSubmit(nome: string, descricao: string, preco: string) {

    if (!!this.produto) {
      const produto: Produto = { ...this.produto }
      produto.descricao = descricao
      produto.nome = nome
      produto.preco = +preco
      produto.fotoBase64 = this.fotoBase64 ? this.fotoBase64 : produto.fotoBase64
      this.service.update(produto)
        .toPromise()
        .then(res => {
          this.snackBar.open("Atualizado com sucesso!", "Fechar", {
            duration: 5000
          })
          this.navigateProdutos()
        })
        .catch(() => {
          this.snackBar.open("Falha ao atualizar!", "Fechar", {
            duration: 5000
          })
        })
      return
    }
    const produto: ProdutoFrom = { nome: nome, descricao: descricao, preco: +preco, fotoBase64: this.fotoBase64, lojaId: this.lojaId }
    this.create(produto)
  }
  create(produto) {
    this.service.create(produto).subscribe(
      response => {
        this.snackBar.open('Produto cadastrado', "Fechar", {
          duration: 5000
        })
        this.navigateProdutos()
      },
      error => {
        console.error('Error creating produto:', error);
        // Handle error cases here
      }
    );
  }
  navigateProdutos() {
    this.router.navigateByUrl("/produtos")
  }
}