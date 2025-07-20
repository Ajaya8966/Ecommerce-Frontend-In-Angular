import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OrderedProduct {
  product: { name: string };
  qty: number;
}

interface Order {
  id: number;
  user: { name: string };
  paymentMethod: string;
  status: string;
  deliveryDate: string;
  totalAmount: number;
  orderedProducts: OrderedProduct[];
}

@Component({
  selector: 'app-admin-order',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-order.component.html',
  styleUrls: ['./admin-order.component.css']
})
export class AdminOrderComponent {
  orders: Order[] = [];  // load from API in real app
  filterStatus: string = 'pending'; // default filter
  message: string | null = null;

  rejectOrderId: number | null = null;

  constructor() {
    // For demo, add dummy data
    this.orders = [
      {
        id: 1,
        user: { name: 'John Doe' },
        paymentMethod: 'Credit Card',
        status: 'pending',
        deliveryDate: '2025-06-01',
        totalAmount: 100,
        orderedProducts: [
          { product: { name: 'Product A' }, qty: 2 },
          { product: { name: 'Product B' }, qty: 1 }
        ]
      },
      {
        id: 2,
        user: { name: 'Alice Smith' },
        paymentMethod: 'Cash',
        status: 'rejected',
        deliveryDate: '2025-05-20',
        totalAmount: 50,
        orderedProducts: [
          { product: { name: 'Product C' }, qty: 1 }
        ]
      },
      {
        id: 3,
        user: { name: 'Bob Johnson' },
        paymentMethod: 'PayPal',
        status: 'conform',
        deliveryDate: '2025-05-25',
        totalAmount: 75,
        orderedProducts: [
          { product: { name: 'Product D' }, qty: 3 }
        ]
      }
    ];
  }

  setFilter(status: string) {
    this.filterStatus = status;
  }

  get filteredOrders() {
    return this.orders.filter(o => o.status === this.filterStatus);
  }

  openRejectModal(orderId: number) {
    this.rejectOrderId = orderId;
  }

  confirmReject() {
    if (this.rejectOrderId !== null) {
      // call API to reject order here
      // For demo, just update local orders
      const order = this.orders.find(o => o.id === this.rejectOrderId);
      if (order) {
        order.status = 'rejected';
        this.message = `Order ${this.rejectOrderId} rejected successfully.`;
      }
      this.rejectOrderId = null;
    }
  }

  confirmOrder(orderId: number) {
  const order = this.orders.find(o => o.id === orderId);
  if (order && order.status === 'pending') {
    order.status = 'conform';
    this.message = `Order ${orderId} confirmed successfully.`;
  } else {
    this.message = `Unable to confirm order ${orderId}.`;
  }
}

  printLabel(orderId: number) {
  // This could be an API call to generate or download a shipping label.
  // For now, just simulate.
   const order = this.orders.find(o => o.id === orderId);
   if (order && order.status === 'conform') {
    this.message = `Label for Order ${orderId} is ready to print.`;
    // You could redirect or open a new window here to display a label.
    // window.open(`/api/orders/${orderId}/label`, '_blank');
   } else {
    this.message = `Cannot print label. Order ${orderId} is not confirmed.`;
  }
}



  cancelReject() {
    this.rejectOrderId = null;
  }
}
