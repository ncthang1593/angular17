import { Component, Host, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ParentComponent } from '../components/parent/parent.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ChildComponent } from '../components/child/child.component';
import { DataService } from '../services/data.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ControlValueAccessorComponent } from '../components/control-value-accessor/control-value-accessor/control-value-accessor.component';
import { CommonModule } from '@angular/common';
import { RightSideModalComponent } from '../components/right-side-modal/right-side-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ParentComponent,
    NzButtonModule,
    ChildComponent,
    HttpClientModule,
    CommonModule,
    ControlValueAccessorComponent,
    RightSideModalComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    {
      provide: DataService,
      // useValue: {
      //   name: 'new hello 1',
      // },
    },
  ],
})
export class AppComponent {
  title = 'angular17';

  // private dataService = inject(DataService)
  constructor(@Host() private dataService: DataService) {
    this.dataService.name = 'new data from app';
  }

  isButton1White: boolean = true;

  toggleButtonColor(buttonNumber: number): void {
    if (buttonNumber === 2) {
      this.isButton1White = false;
    } else {
      this.isButton1White = true;
    }
  }

  // right side modal
  isModalOpen = false;
  openModal() {
    this.isModalOpen = true;
  }
  closeModal() {
    this.isModalOpen = false;
  }

  private printWindow: Window | null = null;

  printDiv2() {
    const div2 = document.getElementById('div2');
    if (div2) {
      this.printWindow = window.open('', '', 'height=600,width=800');
      if (this.printWindow) {
        this.printWindow.document.write(
          '<html><head><title>Print div2</title>',
        );
        this.printWindow.document.write('<style>');
        this.printWindow.document.write(
          '#div2 { width: 500px; height: 500px; background-color: blue; color: white; padding: 20px; }',
        );
        this.printWindow.document.write('</style>');
        this.printWindow.document.write('</head><body>');
        this.printWindow.document.write(div2.outerHTML);
        this.printWindow.document.write('</body></html>');
        this.printWindow.document.close();
        this.printWindow.print();
        this.printWindow.focus(); // Ensure the print window is focused before printing

        // Listen for print events
        this.listenForPrintEvents();
      }
    }
  }

  private listenForPrintEvents() {
    const onPrintComplete = () => {
      console.log('Print dialog closed');
      // Handle the print complete action here
    };

    const onBeforePrint = () => {
      console.log('Print dialog opened');
      // Handle the print opening action here
    };

    window.addEventListener('beforeprint', onBeforePrint);
    window.addEventListener('afterprint', onPrintComplete);

    // Clean up event listeners
    setTimeout(() => {
      window.removeEventListener('beforeprint', onBeforePrint);
      window.removeEventListener('afterprint', onPrintComplete);
    }, 1000); // Adjust the timeout as needed
  }
}
