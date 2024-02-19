export const getExistingReservationsQuery = `
  query { getAllReservations { reservations { id room_id checkin_date checkout_date total_charge  } } }
`;

export const getRoomIdsQuery = 'query { getAllRooms { rooms { id } } }';
