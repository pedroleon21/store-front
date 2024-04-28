import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';
import { ProdutoFrom } from '../services/api';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-form-produto',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './form-produto.component.html',
  styleUrl: './form-produto.component.css'
})
export class FormProdutoComponent implements OnInit {
  constructor(private route: ActivatedRoute, private service: ProdutoService, private router: Router) { }
  lojaId: number;
  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params["lojaId"])
        this.lojaId = params["lojaId"] as number;
    });
  }
  fotoBase64?: string
  produto: ProdutoFrom = {};
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
    // You can use nome, descricao, preco here as needed
    const produto: ProdutoFrom = { nome: nome, descricao: descricao, preco: +preco, fotoBase64: this.fotoBase64, lojaId: this.lojaId };
    this.service.create(produto).subscribe(
      response => {
        this.router.navigateByUrl("/produtos")
      },
      error => {
        console.error('Error creating produto:', error);
        // Handle error cases here
      }
    );
  }
}