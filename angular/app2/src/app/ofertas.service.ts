import { Oferta } from "./shared/oferta.model";
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import {URL_API_OFERTAS} from "./app.api";
import { map, Observable, retry } from "rxjs";

@Injectable()
export class OfertasService {



  constructor(private http: HttpClient) {}



    public getOfertas(): Promise<Oferta[]> {
      // efetua uma requisicao http
      // isso retorna um observable mas agora estou tranformando em promise para fins didaticos
      // quando tiver a resposta em JSON, vai retornar para o home component
      return this.http.get(`${URL_API_OFERTAS}/ofertas`)
          .toPromise()
          .then((resposta : any) => resposta);

      // retornar uma promise contendo um Oferta[]

    }

    public getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
      return this.http
        .get(`${URL_API_OFERTAS}/ofertas?categoria=${categoria}`)
        .toPromise()
        .then((resposta : any) => resposta);
    }

    public getOfertaPorId(id : number): Promise<Oferta>{
      return this.http
      .get(`${URL_API_OFERTAS}/ofertas?id=${id}`)
      .toPromise()
      .then((resposta : any) => {
        // shift captura o primeiro elemento e move os demais para frente
        // console.log(resposta.shift());
        return resposta[0];
      });
    }

    public getComoUsarOfertaPorId(id : number): Promise<string>{
      return this.http
      .get(`${URL_API_OFERTAS}/como-usar?id=${id}`)
      .toPromise()
      .then((resposta : any) => {
        return resposta[0].descricao;
      });
    }

    public getOndeFicaOfertaPorId(id : number): Promise<string>{
      return this.http
      .get(`${URL_API_OFERTAS}/onde-fica?id=${id}`)
      .toPromise()
      .then((resposta : any) => {
        return resposta[0].descricao;

      });
    }

    // Nosso observavel que vai fazer a busca e inserir um evento
    public pesquisaOferta(termo : string): Observable<Oferta[]> {
      return this.http.get<Oferta[]>(`${URL_API_OFERTAS}/ofertas?descricao_oferta_like=${termo}`)
      .pipe(retry(10))
      .pipe(map(response => response));
      //isso eh a mesma coisa que .pipe(map(response => response.json));
    }

}


