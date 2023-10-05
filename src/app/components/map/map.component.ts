import {AfterViewInit, Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import WKT from 'ol/format/WKT.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {fromLonLat} from 'ol/proj.js';
import {getCenter} from "ol/extent"
import {Feature} from "ol";
import {Geometry} from "ol/geom";

@Component({
  selector: 'mina-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit{
  @ViewChild('move') mapContainer !:ElementRef
  @Input() wkt :string = 'LINESTRING(50.32489718460863 40.3897112495751,50.32500619720577 40.39007045577375)\n'

  raster !: TileLayer<OSM>
  format !: WKT
  feature ! :Feature<Geometry>
  vector !:  VectorLayer<VectorSource<Geometry>>
  baku = fromLonLat([49.8951, 40.3890])
  view !:View
  map !: Map

  ngAfterViewInit() {

      this.generateWtk()

  }


  private generateWtk(){
      this.view = new View({
        center: this.baku,
        zoom: 12,
      });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      target: this.mapContainer.nativeElement,
      view: this.view
    });

    if(this.wkt != ''){
this.map.dispose()

      this.raster = new TileLayer({
        source: new OSM(),
      });
      this.format = new WKT();

      this.feature = this.format.readFeature(this.wkt, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857',
      });

      this.vector = new VectorLayer({
        source: new VectorSource({
          features: [this.feature],
        }),
      });

      this.view = new View({
        center: this.baku,
        zoom: 12,
      });


      this.map = new Map({
        layers: [this.raster, this.vector],
        target: this.mapContainer.nativeElement,
        view: this.view
      });
    }

  }


  flyTo(){
    const zoom = this.view.getZoom() ||12;
    const duration = 2000;
    const extent = this.feature?.getGeometry()?.getExtent()

    if(extent){
      this.view.animate(
        {
          zoom: zoom - 2,
          duration: duration ,
        }
        ,()=>{
          this.map.getView().fit(extent, { padding: [10, 10, 10, 10],duration:duration  });

        }
      )
    }

  }


}
