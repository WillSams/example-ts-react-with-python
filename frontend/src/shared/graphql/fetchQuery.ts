import { getBaseApi } from '@/shared/base';

const fetchQuery = async (query: unknown, variables = {}) =>
  await getBaseApi().post('/graphql', { query, variables });

export default fetchQuery;
