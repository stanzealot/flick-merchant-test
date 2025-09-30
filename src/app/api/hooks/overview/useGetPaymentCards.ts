import useSWR from 'swr';
import { API } from '@/src/utils/constants/api';
import overview from '../../services/overview';

const mockData = {
  status: 200,
  message: 'Cards retrieved successfully',
  data: [
    {
      cardCountry: 'NIGERIA NG',
      cardIssuer: 'MASTERCARD ZENITH BANK DEBIT STANDARD',
      cardFirstSix: '539941',
      cardBin: '539941',
      livePrivateEncKey:
        '-----BEGIN RSA PRIVATE KEY-----\r\nMIIEpQIBAAKCAQEAvIYw+v0lT83KCjfUw+WUvahYPGlgj3TzeA9FQzapAizYHGer\r\nNna884SF4bErQMgLYreIn+EHBBXiyFBzXTGfviQMrDXjYqrZgoxO4DiQpLGM7rnb\r\nFKO91eQmNE5AXR3WjHTsc7Dj4jouEue8aZT0Sg/sN5Ou9Lvf6RTabjyF/A7ZbYOi\r\nkBbPkpZ84+Hc/PmHfFiC74nW9naFJKtsFxKjR20/jnkYS68YjfpiFRpWj34la8H3\r\n9LFi4OyfoGxqfGaPJzT8WiI52sUZHquBAlMF9zG1HxqwTU1JK3D7YQDH8Nc/8nI/\r\n8ovYQ3bEyFYpwwMv+Nxea+ZmA9A17YtDQS3kewIDAQABAoIBAAK5FkU5zNH3RF81\r\nAtZSUmPe5gKRXxSs+StKkflWwiz6ET3WMLHlSygu4z3CsL/YMKa1xSJrpKdMpzoc\r\nRCscOvtxfkFduEtF8auIc62anSdtbRfk1VZAYZvD40CUJ/fWvrEuqyk/0wecex5I\r\nyWVMNa8WkpatUM42IuJoXuaCt0i2g85UdffHGK9EqyeN8cXik98bVYzgBFmsklpE\r\nh7UFAw/+zhyrmSD2JVtzA2vHGQzcOq36MaWL/WhizSX9mfdlPp6IvEtT4xVv4tdv\r\nU0TZEBKQMT+geK1XmesWIrTYZjLsQvnjFt31mqXr/xQVE9SE4OGHp5IF+ErVYVH5\r\nqE5zN1ECgYEA9p8j0gsmk1ZF1AVr3LkDwLBE1nZiAUXGR2NAOaIGFm9Yy031SJxU\r\n2HZ4ROhoeztwyEx0l5zGSnguRWeVQZLEyj3EdmcGUr7hUnYAIzdVT3a1fkLWGmAV\r\nRHiR05QohVPc+BJgDRUfn1WQ49oBgNpzKfbcTuQgn2leZnoi513ZhcMCgYEAw7F5\r\nGfX3MiFyIlhZaG58oWY6HXYU18ZmIg06ao93TF5qwAJkRy1N1P+OGkGYQ/JLCmti\r\ndtw1XvJlVz/U2HvwFceXrO4jT022l0yDCuH/P7eHkdTu/WTXSsYBH/Zo/ROhjJTR\r\nCOEU3iKRZIGt4AZ/hsoy0o1AarTR8BQAfL6f4ukCgYEA1GlQstJD0VbXIbvhoOQB\r\nZW7se0LPOoVcN5Q2du0kDSKt+b0VbAqp0R6Ii+EYTDtv8jRXn1W6O92zDLggh6/f\r\nqsj0c35cpdwduaZEjBBWe/CkdTEfsuvapXSrNO5A0ETg5xD8hYgSCmvqNTVJYi/E\r\nTPp/2b+piX5+V7E5YOzHy17JPYOl9urqlgTsO\r\niJGkp6ZUb0A+=\r\n-----END RSA PRIVATE KEY-----\r\n',
      cardDetails:
        'GUWjWnILPFl1/wIsCo9yYYAmYeyCzz05X2i2gboM4iWVB7Z44v6e8Tu6GE0l/DOGjEBei6t0qZQ3xWM2GEM5NZco8bbFDicbMRkIErd8UFxVJZDX8acjeuxavJuCCnmtbO5sbAFfJRQqN1UB3BFCTV4+w2S1SPy47SKdghiyW7bWlyHV95ZG/Va3I34eooBbYenVX7d6JE/x6DkuVXa1ajfLrNGohdpRIl3ldUGkx236xGWuOfiB/UGbum2Mfq6haQmuEPEtgzDL0iYSLjlNwShzLsF+0MkEjB9BXAtCAja+2v6lfTEy9rOev3sN1pyncOUJteBnezc3FFoySGfxnw==',
      cardLastFour: '1524',
      merchantCode: 'CUS__CqzQfnO94_u9dZhM1aX7',
      freqTransCard: true,
      cardType: 'MASTERCARD',
      cardId: 'R1PgSo1Nqz0B',
      cardName: 'Stanley Omeje',
    },
  ],
};

const useGetPaymentCards = () => {
  // For mock implementation
  const mockMutate = async () => {
    return Promise.resolve(mockData);
  };

  // Uncomment this when API is ready
  /*
  const fetcher = async () => {
    const response = await overview.paymentCards();

    if (!response) {
      console.log({ response });
      return undefined;
    }
    return response;
  };

  const { data, mutate, isLoading } = useSWR(
    [API.routes.overview.paymentCards], 
    fetcher
  );
  */

  return {
    data: mockData,
    mutate: mockMutate,
    isLoading: false,
  };
};

export default useGetPaymentCards;
