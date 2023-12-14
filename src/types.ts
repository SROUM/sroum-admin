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
  input: string;
  selectOtions?: string[];
}

interface User {
  id: string;
  pw: string;
  name: string;
  gender: string;
  desc: string;
}
