import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  listas_tab1:any[] = [];
  constructor(public deseosService: DeseosService, private router:Router, private alert:AlertController ) {
  this.listas_tab1 = deseosService.listas;
  }
  async agregarLista(){
    //this.router.navigateByUrl('tabs/tab1/agregar');
    const alert = await this.alert.create({
      header:'Nueva lista',
      inputs:[
        {
          name:'titulo',
          type:'text',
          placeholder:'Nombre de la lista'
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          handler:()=>{
            console.log('cancelar');
          }
        },
        {
          text:'Crear',
          handler:(data)=>{
            console.log(data);
            if(data.titulo.length === 0){
              return;
            }
            const listaId = this.deseosService.crearLista(data.titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);

          }
        }
      ]
    });
    alert.present();
  }
}
