import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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

  constructor(private ofertasService: OfertasService) { }

  ngOnInit(): void {
  }

  // Nosso observador que trata um evento
  public pesquisa(termoDaPesquisa : string) {
    this.ofertas = this.ofertasService.pesquisaOferta(termoDaPesquisa);
    this.ofertas.subscribe(
      (ofertas: Oferta[]) => console.log(ofertas),
      (erro : any) => console.log("Erro de status ", erro.status),
      () => console.log("Fluxo de eventos completo")
    )
  }

}
