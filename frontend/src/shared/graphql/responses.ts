interface CreateReservationResponse {
  data: {
    createReservation: {
      errors: string[];
      reservations?: unknown;
    };
  };
}

interface DeleteReservationResponse {
  data: {
    deleteReservation: {
      errors: string[];
      reservations?: unknown;
    };
  };
}

interface GetAllRoomsResponse {
  data: {
    getAllRooms: {
      errors?: string[];
      rooms?: unknown;
    };
  };
}

interface GetAllReservationsResponse {
  data: {
    getAllReservations: {
      errors?: string[];
      reservations?: unknown;
    };
  };
}

export type {
  CreateReservationResponse,
  GetAllRoomsResponse,
  GetAllReservationsResponse,
  DeleteReservationResponse,
};
