import { useQueryClient } from "@tanstack/react-query";
import { IUser } from "./Users";
import { sleep } from "./sleep";
import { Link } from "react-router-dom";
import { useUsers } from "./hooks/useUsers";

export function Posts() {
  const queryClient = useQueryClient();

  const { data } = useUsers();

  function handleMouseEnter() {
    queryClient.prefetchQuery({
      queryKey: ["users"],
      queryFn: async (): Promise<IUser[]> => {
        await sleep(1500);
        const response = await fetch("http://localhost:3000/users");
        return response.json();
      },
    });
  }

  return (
    <div>
      <Link to="/" onMouseEnter={handleMouseEnter}>
        Ir para os usuários
      </Link>
      <br />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
