import {
  Client,
  PrivateKey,
  ThreadID,
  Where,
} from '@textile/hub';

interface TextileSetup {
  client: Client;
  threadId: ThreadID;
}

async function getTextileSetup(): Promise<TextileSetup> {
  try {
    const client = await Client.withKeyInfo(
      {
        key: 'baabdspt4stnkt5u37yno7jghue',
      },
    );

    await client.getToken(PrivateKey.fromString('bbaareqf2djgj327a2qis6tmi3uii7vyz636yveccxzmgzjnvpnxyzoisjstfyc2syyzpwt7ynppqg3ss23iwbffqvei3mzedhcd3uhnmfe4mu'));
    const threadId = ThreadID.fromString('bafk2fdyd7i5ixu44pbjn2dlinv4sp3tww4s7suvpbceyrpsbfkafuoq');

    return {
      client,
      threadId,
    };
  } catch (e) {
    console.error(e);
    throw new Error('Cannot setup Textile');
  }
}

async function saveProposal(
  proposal: Proposal,
) {
  try {
    const {
      client,
      threadId,
    } = await getTextileSetup();

    await client.create(
      threadId,
      'proposals',
      [proposal],
    );
  } catch (e) {
    console.error(e);
    throw new Error('Cannot save proposal');
  }
}

async function fetchProposalsByNetworkId(
  networkId: string,
): Promise<Proposal[]> {
  try {
    const {
      client,
      threadId,
    } = await getTextileSetup();

    const query = new Where('networkId').eq(networkId);
    const data = await client.find(threadId, 'proposals', query);
    return data as Proposal[];
  } catch (e) {
    console.error(e);
    throw new Error('Cannot fetch proposals by networkId');
  }
}

export {
  saveProposal,
  fetchProposalsByNetworkId,
};
