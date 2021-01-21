/**
 * Created by szg on 01/06/2017.
 */
import { Directive, Input, OnInit } from '@angular/core';
import {GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import { Observable } from 'rxjs';

declare const google;
declare const MarkerClusterer;

@Directive({
  selector: 'marker-cluster'
})

export class MarkerClusterDirective implements OnInit{
  @Input() public points: any[];
  public markerCluster: any;
  public markers: any[] = [];
  constructor(private gmapsApi: GoogleMapsAPIWrapper) {}

  public ngOnInit() {
    this.gmapsApi.getNativeMap().then((map) => {
      const markerIcon = {
        url: '/assets/img/map/m3.png',
        scaledSize: new google.maps.Size(35, 35)
      };
      //
      const style = {
        url: '/assets/img/map/regroup.png',
        height: 40,
        width: 40,
        textColor: '#FFF',
        textSize: 11,
        backgroundPosition: 'center center'
      };

      const options = {
        imagePath: '/assets/img/map/regroup.png',
        gridSize: 70,
        styles: [style, style, style]
      };

      Observable
        .interval(500)
        .skipWhile((s) => this.points == null || this.points.length <= 0)
        .take(1)
        .subscribe(() => {
          if(this.markerCluster) {
            this.markerCluster.clearMarkers();
          }
          if (this.points.length > 0) {
            for (const point of this.points) {
              const marker = new google.maps.Marker({
                position: new google.maps.LatLng(point.lat, point.lng),
                icon: markerIcon
              });

              const contentString = '<div id="info-window"><strong>'+point.name+'</strong> <br>' +
                'Latitude: ' + point.lat + '<br>' +
                'Longitude: ' + point.lng +
                '</div>';
              const infowindow = new google.maps.InfoWindow({
                content: contentString
              });

              marker.addListener('mouseover', function() {
                infowindow.open(map, marker);
              });
              marker.addListener('mouseout', function() {
                infowindow.close(map, marker);
              });

              this.markers.push(marker);
            }
          } else {
            this.markers = [];
          }
          this.markerCluster = new MarkerClusterer(map, this.markers, options);
        });
    });
  }
}
