export interface Auth {
    username: string
    password: string
}
export interface User {
    nome: string
    email: string
    password: string
}
export interface Usuario {
    id: number
    nome: string
    email: string
    dtCriacao: Date
    username: string
}
export interface LojaForm {
    nome: string
    userId: number
}
export interface Loja {
    lojaId: number
    nome: string
    dtCriacao: Date
    usuario: Usuario
}
export interface Produto {
    Id: number
    nome: string
    descricao: string
    preco: number
    lojaId: number
    dtCriacao: Date
    fotoBase64: string
}
 export interface ProdutoFrom {
     Id?: number
    nome ?: string;
    descricao ?: string;
     dtCriacao?: Date
    preco?: number;
    lojaId?: number;
    fotoBase64 ?: string;
}

export interface PageResult<T>{
    count: number
    pageIndex: number
    pageSize: number
    items: Array<T>
}
export interface ErrorBody {
    error: string
}