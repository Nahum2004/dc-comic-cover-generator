# 🎨 DC Comic Cover Generator

A Next.js application that generates custom DC comic-style cover art using AI. Simply enter a creative prompt and watch as the app creates stunning vintage comic book covers powered by Replicate's API and a fine-tuned LoRA model.

![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Replicate API](https://img.shields.io/badge/Replicate-API-orange?style=for-the-badge)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

## 📋 Project Overview

The DC Comic Cover Generator is a web application that transforms text prompts into professional-looking comic book covers. Built with Next.js 15 and powered by Replicate's AI API, it uses a custom fine-tuned LoRA model (`resilientcoders/calvin-comic-cover`) to generate images that capture the essence of classic DC comic book aesthetics.

## ✨ Features

- **🎯 AI-Powered Generation**: Creates custom comic book covers from text prompts
- **🔤 Smart Prompting**: Uses the `dccomic` trigger word for optimal results
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **⚡ Stateless Architecture**: Fully serverless deployment with no file system dependencies
- **🛡️ Type-Safe**: Built with TypeScript for robust error handling
- **🔍 Comprehensive Logging**: Detailed diagnostic logging for debugging
- **🌐 Production Ready**: Deployed on Vercel with automatic scaling

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript 5.0
- **Styling**: CSS Modules with custom styling
- **AI API**: Replicate API with custom LoRA model + Stable Diffusion 1.5
- **Deployment**: Vercel (serverless)
- **Package Manager**: npm

## 🔧 Environment Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd comic-cover-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create environment file**
   Create a `.env.local` file in the root directory:
   ```env
   REPLICATE_API_TOKEN=your_replicate_api_token_here
   ```

4. **Get your Replicate API token**
   - Sign up at [replicate.com](https://replicate.com)
   - Navigate to your account settings
   - Generate a new API token
   - Copy the token to your `.env.local` file

## 🚀 Running Locally

1. **Start the development server**
   ```bash
   npm run dev
   ```

2. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

3. **Generate your first cover**
   - Enter a creative prompt (e.g., "superman flying over metropolis")
   - The app automatically prepends `dccomic` for optimal results
   - Wait for the AI to generate your custom comic cover

## 🌐 Deployment

This application is designed for **stateless deployment** on Vercel:

- **No file system writes**: Images are returned as base64 data URLs
- **Serverless architecture**: Scales automatically with demand
- **Zero configuration**: Deploys directly from GitHub

### Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard:
   - `REPLICATE_API_TOKEN`: Your Replicate API token
3. **Deploy**: Vercel automatically builds and deploys your app

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to production
vercel --prod
```

## 🎨 Usage Examples

Try these prompts for best results:

- `superman flying over metropolis at sunset`
- `batman crouched on gotham city rooftops`
- `wonder woman defending themyscira`
- `flash running through central city`
- `green lantern creating constructs in space`

**Note**: The app automatically prepends `dccomic` to your prompt for optimal model performance.

## 📁 Project Structure

```
comic-cover-app/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint for image generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout with metadata
│   └── page.tsx                  # Main application page
├── public/                       # Static assets
├── .env.local                    # Environment variables (not tracked)
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🔍 API Endpoints

### POST `/api/generate`

Generates a comic book cover from a text prompt.

**Request Body:**
```json
{
  "prompt": "superman flying over city"
}
```

**Response:**
```json
{
  "imageUrl": "data:image/webp;base64,iVBORw0KGgoAAAANSUhEUgAA..."
}
```

## 🛡️ Error Handling

The application includes comprehensive error handling:

- **API Token Validation**: Ensures Replicate API token is configured
- **Input Validation**: Validates prompt input
- **Network Error Handling**: Graceful handling of API failures
- **Detailed Logging**: Extensive diagnostic logging for debugging

## 📊 Performance

- **Fast Generation**: Optimized for quick image generation
- **Efficient Rendering**: Base64 data URLs for instant display
- **Minimal Bundle**: Optimized build with tree shaking
- **CDN Delivery**: Vercel's global CDN for fast loading

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **AI Model**: Fine-tuned LoRA model trained under the Resilient Coders AI Fellowship
- **Model Training**: Custom training on DC comic book cover dataset
- **API**: Powered by [Replicate](https://replicate.com)
- **Framework**: Built with [Next.js](https://nextjs.org)
- **Deployment**: Hosted on [Vercel](https://vercel.com)

## 🔗 Links

- **Live Demo**: [View the deployed application](https://dc-comic-cover-generator-lm8kmroee.vercel.app)
- **Replicate Model**: `resilientcoders/calvin-comic-cover`
- **Documentation**: [Next.js Docs](https://nextjs.org/docs)
- **Replicate API**: [Replicate Documentation](https://replicate.com/docs)

---

