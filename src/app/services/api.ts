export interface Auth {
    username: string
    password: string
}
export interface User {
    nome: string
    email: string
    password: string
}
export interface Produto {
    Id: number
    nome: string
    descricao: string
    preco: number
    lojaId: number
    dtCriacao: Date
}