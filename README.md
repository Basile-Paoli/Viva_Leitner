# Viva Leitner

A learning management system based on the Leitner spaced repetition technique.

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- npm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone git@github.com:Basile-Paoli/Viva_Leitner.git
   cd Viva_Leitner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   - Copy `.env.example` to `.env`

4. **Start the database**
   ```bash
   docker compose up -d
   ```

4. **Initialize the Database**
   ```bash
   npx drizzle-kit push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:3000`. 
