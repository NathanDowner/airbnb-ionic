import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { PlacesService } from '../../places.service';
import { Place } from '../../place.model';
import { CreateBookingComponent } from '../../../bookings/create-booking/create-booking.component';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit {

  place: Place;

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.navCtrl.navigateBack('/places/tabs/discover');
      }

      this.place = this.placesService.getPlace(paramMap.get('placeId'));
    });

  }

  async onShowModal() {
    const modal = await this.modalCtrl.create({
      component: CreateBookingComponent,
      componentProps: {
        place: this.place
      }
    });

    await modal.present();
    const {data} = await modal.onDidDismiss();
    if (data.hasOwnProperty('message')) {
      this.navCtrl.navigateBack('/places/tabs/discover');
    }
    console.log(data);

  }
  // just  another way of doing it

  // onBookPlace() {
  //   this.modalCtrl.create({
  //     component: CreateBookingComponent,
  //     componentProps: {
  //       place: this.place
  //     }
  //   }).then(modalEl => {
  //     modalEl.present();
  //     return modalEl.onDidDismiss();
  //   }).then(data => {
  //     console.log(data);
  //   });
    // this.router.navigateByUrl('/places/tabs/discover');
    // this.navCtrl.navigateBack('/places/tabs/discover');
    // this.navCtrl.pop(); works if you have a stack and just one to pop the top
  // }

}
