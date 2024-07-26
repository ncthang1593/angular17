import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SwiperService {
  private config = {
    colorBullet: '#100f0f',
  };

  private swiperPagination!: NodeListOf<HTMLElement> | undefined;
  private btnNextSwiperPagination!: HTMLElement;
  private paginationClickListeners: ((
    this: HTMLElement,
    ev: MouseEvent,
  ) => any)[] = [];
  private paginationClickListenersBtn: ((
    this: HTMLElement,
    ev: MouseEvent,
  ) => any)[] = [];

  public changeStyleSwiper(): void {
    setTimeout(() => {
      const swiperElement = document
        .querySelector('.swiper')
        ?.querySelector('swiper-container')
        ?.shadowRoot?.querySelector('.swiper');

      const btnPrev = swiperElement?.querySelector(
        '.swiper-button-prev',
      ) as HTMLElement;
      const btnNext = swiperElement?.querySelector(
        '.swiper-button-next',
      ) as HTMLElement;
      this.btnNextSwiperPagination = btnNext;
      this.swiperPagination = swiperElement?.querySelectorAll(
        '.swiper-pagination-bullet',
      );

      // change color
      btnPrev.style.color = 'gray';
      btnNext.style.color = 'gray';
      this.swiperPagination?.forEach((item: HTMLElement, index: number) => {
        if (
          (item as HTMLElement).classList.contains(
            'swiper-pagination-bullet-active',
          )
        ) {
          (item as HTMLElement).style.background = this.config.colorBullet;
        }

        const clickListener = () => {
          (this.swiperPagination?.[index] as HTMLElement).style.background =
            this.config.colorBullet;
        };
        const clickListenerBtn = () => {
          (this.swiperPagination?.[index] as HTMLElement).style.background =
            this.config.colorBullet;
        };

        (item as HTMLElement).addEventListener('click', clickListener);
        btnNext.addEventListener('click', clickListenerBtn);
        this.paginationClickListeners[index] = clickListener;
        this.paginationClickListenersBtn[index] = clickListenerBtn;
      });
    }, 0);
  }

  public removeListeners(): void {
    this.swiperPagination?.forEach((item: HTMLElement, index: number) => {
      const paginationItem = item as HTMLElement;
      const clickListener = this.paginationClickListeners[index];
      const clickListenerBtn = this.paginationClickListenersBtn[index];
      if (clickListener) {
        paginationItem.removeEventListener('click', clickListener);
      }
      this.btnNextSwiperPagination.removeEventListener(
        'click',
        clickListenerBtn,
      );
    });
  }

  private styleBullet(active: boolean) {
    const style:
      | { top: string; width: string; position: string; height: string }
      | {} = active
      ? {
          width: '15px',
          height: '10px',
          position: 'relative',
          top: '1px',
        }
      : {};

    return style;
  }
}
