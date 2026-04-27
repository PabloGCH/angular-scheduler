import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from '../shared/components/topbar/topbar';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule, TopbarComponent],
  template: `
    <app-topbar></app-topbar>
    <div class="min-h-[calc(100-60px)] bg-secondary-50 p-8">
      <div class="max-w-4xl mx-auto">
        <h1 class="text-3xl font-bold text-secondary-900 mb-4">
          Welcome, {{ userType() === 'provider' ? 'Service Provider' : 'Consumer' }}
        </h1>
        
        <div class="bg-white p-6 rounded-lg shadow-sm border border-secondary-200">
          @if (userType() === 'provider') {
            <p class="text-secondary-600">This is your provider dashboard. Manage your appointments here.</p>
          } @else {
            <p class="text-secondary-600">This is your consumer dashboard. Book your next appointment here.</p>
          }
        </div>
      </div>
    </div>
  `,
  standalone: true
})
export class HomeComponent {
  private readonly authService = inject(AuthService);
  protected readonly userType = computed(() => this.authService.getUserType());
}
