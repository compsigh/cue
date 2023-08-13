<a href="https://cue.study">
  <img alt="Cue banner" src="https://app.cue.study/banner.png">
  <h1 align="center">Cue</h1>
</a>

<p align="center">
  Study with AI-powered Active Recall
</p>

<p align="center">
  <a href="https://cue.study"><strong>Learn More</strong></a> ·
  <a href="https://docs.cue.study"><strong>Docs</strong></a> ·
  <a href="https://app.cue.study"><strong>Live Beta</strong></a> <em>(limited)</em> ·
  <a href="#contributing"><strong>Contributing</strong></a>
</p>
<br/>

## Features

- Converts notes into Active Recall questions
- Currently supports text pasting, with Google Docs and Notion coming soon™

## Stack

- [React](https://react.dev)
- [Next.js](https://nextjs.org)
- [Sass](https://sass-lang.com)
- [NextAuth.js](https://github.com/nextauthjs/next-auth)
- [Vercel KV](https://vercel.com/docs/storage/vercel-kv)
- [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions)

## Contributing

Contributions are welcome and much appreciated! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

### Getting set up

Setting up your own instance of Cue can be done in a few steps. We're working on simplifying this process, and are open to suggestions.

First, clone the repo. Then, create a `.env.development.local` file with the following keys:

```text
# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET // generate with `openssl rand -base64 32`

# Google OAuth
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET

# OpenAI
OPENAI_API_KEY

# Vercel KV
KV_URL
KV_REST_API_URL
KV_REST_API_TOKEN
KV_REST_API_READ_ONLY_TOKEN
```

This will require you to create your own Google OAuth app, generate your own OpenAI API key, and set up your own Vercel KV database.

When you're ready, run `npm run dev` to start the development server.

Your instance of Cue should now be running on [localhost:3000](http://localhost:3000/).
