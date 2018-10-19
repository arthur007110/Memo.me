import { Http ,HttpModule} from '@angular/http';

export class DadosService{

    usuarios : Usuario[];
    
    adicionarUsuario(usuario:Usuario){

        this.usuarios.push(usuario);

    }
}