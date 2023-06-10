export interface Ticket {
    airline_company_id: number;
    created_at: string;
    departure_date: string;
    id: number;
    installmentAmounts: { installmentAmount: number, installment: number }[];
    airline_company: { name: string, logo: string };
    max_weight: string;
    one_way_price: string;
    passengers: number;
    pix: number;
    return_date: string | null;
    origin: string;
    destination: string;
    round_trip_price: string;
    seats: { created_at: string, flight_id: number, id: number, seat: string, ticket: TicketDetails }[];
    tickets: any[]; // Você precisa especificar o tipo correto para a propriedade tickets
    total: number;
    updated_at: string;
}

interface TicketDetails {
    created_at: string;
    id: number;
    payment_mode: string;
    seat_id: number;
    status: string;
    updated_at: string;
    user_id: number;
}
