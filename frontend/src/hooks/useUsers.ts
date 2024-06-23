import { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import { CanceledError } from "../services/api-client";
import userService from "../services/user-service";

interface User {
  id: number;
  name: string;
  email: string;
}

interface UseUsersResult {
  users: User[];
  error: string;
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
}

const useUsers = (): UseUsersResult => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");
  const [isLoading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { request, cancel } = userService.getAll("/");
    request
      .then((res: AxiosResponse) => {
        setUsers(res.data as User[]); // Assuming your response data is an array of User
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    return () => cancel();
  }, []);

  return { users, error, setUsers, setError, isLoading };
};

export default useUsers;
