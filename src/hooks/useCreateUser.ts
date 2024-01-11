import { useMutation } from "@tanstack/react-query";
import { sleep } from "../sleep";

export function useCreateUser() {
  return useMutation({
    mutationFn: async ({ name, email }: { name: string; email: string }) => {
      await sleep(1500);

      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });
      return response.json();
    },
  });
}
