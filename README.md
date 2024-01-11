# Mudanças na V5 do react-query

### Use query

```js
const {
  data,
  // isLoading é somente o initialLoading
  isLoading,
  // isPending é true quando não houver valor no cache
  isPending,
  // isFetching é true sempre que a queryFn estiver executando, seja no primeiro carregamento ou no refetch
  isFetching,
  error,
  isError,
} = useQuery({
  // enabled define se a request vai ser feita ou não
  enabled: false,
  // staleTime define o tempo de vida do cache
  staleTime: Infinity, // Pra sempre
  // Define o tempo de vida do cache quando o dado estiver inativa
  gcTime: 1000 * 60 * 60 * 24, // 24 horas
  // Automaticamente o react query faz o refetch quando o usuário altera a janela
  refetchOnWindowFocus: true,
  // Define o tempo que o react query vai esperar para fazer o refetch
  refetchInterval: 1000 * 60 * 60, // 1 hora
  // Caso retorne um erro, o react query vai tentar fazer o refetch
  retry: false,
  // Configura o intervalo entre as tentativas
  retryDelay: 1000 * 60 * 5, // 5 minutos
});
```
