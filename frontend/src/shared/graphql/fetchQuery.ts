import { getBaseApi } from '@/shared/base';

const fetchQuery = async (query: any, variables = {}) =>
  await getBaseApi().post('/graphql', { query, variables }, { mode: 'cors' });

export default fetchQuery;
