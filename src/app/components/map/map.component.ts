import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import WKT from 'ol/format/WKT.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from 'ol/proj.js';
import {getCenter} from "ol/extent"
@Component({
  selector: 'mina-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit{
  @ViewChild('move') map !:ElementRef
  ngAfterViewInit() {
    const btn = document.getElementById('flyTo')

    const raster = new TileLayer({
      source: new OSM(),
    });

    const wkt =
      'LINESTRING(50.32489718460863 40.3897112495751,50.32500619720577 40.39007045577375)';

    const format = new WKT();

    const feature = format.readFeature(wkt, {
      dataProjection: 'EPSG:4326',
      featureProjection: 'EPSG:3857',
    });

    const vector = new VectorLayer({
      source: new VectorSource({
        features: [feature],
      }),
    });

    const baku = fromLonLat([49.8951, 40.3890])
    const view = new View({
      center: baku,
      zoom: 12,
    });

    const map = new Map({
      layers: [raster, vector],
      target: this.map.nativeElement,
      view: view
    });







    btn?.addEventListener('click',(e)=>{
      const zoom = view.getZoom() ||12;
      const duration = 2000;
      const extent = feature?.getGeometry()?.getExtent()

      if(extent){
        view.animate(
          {
            zoom: zoom - 2,
            duration: duration ,
          }
          ,()=>{
            map.getView().fit(extent, { padding: [10, 10, 10, 10],duration:duration  });

          }
        )
      }


    })
  }


}
