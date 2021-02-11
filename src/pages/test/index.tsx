import React, {
  useEffect,
  useState,
} from 'react';
import {
  Client,
  PrivateKey,
} from '@textile/hub';
import {
  Database,
} from '@textile/threaddb';

function Test() {
  const [user, setUser] = useState();

  useEffect(() => {
    async function setup() {
      try {
        const client = await Client.withKeyInfo(
          {
            key: 'bvxj4coxrrrjdxuodngbbk5zz4m',
          },
        );

        await client.getToken(PrivateKey.fromRandom());

        client.create()
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
