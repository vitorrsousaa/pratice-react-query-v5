import { useQuery } from "@tanstack/react-query";
import { sleep } from "./sleep";
import { useState } from "react";
import { useUsers } from "./hooks/useUsers";
import { useCreateUser } from "./hooks/useCreateUser";

export interface IUser {
  id: string;
  name: string;
  email: string;
}

export function Users() {
  const [signedIn, setSignedIn] = useState(false);

  const { data: user, isLoading } = useQuery({
    queryKey: ["users", "2"],
    queryFn: async (): Promise<IUser> => {
      await sleep(1500);
      const response = await fetch("http://localhost:3000/users/2");
      return response.json();
    },
    enabled: signedIn,
  });

  const {
    data,
    // isLoading é somente o initialLoading
    isLoading: isLoadingData,
    refetch: refetchData,
    // isPending é true quando não houver valor no cache
    // isPending,
    // isFetching é true sempre que a queryFn estiver executando, seja no primeiro carregamento ou no refetch
    isFetching: isFetchingData,
    error: errorData,
    isError: isErrorData,
  } = useUsers();

  const { mutate, isPending } = useCreateUser();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const elements = event.currentTarget
      .elements as typeof event.currentTarget.elements & {
      name: HTMLInputElement;
      email: HTMLInputElement;
    };

    mutate({
      email: elements.email.value,
      name: elements.name.value,
    });
  }

  return (
    <div className="p-4">
      <div className="mb-10">
        <form action="" className="flex flex-col gap-2" onSubmit={handleSubmit}>
          <input
            className="outline-none text-zinc-950 rounded-md"
            type="text"
            placeholder="Nome"
            name="name"
          />
          <input
            className="outline-none text-zinc-950 rounded-md"
            type="email"
            placeholder="Email"
            name="email"
          />

          <button className="bg-blue-400 py-2 tex-zinc-950 rounded-md">
            {isPending ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>

      <button
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={() => setSignedIn(true)}
      >
        Listar usuário
      </button>
      {isLoading && <div>Loading user...</div>}
      <ul>
        <li key={user?.id}>
          <strong className="block">{user?.name}</strong>
          <small>{user?.email}</small>
        </li>
      </ul>
      <hr className="m-8" />
      <button
        className="bg-white text-black px-4 py-2 rounded-lg"
        onClick={() => refetchData()}
      >
        Listar usuários
      </button>
      {isLoadingData && <h1>Loading users...</h1>}
      {!isLoadingData && isFetchingData && <small>Loading users...</small>}
      {errorData && <div>Error {errorData.message}</div>}
      {isErrorData && <div>hasError</div>}
      <ul>
        {data?.map((user) => (
          <li key={user?.id}>
            <strong className="block">{user?.name}</strong>
            <small>{user?.email}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
