import { Component, Input, ViewChild} from '@angular/core';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { DeseosService } from '../../services/deseos.service';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent{
  @ViewChild(IonList) lista:IonList;
  @Input() terminada = true;
  constructor(public deseosService:DeseosService, private router:Router,private alert:AlertController) {
  }
  listaSeleccionada(lista:Lista){
    if(this.terminada){
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    }else{
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }
  }
  borrarLista(lista:Lista){
    this.deseosService.borrarLista(lista);
  }
  async actualizarNombreLista(lista:Lista){
    //this.router.navigateByUrl('tabs/tab1/agregar');
    const alert = await this.alert.create({
      header:'Actualizar nombre',
      inputs:[
        {
          name:'titulo',
          type:'text',
          value: lista.titulo,
          placeholder:'Nuevo nombre de la lista'
        }
      ],
      buttons:[
        {
          text:'Cancelar',
          role:'cancel',
          handler:()=>{
            console.log('cancelar');
            this.lista.closeSlidingItems();
          }
        },
        {
          text:'Actualizar',
          handler:(data)=>{
            console.log(data);
            if(data.titulo.length === 0){
              return;
            }
            this.deseosService.cambiarTitulo(lista,data.titulo);
            this.lista.closeSlidingItems();
          }
        }
      ]
    });
    alert.present();
  }
}
