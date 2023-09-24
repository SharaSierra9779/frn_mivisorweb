import { Component } from '@angular/core';
import { Map, Marker, marker, polygon, tileLayer } from 'leaflet';
import { VisorservicioService } from './visorservicio.service';
import * as wellknown from 'wellknown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'MiVisorMapaApp';
  usuarios: any[] = [];
  map?: Map;
  currentMarker?: Marker;
  constructor(private visorServicio: VisorservicioService) { }

  ngAfterViewInit() {
    this.map = new Map('map').setView([51.505, -0.09], 13);
    tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map);

    this.cargarDatos();
  }

  cargarDatos() {
    this.visorServicio.getConsultarPredio().subscribe(
      data => {
        console.log(data);
        data.forEach((predio: Predio) => {
          const geoJson = wellknown.parse(predio.geom);
          if (geoJson!.type === 'Polygon' || geoJson!.type === 'MultiPolygon') {
            polygon(geoJson!.coordinates[0]).addTo(this.map!);
        }
        });
      },
      error => {
        console.log(error);
      }
    );

    this.visorServicio.getConsultarSuscriptor().subscribe(
      data => {
        console.log(data);
        this.usuarios = data;
      },
      error => {
        console.log(error);
      });

  }

  localizar(lat: number, lon: number) {
    if (this.map) {
      this.map.setView([lat, lon], 16);
  
      // Elimina el marcador anterior si existe
      if (this.currentMarker) {
        this.currentMarker.remove();
      }
  
      // Añade un nuevo marcador y guarda una referencia a él
      this.currentMarker = marker([lat, lon]).addTo(this.map);
    }
  }

}

interface Predio {
  id: number;
  código: string;
  estrato: number;
  geom: string;
}

interface Coordinate {
  latitude: number;
  longitude: number;
}
