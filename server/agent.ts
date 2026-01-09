import { Room, RoomEvent, RemoteParticipant, RemoteTrack, RemoteTrackPublication } from 'livekit-client';
import { AccessToken } from 'livekit-server-sdk';
import 'dotenv/config';

const LIVEKIT_URL = process.env.LIVEKIT_URL;
const API_KEY = process.env.LIVEKIT_API_KEY;
const API_SECRET = process.env.LIVEKIT_API_SECRET;

if (!LIVEKIT_URL || !API_KEY || !API_SECRET) {
    console.error('Missing LIVEKIT_URL, LIVEKIT_API_KEY, or LIVEKIT_API_SECRET in .env.local');
    process.exit(1);
}

const ROOM_NAME = 'dev-room';
const AGENT_NAME = 'Local-Agent';

async function main() {
    console.log(`Starting Local Agent...`);
    console.log(`Connecting to ${LIVEKIT_URL}, Room: ${ROOM_NAME}`);

    // Create an Access Token for the Agent
    const at = new AccessToken(API_KEY, API_SECRET, {
        identity: 'agent_bot',
        name: AGENT_NAME,
    });
    at.addGrant({
        roomJoin: true,
        room: ROOM_NAME,
        canPublish: true,
        canSubscribe: true,
        canPublishData: true,
    });
    const token = await at.toJwt();

    // Connect to the Room using the Client SDK logic (running in Node via 'ws' polyfill usually handled by livekit-client or just standard Node env)
    // Note: livekit-client works in Node.js environments.

    const room = new Room();

    room.on(RoomEvent.Connected, () => {
        console.log('Agent Connected to Room!');
        publishGreeting(room);
    });

    room.on(RoomEvent.ParticipantConnected, (participant: RemoteParticipant) => {
        console.log(`Participant conneted: ${participant.identity}`);
        publishGreeting(room);
    });

    room.on(RoomEvent.Disconnected, () => {
        console.log('Agent Disconnected');
    });

    try {
        await room.connect(LIVEKIT_URL!, token);
        console.log('Agent successfully connected. Waiting for users...');
    } catch (error) {
        console.error('Failed to connect:', error);
    }
}

async function publishGreeting(room: Room) {
    // Simple chat message using Data Channel
    const strData = JSON.stringify({ message: "Hello! I am your local agent. I am listening." });
    const data = new TextEncoder().encode(strData);

    try {
        await room.localParticipant.publishData(data, { reliable: true });
        console.log('Sent greeting message');
    } catch (e) {
        console.error('Failed to send greeting', e);
    }
}

main();
