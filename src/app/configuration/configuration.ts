import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TopbarComponent } from '../shared/components/topbar/topbar';

@Component({
  selector: 'app-configuration',
  imports: [CommonModule, TopbarComponent],
  template: `
    <div class="h-screen flex flex-col bg-secondary-50">
      <app-topbar></app-topbar>
      
      <main class="flex-1 p-4 sm:p-6 overflow-hidden">
        <div class="max-w-7xl mx-auto w-full">
          <h1 class="text-3xl font-bold text-secondary-900 mb-6">Configuration</h1>
          <div class="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
            <p class="text-secondary-600">Configuration</p>
          </div>
        </div>
      </main>
    </div>
  `,
  standalone: true
})
export class ConfigurationComponent {
  private readonly router = inject(Router);

  goBack() {
    this.router.navigate(['/home']);
  }
}
