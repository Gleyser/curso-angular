import { Oferta } from "./shared/oferta.model"
import { HttpClient } from '@angular/common/http'
import { Injectable } from "@angular/core"

@Injectable()
export class OfertasService {

  constructor(private http: HttpClient) {}



    public getOfertas(): Promise<Oferta[]> {
      // efetua uma requisicao http
      // isso retorna um observable mas agora estou tranformando em promise para fins didaticos
      // quando tiver a resposta em JSON, vai retornar para o home component
      return this.http.get('http://localhost:3000/ofertas')
          .toPromise()
          .then((resposta : any) => resposta)

      // retornar uma promise contendo um Oferta[]

    }

  }
