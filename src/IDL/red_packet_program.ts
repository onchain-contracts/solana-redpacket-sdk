/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/red_packet_program.json`.
 */
export type RedPacketProgram = {
  "address": "CuQx4xdm5tP8xwCrDCCP8YnDVokTCNqP3GuguGafsB5e",
  "metadata": {
    "name": "redPacketProgram",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "redPacket"
  },
  "instructions": [
    {
      "name": "claim",
      "docs": [
        "Claim from a red packet."
      ],
      "discriminator": [
        62,
        198,
        214,
        193,
        213,
        159,
        108,
        210
      ],
      "accounts": [
        {
          "name": "claimer",
          "writable": true,
          "signer": true
        },
        {
          "name": "claimAuthority",
          "writable": true,
          "signer": true,
          "optional": true
        },
        {
          "name": "global",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "userClaim",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  108,
                  97,
                  105,
                  109,
                  45,
                  114,
                  101,
                  99,
                  111,
                  114,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "redPacket"
              },
              {
                "kind": "account",
                "path": "claimer"
              }
            ]
          }
        },
        {
          "name": "redPacket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  45,
                  112,
                  97,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "params.id"
              }
            ]
          }
        },
        {
          "name": "redPacketTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "claimerTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "docs": [
            "用于普通SPL Token转账的程序"
          ],
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenProgram2022",
          "docs": [
            "用于Token-2022转账的SPL程序"
          ],
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "claimParams"
            }
          }
        }
      ]
    },
    {
      "name": "create",
      "docs": [
        "Creates a new red packet."
      ],
      "discriminator": [
        24,
        30,
        200,
        40,
        5,
        28,
        7,
        119
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "mint"
        },
        {
          "name": "redPacket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  45,
                  112,
                  97,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "params.id"
              }
            ]
          }
        },
        {
          "name": "creatorTokenAccount",
          "writable": true,
          "optional": true
        },
        {
          "name": "redPacketTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "redPacket"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "global",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "feeRecipient",
          "writable": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenProgram2022",
          "docs": [
            "用于代币转账的SPL程序2022"
          ],
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "createParams"
            }
          }
        }
      ]
    },
    {
      "name": "initialize",
      "docs": [
        "Creates the global state."
      ],
      "discriminator": [
        175,
        175,
        109,
        31,
        13,
        152,
        155,
        237
      ],
      "accounts": [
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "global",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    },
    {
      "name": "setActive",
      "docs": [
        "Sets the active status of a redpacket."
      ],
      "discriminator": [
        29,
        16,
        225,
        132,
        38,
        216,
        206,
        33
      ],
      "accounts": [
        {
          "name": "mint",
          "writable": true
        },
        {
          "name": "payer",
          "writable": true,
          "signer": true
        },
        {
          "name": "redPacket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  45,
                  112,
                  97,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ]
          }
        },
        {
          "name": "global",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "activeParams"
            }
          }
        }
      ]
    },
    {
      "name": "setGlobalCfg",
      "docs": [
        "Sets the global state parameters."
      ],
      "discriminator": [
        214,
        7,
        116,
        206,
        113,
        214,
        141,
        76
      ],
      "accounts": [
        {
          "name": "global",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setGlobalCfgParams"
            }
          }
        }
      ]
    },
    {
      "name": "setRedPacket",
      "docs": [
        "Sets the red packet configuration."
      ],
      "discriminator": [
        48,
        209,
        165,
        140,
        158,
        56,
        161,
        123
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "global",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "redPacket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  45,
                  112,
                  97,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "params.id"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "setRedPacketParams"
            }
          }
        }
      ]
    },
    {
      "name": "withdraw",
      "docs": [
        "Allows the admin to withdraw liquidity for a migration once the redpacket completes"
      ],
      "discriminator": [
        183,
        18,
        70,
        156,
        148,
        109,
        161,
        34
      ],
      "accounts": [
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator",
          "writable": true
        },
        {
          "name": "global",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  103,
                  108,
                  111,
                  98,
                  97,
                  108
                ]
              }
            ]
          }
        },
        {
          "name": "mint"
        },
        {
          "name": "redPacket",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  101,
                  100,
                  45,
                  112,
                  97,
                  99,
                  107,
                  101,
                  116
                ]
              },
              {
                "kind": "arg",
                "path": "params.id"
              }
            ]
          }
        },
        {
          "name": "redPacketTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "redPacket"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "creatorTokenAccount",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "creator"
              },
              {
                "kind": "const",
                "value": [
                  6,
                  221,
                  246,
                  225,
                  215,
                  101,
                  161,
                  147,
                  217,
                  203,
                  225,
                  70,
                  206,
                  235,
                  121,
                  172,
                  28,
                  180,
                  133,
                  237,
                  95,
                  91,
                  55,
                  145,
                  58,
                  140,
                  245,
                  133,
                  126,
                  255,
                  0,
                  169
                ]
              },
              {
                "kind": "account",
                "path": "mint"
              }
            ],
            "program": {
              "kind": "const",
              "value": [
                140,
                151,
                37,
                143,
                78,
                36,
                137,
                241,
                187,
                61,
                16,
                41,
                20,
                142,
                13,
                131,
                11,
                90,
                19,
                153,
                218,
                255,
                16,
                132,
                4,
                142,
                123,
                216,
                219,
                233,
                248,
                89
              ]
            }
          }
        },
        {
          "name": "associatedTokenProgram",
          "address": "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "tokenProgram2022",
          "docs": [
            "用于Token-2022转账的SPL程序"
          ],
          "address": "TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb"
        },
        {
          "name": "eventAuthority",
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  95,
                  95,
                  101,
                  118,
                  101,
                  110,
                  116,
                  95,
                  97,
                  117,
                  116,
                  104,
                  111,
                  114,
                  105,
                  116,
                  121
                ]
              }
            ]
          }
        },
        {
          "name": "program"
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": {
              "name": "withdrawParams"
            }
          }
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "claimRecord",
      "discriminator": [
        57,
        229,
        0,
        9,
        65,
        62,
        96,
        7
      ]
    },
    {
      "name": "global",
      "discriminator": [
        167,
        232,
        232,
        177,
        200,
        108,
        114,
        127
      ]
    },
    {
      "name": "redPacket",
      "discriminator": [
        51,
        197,
        171,
        232,
        223,
        81,
        121,
        248
      ]
    }
  ],
  "events": [
    {
      "name": "claimEvent",
      "discriminator": [
        93,
        15,
        70,
        170,
        48,
        140,
        212,
        219
      ]
    },
    {
      "name": "completeEvent",
      "discriminator": [
        95,
        114,
        97,
        156,
        212,
        46,
        152,
        8
      ]
    },
    {
      "name": "createEvent",
      "discriminator": [
        27,
        114,
        169,
        77,
        222,
        235,
        99,
        118
      ]
    },
    {
      "name": "setGlobalCfgEvent",
      "discriminator": [
        104,
        98,
        139,
        215,
        7,
        31,
        153,
        58
      ]
    },
    {
      "name": "withdrawEvent",
      "discriminator": [
        22,
        9,
        133,
        26,
        160,
        44,
        71,
        192
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "notInitialized",
      "msg": "The program is not initialized."
    },
    {
      "code": 6001,
      "name": "alreadyInitialized",
      "msg": "The program is already initialized."
    },
    {
      "code": 6002,
      "name": "redPacketNotActive",
      "msg": "Red packet is not active."
    },
    {
      "code": 6003,
      "name": "redPacketComplete",
      "msg": "The red packet has completed."
    },
    {
      "code": 6004,
      "name": "redPacketNotComplete",
      "msg": "The red packet has not completed."
    },
    {
      "code": 6005,
      "name": "invalidFee",
      "msg": "Invalid fee."
    },
    {
      "code": 6006,
      "name": "invalidFeeRecipient",
      "msg": "Invalid fee recipient."
    },
    {
      "code": 6007,
      "name": "insufficientFunds",
      "msg": "Insufficient Funds."
    },
    {
      "code": 6008,
      "name": "insufficientTokens",
      "msg": "Insufficient tokens."
    },
    {
      "code": 6009,
      "name": "invalidMaxClaims",
      "msg": "Invalid max claims."
    },
    {
      "code": 6010,
      "name": "invalidTotalAmount",
      "msg": "Invalid total amount."
    },
    {
      "code": 6011,
      "name": "invalidAuthority",
      "msg": "Invalid authority."
    },
    {
      "code": 6012,
      "name": "invalidClaimAuthority",
      "msg": "Invalid claim authority."
    },
    {
      "code": 6013,
      "name": "invalidWithdrawAuthority",
      "msg": "Invalid withdraw authority."
    },
    {
      "code": 6014,
      "name": "passwordRequired",
      "msg": "Password required."
    },
    {
      "code": 6015,
      "name": "invalidPassword",
      "msg": "Invalid password."
    },
    {
      "code": 6016,
      "name": "redPacketEmpty",
      "msg": "Red packet is empty."
    },
    {
      "code": 6017,
      "name": "alreadyClaimed",
      "msg": "Already claimed."
    },
    {
      "code": 6018,
      "name": "missingTokenAccount",
      "msg": "Missing token account."
    },
    {
      "code": 6019,
      "name": "invalidTokenAccount",
      "msg": "Invalid token account."
    },
    {
      "code": 6020,
      "name": "invalidMinAmountPerClaim",
      "msg": "Invalid min amount per claim."
    },
    {
      "code": 6021,
      "name": "arithmeticOverflow",
      "msg": "Arithmetic overflow."
    }
  ],
  "types": [
    {
      "name": "activeParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "active",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "claimEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "claimer",
            "type": "pubkey"
          },
          {
            "name": "redPacket",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "claimParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "password",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "claimRecord",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "redPacket",
            "type": "pubkey"
          },
          {
            "name": "claimer",
            "type": "pubkey"
          },
          {
            "name": "claimed",
            "type": "bool"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "completeEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "claimer",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "redPacket",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "createEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "redPacket",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "claimAuthority",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "memo",
            "type": "string"
          },
          {
            "name": "maxClaims",
            "type": "u32"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "createParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "memo",
            "type": {
              "option": "string"
            }
          },
          {
            "name": "maxClaims",
            "type": "u32"
          },
          {
            "name": "fixedAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "totalAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "claimAuthority",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "password",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "global",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "authority",
            "type": "pubkey"
          },
          {
            "name": "withdrawAuthority",
            "type": "pubkey"
          },
          {
            "name": "initialized",
            "type": "bool"
          },
          {
            "name": "feeRecipient",
            "type": "pubkey"
          },
          {
            "name": "createFee",
            "type": "u64"
          },
          {
            "name": "initialMaxClaims",
            "type": "u32"
          },
          {
            "name": "initialMinAmountPerClaim",
            "type": "u64"
          },
          {
            "name": "initialMaxTotalAmount",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "redPacket",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "maxClaims",
            "type": "u32"
          },
          {
            "name": "claims",
            "type": "u32"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "remainingAmount",
            "type": "u64"
          },
          {
            "name": "active",
            "type": "bool"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "complete",
            "type": "bool"
          },
          {
            "name": "minAmountPerClaim",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "fixedAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "claimAuthority",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "passwordHash",
            "type": {
              "option": {
                "array": [
                  "u8",
                  32
                ]
              }
            }
          },
          {
            "name": "memo",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "setGlobalCfgEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "feeRecipient",
            "type": "pubkey"
          },
          {
            "name": "createFee",
            "type": "u64"
          },
          {
            "name": "initialMaxTotalAmount",
            "type": "u64"
          },
          {
            "name": "initialMaxClaims",
            "type": "u32"
          },
          {
            "name": "initialMinAmountPerClaim",
            "type": "u64"
          },
          {
            "name": "withdrawAuthority",
            "type": "pubkey"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "setGlobalCfgParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createFee",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "feeRecipient",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "initialMaxTotalAmount",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "initialMaxClaims",
            "type": {
              "option": "u32"
            }
          },
          {
            "name": "initialMinAmountPerClaim",
            "type": {
              "option": "u64"
            }
          },
          {
            "name": "withdrawAuthority",
            "type": {
              "option": "pubkey"
            }
          }
        ]
      }
    },
    {
      "name": "setRedPacketParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "claimAuthority",
            "type": {
              "option": "pubkey"
            }
          },
          {
            "name": "password",
            "type": {
              "option": "string"
            }
          }
        ]
      }
    },
    {
      "name": "withdrawEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          },
          {
            "name": "redPacket",
            "type": "pubkey"
          },
          {
            "name": "mint",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "totalAmount",
            "type": "u64"
          },
          {
            "name": "maxClaims",
            "type": "u32"
          },
          {
            "name": "claims",
            "type": "u32"
          },
          {
            "name": "timestamp",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "withdrawParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "id",
            "type": "pubkey"
          }
        ]
      }
    }
  ]
};
