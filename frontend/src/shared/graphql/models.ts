type Reservation = {
  id: string;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomId: string;
};

type Room = {
  id: string;
};

export type { Reservation, Room };
