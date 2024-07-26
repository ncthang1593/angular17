import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { SwiperService } from './swiper.service';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [NzCheckboxModule ],
  template: `
    <p>test works!</p>
    <div class="swiper">
      <swiper-container
        slides-per-view="3"
        speed="400"
        navigation="true"
        [allowTouchMove]="false"
        [autoplay]="{ delay: 1000, disableOnInteraction: false }"
        [navigation]="true"
        [pagination]="{ clickable: true }"
      >
        <swiper-slide
          ><img src="https://placehold.co/400x400" />11</swiper-slide
        >
        <swiper-slide
          ><img src="https://placehold.co/400x400" />22</swiper-slide
        >
        <swiper-slide
          ><img src="https://placehold.co/400x400" />33</swiper-slide
        >
        <swiper-slide
          ><img src="https://placehold.co/400x400" />44</swiper-slide
        >
        <swiper-slide
          ><img src="https://placehold.co/400x400" />55</swiper-slide
        >
        <swiper-slide
          ><img src="https://placehold.co/400x400" />66</swiper-slide
        >
        <swiper-slide
          ><img src="https://placehold.co/400x400" />77</swiper-slide
        >
        <swiper-slide><img src="https://placehold.co/400x400" /></swiper-slide>
      </swiper-container>
    </div>
  `,
  styleUrl: './test.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [SwiperService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestComponent implements OnInit, AfterViewInit, OnDestroy {
  private swiperService = inject(SwiperService);
  ngOnInit() {}

  ngAfterViewInit() {
    this.swiperService.changeStyleSwiper();
  }

  ngOnDestroy() {
    this.swiperService.removeListeners();
  }
}
