interface Menu {
  name: string;
  url: string;
}

interface AdminUser {
  email: string;
  password: string;
  accessTime: string;
}

interface UserDataCol {
  name: string;
  type: string;
  isPrimaryKey?: boolean;
}
