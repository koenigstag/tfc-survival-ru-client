export const client = window.axios.create({
  baseURL: `${window.SERVER_DOMAIN}`,
});

client.interceptors.response.use(undefined, (error) => {
  console.error(error);
  window.HTML_Container.innerHTML= 'Что то пошло не так :(';
  return Promise.reject(error)
})
