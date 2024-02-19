interface CreateReservationResponse {
  data: {
    createReservation: {
      errors: any;
      reservations?: any;
    };
  };
}

interface DeleteReservationResponse {
  data: {
    deleteReservation: {
      errors: any;
      reservations?: any;
    };
  };
}

interface GetAllRoomsResponse {
  data: {
    getAllRooms: {
      errors?: any;
      rooms?: any;
    };
  };
}

interface GetAllReservationsResponse {
  data: {
    getAllReservations: {
      errors?: any;
      reservations?: any;
    };
  };
}

export type {
  CreateReservationResponse,
  GetAllRoomsResponse,
  GetAllReservationsResponse,
  DeleteReservationResponse,
};
