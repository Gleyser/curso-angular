import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
// import { interval, Observable, Observer, Subscription } from 'rxjs';
import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [ OfertasService ]
})
export class OfertaComponent implements OnInit, OnDestroy {

  // private tempoObservableSubscription!: Subscription
  // private meuObservableTesteSubscription!: Subscription

  public oferta!: Oferta

  constructor(
    private route: ActivatedRoute,
    private ofertasService:  OfertasService
    ) { }

  ngOnInit(): void {

    this.route.params.subscribe((parametros: Params) => {
      this.ofertasService.getOfertaPorId(parametros['id'])
      .then((oferta: Oferta) => {
        this.oferta = oferta
        // console.log(this.oferta);
      })

    })

    // let tempo = interval(2000)

    // this.tempoObservableSubscription =  tempo.subscribe((intervalo: number) => {
    //     console.log(intervalo)
    // })

    // observable (observavel)
    // let meuObservableTeste = new Observable((observer: Observer<number>) => {
    //     observer.next(1)
    //     observer.next(2)
    //     observer.next(3)
    //     observer.complete()
    //     observer.next(4)
    // })

    // observable (observador)
    // this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
    //   (resultado: number) => console.log(resultado + 10),
    //   (erro: string) => console.log(erro),
    //   () => console.log('Stream de eventos foi finalizada')
    // )

    // this.route.params.subscribe(
    //   (parametro: any) => { console.log(parametro) },
    //   (erro: any) => console.log(erro),
    //   () => console.log('processamento foi classificado como concluido')
    // )
  }

  ngOnDestroy() {
    // this.meuObservableTesteSubscription.unsubscribe()
    // this.tempoObservableSubscription.unsubscribe()
  }

}

