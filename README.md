# Netflix+

![Image](link)

## Table of Contents

- [Introduction](#prerequisites)
- [Link to website demo](#installation)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the application](#running-the-application)
- [APIs](#links-to-used-apis)

## Introduction

Introducing the ultimate entertainment experience - a sleek and modern Netflix clone built using the latest technology. With a responsive fullstack design powered by Firebase, React framework Next.js and the TMDB REST API, this application offers a seamless browsing and streaming experience. In addition to streaming, you can also watch trailers, play videos, and add your favourites to a personal watchlist.

Authentication is made easy with Firebase, allowing you to securely access your account and personalize your experience. Styled using TailwindCSS, the interface is intuitive and easy on the eyes, making it a joy to browse through the vast collection of movies and TV shows.

But that's not all - the application also allows you to subscribe to monthly plans using Stripe, giving you access to even more content. And if you ever need to, you can easily cancel or change your subscription at any time.

## Link to website demo

[Netflix+](link)

## Tech Stack

- [TypeScript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Firebase](https://firebase.google.com/)
- [Zustand](https://github.com/pmndrs/zustand/)
- [Stripe](https://stripe.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## Prerequisites

Install the following prerequisites:

1. [Node.js 18.17.0 or higher](https://nodejs.org/en/)
2. [Visual Studio Code](https://code.visualstudio.com/download)

## Installation

### Backend

Connect your firebase, stripe and TMDB and add the API KEYs in the .env file

### Frontend

#### 1. Install dependencies

From the **root** directory run:

```bash
npm install
```

## Running the application

After supplying the API keys in the .env file, all you need to do is run the frontend:

```bash
cd frontend
npm run dev
```

## Links to used APIs

[Movie Database](https://www.themoviedb.org/)
