# Chat room backend API

Backend API for chat room

# Features
- auth
- room
- chat

# Set up

```
npm install
```

# Environment

NODE_ENV={{environment_name}}
PORT={{api_port}}
WSS_PORT={{websocket_port}}

JWT_SECRET_KEY={{secret_key}}
CORS_URL={{cors}}
DATABASE_URL={{database_connection_string}}

# Run
## Locally
1. Install dependencies: `npm i`
2. Migrate (only once): `npm run migrate:up`
3. Start the server: `npm run dev`
