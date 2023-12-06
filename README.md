# MA-Bibliotheque

It is a project born out of a personal need - my wife's extensive book collection required a way to effectively organize and manage her books. Inspired by this necessity, we built an application that not only sorts books but also incorporates features like a rating system and note-taking capabilities.

## Motivation

The idea stemmed from my wife's passion for collecting books. Managing a large collection became challenging, prompting the creation of MA-Bibliotheque. It provides an intuitive interface to categorize, rate, and make notes about each book.

## Features

- **Book Organization**: Easily sort and categorize books based on various parameters.
- **Rating System**: Assign ratings to books for personal evaluation.
- **Note Taking**: Add and manage notes related to specific books for personal reference.

## Backend (Express TypeScript with PostgreSQL and Prisma)

### Prerequisites

- Node.js installed locally
- PostgreSQL installed and operational
- Prisma CLI globally installed (`npm install -g prisma`)

### Install dependencies:

```bash
npm install
```

## Configuration

1. Create a `.env` file in the backend directory and set the necessary environment variables:

```bash

DATABASE_URL=postgresql://db_name:PASSWD@localhost:PORT/

JWT_SECRET
JWT_REFRESH
WEBSITE_ACCESS
TOKEN_EXPIRY
PORT
NODE_ENV

AUTH_EMAIL
AUTH_PASSWORD
OAUTH_CLIENTID
OAUTH_CLIENT_SECRET
OAUTH_ACCESS_TOKEN
OAUTH_REFRESH_TOKEN
```
