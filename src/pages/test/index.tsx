import React, {
  useEffect,
  useState,
} from 'react';
import {
  Client,
  PrivateKey,
  ThreadID,
  Where,
} from '@textile/hub';

function Test() {
  const [user, setUser] = useState();

  useEffect(() => {
    async function setup() {
      try {
        const client = await Client.withKeyInfo(
          {
            key: 'baabdspt4stnkt5u37yno7jghue',
          },
        );

        await client.getToken(PrivateKey.fromString('bbaareqf2djgj327a2qis6tmi3uii7vyz636yveccxzmgzjnvpnxyzoisjstfyc2syyzpwt7ynppqg3ss23iwbffqvei3mzedhcd3uhnmfe4mu'));
        const threadId = ThreadID.fromString('bafk2fdyd7i5ixu44pbjn2dlinv4sp3tww4s7suvpbceyrpsbfkafuoq');

        const proposal: Proposal = {
          _id: Date.now().toString(),
          initiator: '0x0DdbB775ED64836e99FEdA8fdf265437aC77b658',
          tokenIn: '0x9248c485b0B80f76DA451f167A8db30F33C70907',
          amountIn: '5000000000000000000',
          tokenOut: '0x7fc66500c84a76ad7e9c93437bfc5ac33e2ddae9',
          amountOut: '15000000000000000000',
          deliveryDate: '1615515360',
          expiryDate: '1613096160',
          sig: '0xbeefbeef',
          networkId: '4',
        };

        /*
        await client.newCollectionFromObject(threadId, proposal, {
          name: 'proposals',
        });
        */

        // await client.create(threadId, 'proposals', [proposal]);
        const proposals: Proposal[] = await client.find(threadId, 'proposals', {});
        console.log(proposals);

        const ids: string[] = [];

        for (let i = 0; i < proposals.length; i += 1) {
          // eslint-disable-next-line no-underscore-dangle
          ids.push(proposals[i]._id);
        }

        await client.delete(threadId, 'proposals', ids);
      } catch (e) {
        console.error(e);
      }
    }

    setup();
  }, []);

  return (
    <>

    </>
  );
}

export default Test;
