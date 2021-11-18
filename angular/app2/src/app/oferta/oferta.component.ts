import { OfertasService } from './../ofertas.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Oferta } from '../shared/oferta.model';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers: [OfertasService]
})
export class OfertaComponent implements OnInit {

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

    // Usando subscribe
    //this.route.params.subscribe((parametro : any) => {
    //  console.log(parametro);
    //})

  }

}
