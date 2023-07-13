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

- React
- TypeScript — *soon™*
- [Sass](https://sass-lang.com) *(will probably migrate to Tailwind CSS)*
- [Next.js](https://nextjs.org) — *help with App Router migration [here][app-router-pr] much appreciated!*
- [NextAuth.js](https://github.com/nextauthjs/next-auth) for authentication
- MongoDB
- Vercel Edge Functions
- Vercel AI SDK for streaming chat UI — *soon™*

## Contributing

Contributions are welcome and much appreciated! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

### Getting set up

Setting up your own fully-functioning instance of Cue can be done in a few steps. We're working on simplifying this process, and are open to suggestions.

First, clone the repo. Then, create a `.env.local` file with the following keys:

```text
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET // generate with `openssl rand -base64 32`
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
OPENAI_API_KEY
DB_CONNECTION // MongoDB connection string
```

This will require you to create your own Google OAuth app, generate your own OpenAI API key, and set up your own MongoDB cluster.

When you're ready, run `yarn run dev` to start the development server.

Your instance of Cue should now be running on [localhost:3000](http://localhost:3000/).

[app-router-pr]: https://github.com/compsigh/cue/pull/10
