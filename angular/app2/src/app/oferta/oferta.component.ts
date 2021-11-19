import { OfertasService } from './../ofertas.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model';
import { Observable, Subscription } from 'rxjs';
import { Observer } from 'rxjs';
import { interval } from 'rxjs';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit, OnDestroy {


  private tempoObservableSubscription!: Subscription;
  private meuObservableTesteSubscription!: Subscription;


  public oferta !: Oferta;

  constructor(private route : ActivatedRoute, private ofertasService: OfertasService) {

  }

  ngOnInit(): void {
    // Usando snapshot
    // console.log('id recuperado da rota' + this.route.snapshot.params['id']);


    this.ofertasService.getOfertaPorId(this.route.snapshot.params['id'])
    .then((oferta : Oferta) => {
      this.oferta = oferta;
      //console.log(oferta);
    });

    // Observable do tipo Interval (observavel)
    let tempo = interval(2000);

    // Observable (observador do observavel tempo)
    this.tempoObservableSubscription =  tempo.subscribe((intervalo: number) => {
        console.log(intervalo);
    });

    // Observable (observavel)
    let meuObservableTeste = new Observable((observer: Observer<number>) => {
      observer.next(1)
      observer.next(2)
      observer.next(3)
      observer.complete()
      observer.next(4)

    });


    // Observable (observador)
    // subscribe recebe 3 parametros(instrucao, erro e conclusaos)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado : any) => console.log(resultado),
      (erro: string) => console.log(erro),
      () => console.log('Stream finalizada')
    )

    // observable (observador)
    this.meuObservableTesteSubscription = meuObservableTeste.subscribe(
      (resultado: number) => console.log(resultado + 10),
      (erro: string) => console.log(erro),
      () => console.log('Stream de eventos foi finalizada')
    )



    // Usando subscribe
    //this.route.params.subscribe((parametro : any) => {
    //  console.log(parametro);
    //})

    // Exemplo didatico
    // Esse eh o observavel, ou seja, sera observado
    ///let tempo = interval(500);

    // Esse eh o observador que assiste ao observavel
    ///tempo.subscribe((intervalo : number) => {
    ///  console.log(intervalo);
   //});


  }

  // Necessario para evitar memory leaks
  ngOnDestroy(){

    this.meuObservableTesteSubscription.unsubscribe();
    this.tempoObservableSubscription.unsubscribe();

  }

}
