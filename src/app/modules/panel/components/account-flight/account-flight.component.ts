import { Component, Input } from '@angular/core';
import { Ticket } from '../../interfaces/account.interface';

@Component({
  selector: 'app-account-flight',
  templateUrl: './account-flight.component.html',
  styleUrls: ['./account-flight.component.css']
})
export class AccountFlightComponent {
  @Input() flight!: Ticket;

  getPaymentCard() {
    return this.flight.installmentAmounts[this.flight.installmentAmounts.length - 1]
  }

  formatNumber(number: number) {
    return parseFloat(String(number)).toFixed(2).replace(".", ',')
  }

  showInstallmentPayment() {
    return this.flight.seats[0]?.ticket?.payment_mode != "CREDIT_CARD"
  }

  translateStatus(status: string): string {
    // Mapeie os valores do status para suas traduções correspondentes
    switch (status) {
      case 'AWAITING_PAYMENT':
        return 'Aguardando pagamento';
      case 'PAID':
        return 'Pago';
      case 'CANCELED':
        return 'Cancelado';
      // Adicione mais casos de acordo com os possíveis valores de status
      default:
        return 'Desconhecido';
    }
  }

  translatePaymentMode(paymentMode: string): string {
    // Mapeie os valores do modo de pagamento para suas traduções correspondentes
    switch (paymentMode) {
      case 'PIX':
        return 'PIX';
      case 'CREDIT_CARD':
        return 'Cartão de Crédito';
      // Adicione mais casos de acordo com os possíveis valores do modo de pagamento
      default:
        return 'Desconhecido';
    }
  }

}
