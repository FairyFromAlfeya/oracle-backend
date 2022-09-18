import { ClientProperties } from 'everscale-standalone-client';

export const everscaleConfig = (url: string): ClientProperties => ({
  connection: {
    id: 1,
    group: 'mainnet',
    type: 'graphql',
    data: {
      endpoints: [url],
      latencyDetectionInterval: 60000,
      local: false,
    },
  },
});
