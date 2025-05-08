import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import Chart from 'chart.js/auto';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  private http = inject(HttpClient);

  categoryCount = 0;
  productCount = 0;
  userCount = 0;
  adminCount = 0;
  orderCount = 0;

  ngOnInit(): void {
    this.loadCounts();
  }

  loadCounts(): void {
    this.http.get<any>('/api/admin/stats').subscribe(data => {
      this.categoryCount = data.categoryCount;
      this.productCount = data.productCount;
      this.userCount = data.userCount;
      this.adminCount = data.adminCount;
      this.orderCount = data.orderCount;
      this.renderChart();
    });
  }

  renderChart(): void {
    const ctx = document.getElementById('dashboardChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Categories', 'Products', 'Users', 'Admins', 'Orders'],
        datasets: [{
          label: 'Count',
          data: [
            this.categoryCount,
            this.productCount,
            this.userCount,
            this.adminCount,
            this.orderCount
          ],
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)'
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}
