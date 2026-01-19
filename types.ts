
export enum UserRole {
  GUEST = 'Huésped',
  HOST = 'Anfitrión',
  REAL_ESTATE = 'Inmobiliaria',
  ADMIN = 'Administrador'
}

export enum PropertyType {
  APARTMENT = 'Apartamento',
  CHALET = 'Chalet',
  HOUSE = 'Casa',
  VILLA = 'Villa',
  CARAVAN = 'Caravana',
  ROOM = 'Habitación',
  STUDIO = 'Studio'
}

export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface UserProfile {
  id: string;
  email: string;
  role: UserRole;
  firstName?: string;
  lastName?: string;
  nationality?: string;
  dniNumber?: string;
  birthPlace?: string;
  residence?: string;
  isRegistered: boolean;
  dniFront?: string;
  dniBack?: string;
  selfie?: string;
}

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  price: number;
  location: string;
  image: string;
  rating: number;
}
