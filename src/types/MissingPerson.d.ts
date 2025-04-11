export interface MissingPerson {
  reportedBy: User;
  name: string;
  age: number;
  phone: string;
  lastSeenLocation: string;
  dateMissing: Date;
  description: string;
  image: string;
  status: "missing" | "found";
  createdAt: Date;
}
