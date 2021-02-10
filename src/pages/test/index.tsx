import React, {
  useEffect,
  useState,
} from 'react';
import {
  Client,
  PrivateKey,
  UserAuth,
} from '@textile/hub';

function Test() {
  const [user, setUser] = useState();

  useEffect(() => {
    async function setup() {
      try {
        const user = await PrivateKey.fromRandom();
        // const client = await Client.withUserAuth(user);
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
