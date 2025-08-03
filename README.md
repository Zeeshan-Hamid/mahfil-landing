# Mahfil Landing Page

An AI-powered cultural events platform landing page with an integrated chatbot.

## Features

- **AI-Powered Chatbot**: Integrated OpenAI GPT-4o chatbot for event planning assistance
- **Responsive Design**: Mobile-first design with floating chatbot widget
- **Cultural Event Focus**: Specialized for cultural events and vendor matching
- **Modern UI**: Beautiful gradient design matching the app's theme

## Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env.local` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Chatbot Features

- **Desktop**: Bottom-right floating widget
- **Mobile**: Full-screen floating widget
- **AI Assistant**: Powered by OpenAI GPT-4o
- **Event Planning**: Specialized for cultural events and vendor matching
- **Real-time**: Instant responses with typing indicators

## Environment Variables

Required environment variables:

- `OPENAI_API_KEY`: Your OpenAI API key for the chatbot functionality

## Tech Stack

- Next.js 13
- React 18
- TypeScript
- Tailwind CSS
- OpenAI API
- Lucide React Icons

## Project Structure

```
mahfil-landing/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chatbot API endpoint
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx                  # Main landing page
├── components/
│   └── Chatbot.tsx              # Chatbot component
└── ...
```

## Chatbot Implementation

The chatbot is implemented with:

1. **API Route** (`app/api/chat/route.ts`): Handles OpenAI API calls
2. **Chatbot Component** (`components/Chatbot.tsx`): UI component with responsive design
3. **Integration**: Added to the main page for seamless user experience

The chatbot uses the same gradient theme as the main app and provides contextual assistance for event planning and cultural events. 