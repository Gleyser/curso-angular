import { Component, OnInit } from '@angular/core';
import { catchError, debounceTime, distinctUntilChanged, Observable, of, Subject, switchMap } from 'rxjs';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [OfertasService]
})
export class TopoComponent implements OnInit {

  public ofertas !: Observable<Oferta[]>;
  public ofertas2!: Oferta[]
  private SubjectPesquisa: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  //switchMap é chamado sempre que houver um next
  ngOnInit(): void {
    this.ofertas = this.SubjectPesquisa //retorno ao termino Oferta[]
    //executa a acao do switchMap após 1000 milisegundos, ou seja, 1 segundo
    .pipe(debounceTime(1000),distinctUntilChanged() , switchMap((termo : string) => {
      // garantindo que não fara busca por termo vazio
      if (termo.trim() === ''){
        return of<Oferta[]>([]);
      }
      console.log('requisicao http para o back-end');
      return this.ofertasService.pesquisaOferta(termo);

    }))
    .pipe(catchError((err : any) => {
      console.log(err);
      return of<Oferta[]>([]);
    }))
    this.ofertas.subscribe((ofertas: Oferta[]) => {
      console.log(ofertas);
      this.ofertas2 = ofertas
   })
  }

  // Nosso observador que trata um evento
  public pesquisa(termoDaPesquisa : string) {
    // subject atuando no lado do observador
    this.SubjectPesquisa.next(termoDaPesquisa);








    //this.ofertas = this.ofertasService.pesquisaOferta(termoDaPesquisa);
    //this.ofertas.subscribe(
     // (ofertas: Oferta[]) => console.log(ofertas),
    //  (erro : any) => console.log("Erro de status ", erro.status),
     // () => console.log("Fluxo de eventos completo")
   // )
  }

}
