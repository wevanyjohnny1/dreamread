declare interface IUser {
  active?: boolean;
  doc: string;
  email: string;
  id: string;
  isLoggedIn: boolean;
  name: string;
  password: string;
  phone: string;
  profile: "Adm" | "Comum";
  isTairana: boolean;
}