/* IDENTIFICACION DE ARCHIVOS 
1. En qué archivo se define la interfaz juego?
rpta: se encuentra en el archivo interfaces.
2. Qué archivo maneja el estado global de los filtros?
rpta: el archivo filtros.component.ts.
3. Donde se configura el HttpClient para la aplicación?
rpta: app.config.ts
COMPRENSION DE ARQUITECTURA
4. Por qué este proyecto no tiene app.module.ts?
rpta: porque el proyecto usa standalone.
5. ¿Qué ventaja tiene usar BehaviorSubject en el servicio de juegos?
rpta: porque mantiene actualizados a los suscriptores o jugadores con los valores más recientes.
*/

import { Component,OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JuegosDataService } from '../../services/juegos-data.service';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { Juego } from '../../interfaces/juego.interface';
import { Observable } from 'rxjs';
import { Categoria } from '../../interfaces/categoria.interface';
import { RouterLink } from '@angular/router';
import { TarjetaJuegoComponent } from '../tarjeta-juego/tarjeta-juego.component';
import { CategoriasService } from '../../services/categorias.service';


@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [CommonModule,RouterLink,TarjetaJuegoComponent,],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit{
   juegosPopulares$!: Observable<Juego[]>;
   juegos$!: Observable<Juego[]>;
   totalJuegos=0;
   juegosGratis=0;
   juegosPago=0;
   promedio=0;
   mejorjuego?:Juego;
     
     constructor(
      private juegosService: JuegosDataService, 
      private juegosDataService: JuegosDataService,
    private categoriasService: CategoriasService) {}

     ngOnInit(): void{

      this.juegosPopulares$ = this.juegosService.obtenerJuegosPopulares(1);
      this.juegosDataService.obtenerJuegos().subscribe(juegos => {
      this.totalJuegos = juegos.length;
      this.juegosGratis = juegos.filter(j => j.esGratis).length;
      this.juegosPago = juegos.filter(j => !j.esGratis).length;
       const precios = juegos.filter(j => !j.esGratis).map(j => j.precio);
      this.promedio = precios.length > 0? precios.reduce((acc, precio) => acc + precio, 0) / precios.length: 0;
  });
    }
}
