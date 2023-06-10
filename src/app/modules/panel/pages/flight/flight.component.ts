import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FlightsService } from '../../services/flights.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})
export class FlightComponent implements AfterViewInit {
  @ViewChild('seatingCanvas', { static: true })
  seatingCanvasRef!: ElementRef<HTMLCanvasElement>;

  flight: any;
  selectedSeats: { id: number, seat: string, active: boolean }[] = [];

  paymentCompleted = false;

  paymentModes = [
    { id: 'CREDIT_CARD', label: "Cartão de crédito" },
    { id: 'DEBIT_CARD', label: "Cartão de débito" },
    { id: 'PIX', label: "PIX" },
    { id: 'BOLETO', label: 'BOLETO' }
  ];
  selectedPaymentMode: string = "";

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly flightsService: FlightsService
  ) { }

  ngAfterViewInit() {
    const vooId = this.activatedRoute.snapshot.paramMap.get('id');
    const passengers = this.activatedRoute.snapshot.paramMap.get('passengers');
    console.log(vooId, passengers); // Exibe "11" no console
    if (!vooId || !passengers) return
    if (parseInt(passengers) > 10) window.location.href = "";

    this.getFlight(vooId, passengers)
  }

  private async getFlight(vooId: string, passengers: string) {
    const flight = await lastValueFrom(this.flightsService.getFlightId(vooId, passengers));
    this.flight = flight;
    console.log(flight)
    this.generateCanvas()
  }

  async buyFlight() {
    const numPassengers = parseInt(this.flight.passengers);

    if (this.selectedSeats.length !== numPassengers) {
      alert('Você deve selecionar assentos para todos os passageiros.');
      return;
    }

    if (!this.selectedPaymentMode) {
      alert('Você deve selecionar o modo de pagamento.');
      return;
    }

    const seats = this.selectedSeats.map(seat => seat.id);

    const ticketData = {
      seats,
      payment_mode: this.selectedPaymentMode
    };

    try {
      await lastValueFrom(this.flightsService.buyTicket(ticketData));
      this.paymentCompleted = true;

      setTimeout(() => {
        this.paymentCompleted = false;
        window.location.href = "/conta";
      }, 2000);
    } catch (error: any) {
      alert(error.error.message);
    }
  }

  selectSeat(seatId: { id: number, seat: string, active: boolean }) {
    const numPassengers = parseInt(this.flight.passengers);

    if (numPassengers === 1) {
      this.selectedSeats = [seatId];
    } else if (numPassengers > 1) {
      if (this.selectedSeats.length < numPassengers) {
        const seatAlreadySelected = this.selectedSeats.some(seat => seat.id === seatId.id);
        if (!seatAlreadySelected) {
          this.selectedSeats.push(seatId);
        }
      } else {
        this.selectedSeats.pop(); // Remove o último assento selecionado
        this.selectedSeats.push(seatId);
      }
    }
  }

  getPaymentCard() {
    return this.flight.installmentAmounts[this.flight.installmentAmounts.length - 1]
  }

  formatNumber(number: number) {
    return parseFloat(String(number)).toFixed(2).replace(".", ',')
  }

  getEconomy() {
    const card = this.getPaymentCard()
    const total = parseInt(card.installment) * parseFloat(card.installmentAmount);

    return this.formatNumber(total - parseFloat(this.flight.pix))
  }

  private generateCanvas() {
    const canvas = this.seatingCanvasRef.nativeElement;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Definir cores, tamanho dos assentos e espaçamento
    const availableColor = '#408541';
    const unavailableColor = '#616361';
    const hoverColor = '#408511'; // Cor ao passar o mouse sobre o assento
    const seatWidth = 40;
    const seatHeight = 40;
    const seatSpacing = 10;

    // Definir dados dos assentos
    const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];
    const seatsPerRow = 7;
    const seatsPerGroup = [2, 3, 2]; // Número de assentos em cada grupo

    // Calcular tamanho do canvas com base no número de fileiras e assentos por fileira
    const canvasWidth = (seatWidth + seatSpacing) * seatsPerRow;
    const canvasHeight = (seatHeight + seatSpacing) * rows.length;

    // Ajustar tamanho do canvas
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    // Função para obter as coordenadas do mouse em relação ao Canvas
    const getMousePos = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;
      return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
      };
    };

    // Função para verificar se o mouse está sobre um assento
    const isMouseOverSeat = (mouseX: number, mouseY: number, seatX: number, seatY: number) => {
      return (
        mouseX >= seatX &&
        mouseX <= seatX + seatWidth &&
        mouseY >= seatY &&
        mouseY <= seatY + seatHeight
      );
    };

    // Função para desenhar um assento
    const drawSeat = (x: number, y: number, available: boolean, hover: boolean) => {
      context.beginPath();
      context.rect(x, y, seatWidth, seatHeight);
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.fillStyle = hover ? hoverColor : (available ? availableColor : unavailableColor);
      context.fill();
      context.stroke();
      context.closePath();
    };

    // Função para desenhar a letra da fileira e o número do assento
    const drawSeatLabel = (x: number, y: number, label: string) => {
      context.font = '16px Arial';
      context.textAlign = 'center';
      context.fillStyle = 'black';
      context.fillText(label, x + seatWidth / 2, y + seatHeight / 2 + 6);
    };

    // Desenhar os assentos e suas labels
    let seatGroupIndex = 0;
    let seatIndex = 0;

    for (let i = 0; i < rows.length; i++) {
      const rowLabel = rows[i];
      const rowY = (seatHeight + seatSpacing) * i;

      const leftSeats = Math.floor((seatsPerRow - seatsPerGroup[seatGroupIndex]) / 2);
      const rightSeats = seatsPerRow - seatsPerGroup[seatGroupIndex] - leftSeats;

      // Desenhar assentos à esquerda
      for (let j = 0; j < leftSeats; j++) {
        const seatNumber = j + 1;
        const seatX = (seatWidth + seatSpacing) * j;
        const seatLabel = `${rowLabel}${seatNumber}`;

        const find = this.flight.seats.find((s: { seat: string }) => s.seat.trim() == seatLabel)
        const isSeatAvailable = find?.active ? find.active : false;
        const isSeatHovered = false; // Estado inicial ao carregar o Canvas

        drawSeat(seatX, rowY, isSeatAvailable, isSeatHovered);
        drawSeatLabel(seatX, rowY, seatLabel);

        seatIndex++;
      }

      // Desenhar assentos do grupo atual
      for (let j = 0; j < seatsPerGroup[seatGroupIndex]; j++) {
        const seatNumber = leftSeats + j + 1;
        const seatX = (seatWidth + seatSpacing) * (j + leftSeats);
        const seatLabel = `${rowLabel}${seatNumber}`;

        const find = this.flight.seats.find((s: { seat: string }) => s.seat.trim() == seatLabel)
        const isSeatAvailable = find?.active ? find.active : false;
        const isSeatHovered = true; // Estado inicial ao carregar o Canvas

        drawSeat(seatX, rowY, isSeatAvailable, isSeatHovered);
        drawSeatLabel(seatX, rowY, seatLabel);

        seatIndex++;
      }

      // Desenhar assentos à direita
      for (let j = 0; j < rightSeats; j++) {
        const seatNumber = seatsPerGroup[seatGroupIndex] + leftSeats + j + 1;
        const seatX = (seatWidth + seatSpacing) * (j + leftSeats + seatsPerGroup[seatGroupIndex]);
        const seatLabel = `${rowLabel}${seatNumber}`;

        const find = this.flight.seats.find((s: { seat: string }) => s.seat.trim() == seatLabel)
        const isSeatAvailable = find?.active ? find.active : false;
        const isSeatHovered = false; // Estado inicial ao carregar o Canvas

        drawSeat(seatX, rowY, isSeatAvailable, isSeatHovered);
        drawSeatLabel(seatX, rowY, seatLabel);

        seatIndex++;
      }

      // Verificar se chegou ao final do grupo atual
      if (seatIndex >= seatsPerGroup[seatGroupIndex]) {
        seatIndex = 0;
        seatGroupIndex = (seatGroupIndex + 1) % seatsPerGroup.length;
      }
    }

    // Manipulador de evento para o movimento do mouse
    canvas.addEventListener('mousemove', (event: MouseEvent) => {
      const mousePos = getMousePos(event);

      // Verificar se o mouse está sobre algum assento e alterar a cor
      for (let i = 0; i < rows.length; i++) {
        const rowY = (seatHeight + seatSpacing) * i;

        for (let j = 0; j < seatsPerRow; j++) {
          const seatX = (seatWidth + seatSpacing) * j;
          const find = this.flight.seats.find((s: { seat: string }) => s.seat.trim() == `${rows[i]}${j + 1}`)
          const isSeatAvailable = find?.active ? find.active : false;
          const isSeatHovered = isMouseOverSeat(mousePos.x, mousePos.y, seatX, rowY);

          drawSeat(seatX, rowY, isSeatAvailable, isSeatHovered);
          drawSeatLabel(seatX, rowY, `${rows[i]}${j + 1}`);

          seatIndex++;

          // Verificar se chegou ao final do grupo atual
          if (seatIndex >= seatsPerGroup[seatGroupIndex]) {
            seatIndex = 0;
            seatGroupIndex = (seatGroupIndex + 1) % seatsPerGroup.length;
          }
        }
      }
    });

    // Manipulador de evento para o clique do mouse
    canvas.addEventListener('click', (event: MouseEvent) => {
      const mousePos = getMousePos(event);

      // Verificar se o mouse está sobre algum assento
      for (let i = 0; i < rows.length; i++) {
        const rowY = (seatHeight + seatSpacing) * i;

        for (let j = 0; j < seatsPerRow; j++) {
          const seatX = (seatWidth + seatSpacing) * j;
          const isSeatAvailable = seatIndex < seatsPerGroup[seatGroupIndex];

          if (isMouseOverSeat(mousePos.x, mousePos.y, seatX, rowY)) {
            const seatLabel = `${rows[i]}${j + 1}`;
            const foundSeat = this.flight.seats.find((s: { seat: string }) => s.seat.trim() === seatLabel);
            console.log(foundSeat, seatLabel)
            if (!foundSeat) {
              alert('Esse assento não está disponível');
            } else {
              if (foundSeat.active) this.selectSeat(foundSeat);
            }

          }

          seatIndex++;

          // Verificar se chegou ao final do grupo atual
          if (seatIndex >= seatsPerGroup[seatGroupIndex]) {
            seatIndex = 0;
            seatGroupIndex = (seatGroupIndex + 1) % seatsPerGroup.length;
          }
        }
      }
    });
  }
}
