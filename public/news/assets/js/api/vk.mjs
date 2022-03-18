import { client } from './index.mjs';

export async function getVKNews() {
  return await client.get('/vknews', {
    headers: {
      Origin: 'https://tfc-survival.ru',
    },
  });
}
