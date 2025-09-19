export interface UserDataDecoded {
    id: string;
    name: string;
    role: "user" | "admin"; // or widen if more roles exist
    iat: number; // issued at
    exp: number; // expiration
  }
  
  export interface UserData {
    message: string; // e.g. "verified"
    decoded: UserDataDecoded;
  }
  