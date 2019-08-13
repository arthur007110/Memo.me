export class Setor{
    id?: string;
    nome: string;

    constructor(id, nome){
        this.id = id;
        this.nome = nome;
    }

    toFirebase(){
        return {id: "", nome: this.nome};
    }

    verificarCampos(){
        if(this.nome != null && this.nome.length > 0 && this.nome[0] != " "){
            return true; //Campos preenchidos corretamente
        }else{
            return false;
        }
    }

    getId(){
        return this.id;
    }

    setId(id){
        this.id=id;
    }
    getNome(){
        return this.nome;
    }

    setNome(nome){
        this.nome=nome;
    }
}