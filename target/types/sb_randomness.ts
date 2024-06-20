/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/sb_randomness.json`.
 */
export type SbRandomness = {
  "address": "GHg2C6QNyeSogbQXfuqMCFuRSFEFxNUWpfVbehqnZjy2",
  "metadata": {
    "name": "sbRandomness",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "generate",
      "discriminator": [
        0,
        201,
        120,
        238,
        47,
        35,
        159,
        248
      ],
      "accounts": [
        {
          "name": "random",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  110,
                  100,
                  111,
                  109
                ]
              }
            ]
          }
        },
        {
          "name": "randomnessAccountData"
        }
      ],
      "args": [],
      "returns": "u64"
    },
    {
      "name": "initialize",
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
          "name": "random",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  97,
                  110,
                  100,
                  111,
                  109
                ]
              }
            ]
          }
        },
        {
          "name": "authority",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "random",
      "discriminator": [
        63,
        64,
        207,
        226,
        234,
        116,
        174,
        141
      ]
    }
  ],
  "events": [
    {
      "name": "initEvent",
      "discriminator": [
        224,
        129,
        78,
        87,
        58,
        43,
        94,
        127
      ]
    },
    {
      "name": "randomNumberEvent",
      "discriminator": [
        64,
        14,
        85,
        240,
        187,
        99,
        18,
        85
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "unauthorized",
      "msg": "Unauthorized access attempt."
    },
    {
      "code": 6001,
      "name": "switchboardRandomnessTooOld"
    },
    {
      "code": 6002,
      "name": "invalidDiscriminator"
    }
  ],
  "types": [
    {
      "name": "initEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "number",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "random",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "number",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "randomNumberEvent",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "value",
            "type": "u64"
          }
        ]
      }
    }
  ],
  "constants": [
    {
      "name": "randomTag",
      "type": "bytes",
      "value": "[114, 97, 110, 100, 111, 109]"
    }
  ]
};
