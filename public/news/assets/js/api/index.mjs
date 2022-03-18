export const client = axios.create({
  baseURL: `${SERVER_DOMAIN}`,
});

client.interceptors.response.use(undefined, (error) => {
  console.error(error);
  HTML_Container.innerHTML= 'Что то пошло не так :(';
  return Promise.reject(error)
})
