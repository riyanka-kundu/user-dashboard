export type ApiResponse<T> = {
  status: boolean;
  message: string;
  data?: T;
};
export type TUserDashboard = {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  is_verified: boolean;
  role: string;
  tokenVersion: number;
  createdAt: string;
  updatedAt: string;
  lastLogin: string;
};

export type TDoctor = {
  _id: string;
  name: string;
  fees: number;
  department?: {
    _id: string;
    name: string;
  };
  schedule?: {
    startTime: string;
    endTime: string;
    slotDuration: number;
  };
};

export type TDoctorListResponse = {
  data: TDoctor[];
  totalItems: number;
  totalPages: number;
  page: number;
  limit: number;
};
export type TAppointment = {
  _id: string;
  doctorId: {
    _id: string;
    name: string;
    fees: number;
    department?: {
      name: string;
    };
  };
  userId: string;
  name: string;
  date: string;
  time: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  createdAt: string;
};

export type THistoryResponse = {
  status: boolean;
  totalAppointments: number;
  data: TAppointment[];
  message: string;
};

export type TDiagnosticCenter = {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: {
    type: "Point";
    coordinates: [number, number];
  };
};
export type TDiagnosticCenterList = {
  status: boolean;
  total: number;
  data: TDiagnosticCenter[];
};
export type TNominatimResult = {
  display_name: string;
  lat: string;
  lon: string;
};

export type TLoginResponse = {
  status: boolean;
  message: string;
  data: TUser;
  accessToken: string;
  refreshToken: string;
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};
