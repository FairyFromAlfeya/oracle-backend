export const dexPairAbi = {
  'ABI version': 2,
  version: '2.2',
  header: ['pubkey', 'time', 'expire'],
  functions: [
    {
      name: 'constructor',
      inputs: [],
      outputs: [],
    },
    {
      name: 'getRoot',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'dex_root', type: 'address' }],
    },
    {
      name: 'getTokenRoots',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        { name: 'left', type: 'address' },
        { name: 'right', type: 'address' },
        { name: 'lp', type: 'address' },
      ],
    },
    {
      name: 'getTokenWallets',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        { name: 'left', type: 'address' },
        { name: 'right', type: 'address' },
        { name: 'lp', type: 'address' },
      ],
    },
    {
      name: 'getVersion',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'version', type: 'uint32' }],
    },
    {
      name: 'getPoolType',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'uint8' }],
    },
    {
      name: 'getVault',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'dex_vault', type: 'address' }],
    },
    {
      name: 'getVaultWallets',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        { name: 'left', type: 'address' },
        { name: 'right', type: 'address' },
      ],
    },
    {
      name: 'setFeeParams',
      inputs: [
        {
          components: [
            { name: 'denominator', type: 'uint128' },
            { name: 'pool_numerator', type: 'uint128' },
            { name: 'beneficiary_numerator', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
            { name: 'threshold', type: 'map(address,uint128)' },
          ],
          name: 'params',
          type: 'tuple',
        },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'getFeeParams',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        {
          components: [
            { name: 'denominator', type: 'uint128' },
            { name: 'pool_numerator', type: 'uint128' },
            { name: 'beneficiary_numerator', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
            { name: 'threshold', type: 'map(address,uint128)' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'getAccumulatedFees',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'accumulatedFees', type: 'uint128[]' }],
    },
    {
      name: 'withdrawBeneficiaryFee',
      inputs: [{ name: 'send_gas_to', type: 'address' }],
      outputs: [],
    },
    {
      name: 'isActive',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [{ name: 'value0', type: 'bool' }],
    },
    {
      name: 'getBalances',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        {
          components: [
            { name: 'lp_supply', type: 'uint128' },
            { name: 'left_balance', type: 'uint128' },
            { name: 'right_balance', type: 'uint128' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'buildExchangePayload',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
        { name: 'expected_amount', type: 'uint128' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildDepositLiquidityPayload',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildWithdrawLiquidityPayload',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'buildCrossPairExchangePayload',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
        { name: 'expected_amount', type: 'uint128' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: 'steps',
          type: 'tuple[]',
        },
      ],
      outputs: [{ name: 'value0', type: 'cell' }],
    },
    {
      name: 'onAcceptTokensTransfer',
      inputs: [
        { name: 'token_root', type: 'address' },
        { name: 'tokens_amount', type: 'uint128' },
        { name: 'sender_address', type: 'address' },
        { name: 'sender_wallet', type: 'address' },
        { name: 'original_gas_to', type: 'address' },
        { name: 'payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'expectedDepositLiquidity',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'left_amount', type: 'uint128' },
        { name: 'right_amount', type: 'uint128' },
        { name: 'auto_change', type: 'bool' },
      ],
      outputs: [
        {
          components: [
            { name: 'step_1_left_deposit', type: 'uint128' },
            { name: 'step_1_right_deposit', type: 'uint128' },
            { name: 'step_1_lp_reward', type: 'uint128' },
            { name: 'step_2_left_to_right', type: 'bool' },
            { name: 'step_2_right_to_left', type: 'bool' },
            { name: 'step_2_spent', type: 'uint128' },
            { name: 'step_2_fee', type: 'uint128' },
            { name: 'step_2_received', type: 'uint128' },
            { name: 'step_3_left_deposit', type: 'uint128' },
            { name: 'step_3_right_deposit', type: 'uint128' },
            { name: 'step_3_lp_reward', type: 'uint128' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'depositLiquidity',
      inputs: [
        { name: 'call_id', type: 'uint64' },
        { name: 'left_amount', type: 'uint128' },
        { name: 'right_amount', type: 'uint128' },
        { name: 'expected_lp_root', type: 'address' },
        { name: 'auto_change', type: 'bool' },
        { name: 'account_owner', type: 'address' },
        { name: 'value6', type: 'uint32' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'expectedWithdrawLiquidity',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'lp_amount', type: 'uint128' },
      ],
      outputs: [
        { name: 'expected_left_amount', type: 'uint128' },
        { name: 'expected_right_amount', type: 'uint128' },
      ],
    },
    {
      name: 'withdrawLiquidity',
      inputs: [
        { name: 'call_id', type: 'uint64' },
        { name: 'lp_amount', type: 'uint128' },
        { name: 'expected_lp_root', type: 'address' },
        { name: 'account_owner', type: 'address' },
        { name: 'value4', type: 'uint32' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'expectedExchange',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'amount', type: 'uint128' },
        { name: 'spent_token_root', type: 'address' },
      ],
      outputs: [
        { name: 'expected_amount', type: 'uint128' },
        { name: 'expected_fee', type: 'uint128' },
      ],
    },
    {
      name: 'expectedSpendAmount',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: 'receive_amount', type: 'uint128' },
        { name: 'receive_token_root', type: 'address' },
      ],
      outputs: [
        { name: 'expected_amount', type: 'uint128' },
        { name: 'expected_fee', type: 'uint128' },
      ],
    },
    {
      name: 'exchange',
      inputs: [
        { name: 'call_id', type: 'uint64' },
        { name: 'spent_amount', type: 'uint128' },
        { name: 'spent_token_root', type: 'address' },
        { name: 'receive_token_root', type: 'address' },
        { name: 'expected_amount', type: 'uint128' },
        { name: 'account_owner', type: 'address' },
        { name: 'value6', type: 'uint32' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'crossPoolExchange',
      inputs: [
        { name: 'id', type: 'uint64' },
        { name: 'value1', type: 'uint32' },
        { name: 'value2', type: 'uint8' },
        { name: 'prev_pool_token_roots', type: 'address[]' },
        { name: 'spent_token_root', type: 'address' },
        { name: 'spent_amount', type: 'uint128' },
        { name: 'sender_address', type: 'address' },
        { name: 'original_gas_to', type: 'address' },
        { name: 'deploy_wallet_grams', type: 'uint128' },
        { name: 'payload', type: 'cell' },
        { name: 'notify_success', type: 'bool' },
        { name: 'success_payload', type: 'cell' },
        { name: 'notify_cancel', type: 'bool' },
        { name: 'cancel_payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'checkPair',
      inputs: [
        { name: 'account_owner', type: 'address' },
        { name: 'value1', type: 'uint32' },
      ],
      outputs: [],
    },
    {
      name: 'upgrade',
      inputs: [
        { name: 'code', type: 'cell' },
        { name: 'new_version', type: 'uint32' },
        { name: 'new_type', type: 'uint8' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'onTokenWallet',
      inputs: [{ name: 'wallet', type: 'address' }],
      outputs: [],
    },
    {
      name: 'onVaultTokenWallet',
      inputs: [{ name: 'wallet', type: 'address' }],
      outputs: [],
    },
    {
      name: 'liquidityTokenRootDeployed',
      inputs: [
        { name: 'lp_root_', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'liquidityTokenRootNotDeployed',
      inputs: [
        { name: 'value0', type: 'address' },
        { name: 'send_gas_to', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'setOracleOptions',
      inputs: [
        {
          components: [
            { name: 'minInterval', type: 'uint8' },
            { name: 'minRateDeltaNumerator', type: 'uint128' },
            { name: 'minRateDeltaDenominator', type: 'uint128' },
            { name: 'cardinality', type: 'uint16' },
          ],
          name: '_newOptions',
          type: 'tuple',
        },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'getOracleOptions',
      inputs: [{ name: 'answerId', type: 'uint32' }],
      outputs: [
        {
          components: [
            { name: 'minInterval', type: 'uint8' },
            { name: 'minRateDeltaNumerator', type: 'uint128' },
            { name: 'minRateDeltaDenominator', type: 'uint128' },
            { name: 'cardinality', type: 'uint16' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
    },
    {
      name: 'removeLastNPoints',
      inputs: [
        { name: '_count', type: 'uint16' },
        { name: '_remainingGasTo', type: 'address' },
      ],
      outputs: [],
    },
    {
      name: 'getObservation',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: '_timestamp', type: 'uint32' },
      ],
      outputs: [
        {
          components: [
            { name: 'timestamp', type: 'uint32' },
            { name: 'price0To1Cumulative', type: 'uint256' },
            { name: 'price1To0Cumulative', type: 'uint256' },
          ],
          name: 'value0',
          type: 'optional(tuple)',
        },
      ],
    },
    {
      name: 'observation',
      inputs: [
        { name: '_timestamp', type: 'uint32' },
        { name: '_payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'getRate',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: '_fromTimestamp', type: 'uint32' },
        { name: '_toTimestamp', type: 'uint32' },
      ],
      outputs: [
        {
          components: [
            { name: 'price0To1', type: 'uint256' },
            { name: 'price1To0', type: 'uint256' },
            { name: 'fromTimestamp', type: 'uint32' },
            { name: 'toTimestamp', type: 'uint32' },
          ],
          name: 'value0',
          type: 'optional(tuple)',
        },
        { name: 'value1', type: 'uint128[]' },
      ],
    },
    {
      name: 'rate',
      inputs: [
        { name: '_fromTimestamp', type: 'uint32' },
        { name: '_toTimestamp', type: 'uint32' },
        { name: '_callbackTo', type: 'address' },
        { name: '_payload', type: 'cell' },
      ],
      outputs: [],
    },
    {
      name: 'getExpectedAmountByTWAP',
      inputs: [
        { name: 'answerId', type: 'uint32' },
        { name: '_amount', type: 'uint128' },
        { name: '_tokenRoot', type: 'address' },
        { name: '_fromTimestamp', type: 'uint32' },
        { name: '_toTimestamp', type: 'uint32' },
      ],
      outputs: [{ name: 'value0', type: 'uint128' }],
    },
    {
      name: 'platform_code',
      inputs: [],
      outputs: [{ name: 'platform_code', type: 'cell' }],
    },
  ],
  data: [],
  events: [
    {
      name: 'OracleInitialized',
      inputs: [
        {
          components: [
            { name: 'timestamp', type: 'uint32' },
            { name: 'price0To1Cumulative', type: 'uint256' },
            { name: 'price1To0Cumulative', type: 'uint256' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'OracleUpdated',
      inputs: [
        {
          components: [
            { name: 'timestamp', type: 'uint32' },
            { name: 'price0To1Cumulative', type: 'uint256' },
            { name: 'price1To0Cumulative', type: 'uint256' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'OracleOptionsUpdated',
      inputs: [
        {
          components: [
            { name: 'minInterval', type: 'uint8' },
            { name: 'minRateDeltaNumerator', type: 'uint128' },
            { name: 'minRateDeltaDenominator', type: 'uint128' },
            { name: 'cardinality', type: 'uint16' },
          ],
          name: 'value0',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'PairCodeUpgraded',
      inputs: [
        { name: 'version', type: 'uint32' },
        { name: 'pool_type', type: 'uint8' },
      ],
      outputs: [],
    },
    {
      name: 'FeesParamsUpdated',
      inputs: [
        {
          components: [
            { name: 'denominator', type: 'uint128' },
            { name: 'pool_numerator', type: 'uint128' },
            { name: 'beneficiary_numerator', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
            { name: 'threshold', type: 'map(address,uint128)' },
          ],
          name: 'params',
          type: 'tuple',
        },
      ],
      outputs: [],
    },
    {
      name: 'DepositLiquidity',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'owner', type: 'address' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: 'tokens',
          type: 'tuple[]',
        },
        { name: 'lp', type: 'uint128' },
      ],
      outputs: [],
    },
    {
      name: 'WithdrawLiquidity',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'owner', type: 'address' },
        { name: 'lp', type: 'uint128' },
        {
          components: [
            { name: 'amount', type: 'uint128' },
            { name: 'root', type: 'address' },
          ],
          name: 'tokens',
          type: 'tuple[]',
        },
      ],
      outputs: [],
    },
    {
      name: 'Exchange',
      inputs: [
        { name: 'sender', type: 'address' },
        { name: 'recipient', type: 'address' },
        { name: 'spentTokenRoot', type: 'address' },
        { name: 'spentAmount', type: 'uint128' },
        { name: 'receiveTokenRoot', type: 'address' },
        { name: 'receiveAmount', type: 'uint128' },
        {
          components: [
            { name: 'feeTokenRoot', type: 'address' },
            { name: 'pool_fee', type: 'uint128' },
            { name: 'beneficiary_fee', type: 'uint128' },
            { name: 'beneficiary', type: 'address' },
          ],
          name: 'fees',
          type: 'tuple[]',
        },
      ],
      outputs: [],
    },
    {
      name: 'Sync',
      inputs: [
        { name: 'reserves', type: 'uint128[]' },
        { name: 'lp_supply', type: 'uint128' },
      ],
      outputs: [],
    },
  ],
  fields: [
    { name: '_pubkey', type: 'uint256' },
    { name: '_timestamp', type: 'uint64' },
    { name: '_constructorFlag', type: 'bool' },
    { name: 'platform_code', type: 'cell' },
    {
      components: [
        { name: 'price0To1Cumulative', type: 'uint256' },
        { name: 'price1To0Cumulative', type: 'uint256' },
      ],
      name: '_points',
      type: 'map(uint32,tuple)',
    },
    { name: '_length', type: 'uint16' },
    {
      components: [
        { name: 'minInterval', type: 'uint8' },
        { name: 'minRateDeltaNumerator', type: 'uint128' },
        { name: 'minRateDeltaDenominator', type: 'uint128' },
        { name: 'cardinality', type: 'uint16' },
      ],
      name: '_options',
      type: 'tuple',
    },
    { name: 'root', type: 'address' },
    { name: 'vault', type: 'address' },
    { name: 'active', type: 'bool' },
    { name: 'current_version', type: 'uint32' },
    { name: 'left_root', type: 'address' },
    { name: 'right_root', type: 'address' },
    { name: 'lp_wallet', type: 'address' },
    { name: 'left_wallet', type: 'address' },
    { name: 'right_wallet', type: 'address' },
    { name: 'vault_left_wallet', type: 'address' },
    { name: 'vault_right_wallet', type: 'address' },
    { name: 'lp_root', type: 'address' },
    { name: 'lp_supply', type: 'uint128' },
    { name: 'left_balance', type: 'uint128' },
    { name: 'right_balance', type: 'uint128' },
    {
      components: [
        { name: 'denominator', type: 'uint128' },
        { name: 'pool_numerator', type: 'uint128' },
        { name: 'beneficiary_numerator', type: 'uint128' },
        { name: 'beneficiary', type: 'address' },
        { name: 'threshold', type: 'map(address,uint128)' },
      ],
      name: 'fee',
      type: 'tuple',
    },
    { name: 'accumulated_left_fee', type: 'uint128' },
    { name: 'accumulated_right_fee', type: 'uint128' },
  ],
} as const;
