# 🎨 DC Comic Cover Generator

A Next.js 15 application that generates custom DC comic-style cover art using AI. Simply enter a creative prompt and watch as the app creates stunning vintage comic book covers powered by Replicate's API and a fine-tuned LoRA model.

![DC Comic Cover Generator](https://img.shields.io/badge/Next.js-15.5.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Replicate API](https://img.shields.io/badge/Replicate-API-orange?style=for-the-badge)

## 📋 Overview

The DC Comic Cover Generator is a web application that transforms text prompts into professional-looking comic book covers. Built with Next.js 15 and powered by Replicate's AI API, it uses a custom fine-tuned LoRA model to generate images that capture the essence of classic DC comic book aesthetics.

### 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Inline CSS with modern design
- **AI Integration**: Replicate API
- **Model**: Custom fine-tuned LoRA model (`resilientcoders/calvin-comic-cover`)
- **Image Processing**: Binary data handling and WebP format support

## ✨ Features

- 🎯 **Intuitive Prompt Interface**: Simple text input with placeholder examples
- 🚀 **Real-time Image Generation**: Fast AI-powered comic cover creation
- 🎨 **DC Comic Style**: Authentic vintage comic book aesthetic
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- ⚡ **Error Handling**: Comprehensive error messages and loading states
- 🖼️ **High-Quality Output**: Generates crisp WebP images (70-100KB)
- 🔄 **File-based Storage**: Images saved locally for optimal performance
- 🎭 **Trigger Word Support**: Use "dccomic" in prompts for best results

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Replicate API account and token

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd comic-cover-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```bash
   touch .env.local
   ```
   
   Add your Replicate API token:
   ```env
   REPLICATE_API_TOKEN=your_replicate_token_here
   ```

4. **Get your Replicate API token**
   - Sign up at [replicate.com](https://replicate.com)
   - Go to your account settings
   - Generate a new API token
   - Copy the token (starts with `r8_`)

## 🎮 Usage

### Development Server

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Generating Comic Covers

1. **Enter a creative prompt** in the input field
2. **Include the trigger word** `dccomic` for best results
3. **Click "Generate Cover"** and wait for the magic to happen
4. **View your generated comic cover** below the input

### Example Prompts

```
dccomic superman flying above city sunset
dccomic batman crouched menacingly on top of a tall building at night with the full moon behind
dccomic Wonder Woman fighting villains with lightning in the background
dccomic The Flash running through a futuristic cityscape
```

### Tips for Best Results

- Always include `dccomic` at the beginning of your prompt
- Be descriptive about the scene, characters, and mood
- Mention lighting conditions (sunset, night, dramatic lighting)
- Include environmental details (city, building, sky, etc.)

## 🚀 Deployment

### Deploy on Vercel (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add your environment variable:
     - Name: `REPLICATE_API_TOKEN`
     - Value: `your_replicate_token_here`
   - Click "Deploy"

3. **Your app will be live** at `https://your-app-name.vercel.app`

### Alternative Deployment Options

- **Netlify**: Similar process with environment variables
- **Railway**: Supports Node.js apps with easy deployment
- **DigitalOcean App Platform**: Full-stack deployment solution

## 🔧 Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Replicate API Configuration
REPLICATE_API_TOKEN=r8_your_token_here

# Optional: Next.js Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Environment Variable Details

| Variable | Description | Required | Example |
|----------|-------------|----------|---------|
| `REPLICATE_API_TOKEN` | Your Replicate API authentication token | ✅ Yes | `r8_Ezmyb97URNSPV23ylY4R2xBBdaAv4SC2CqVAz` |
| `NEXT_PUBLIC_APP_URL` | Base URL for your application | ❌ No | `https://your-app.vercel.app` |

## 🏗️ Project Structure

```
comic-cover-app/
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.ts          # API endpoint for image generation
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout component
│   └── page.tsx                  # Main application page
├── public/
│   └── images/                   # Generated images storage
├── .env.local                    # Environment variables
├── next.config.ts                # Next.js configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # This file
```

## 🔍 API Endpoints

### POST `/api/generate`

Generates a comic cover image from a text prompt.

**Request Body:**
```json
{
  "prompt": "dccomic superman flying above city sunset"
}
```

**Response:**
```json
{
  "imageUrl": "/images/generated-1760239678229.webp"
}
```

## 🎨 Customization

### Styling
The app uses inline CSS for styling. You can customize the appearance by modifying the `style` props in `app/page.tsx`.

### Model Configuration
The current model is `resilientcoders/calvin-comic-cover:5e26874f460dbb4e0a13e468d9c6e6bebcaf91962a78eea2b88e96bd3d4c9fef`. You can change this in `app/api/generate/route.ts`.

## 🐛 Troubleshooting

### Common Issues

**"API token not configured" error:**
- Ensure your `.env.local` file exists in the project root
- Verify the token starts with `r8_`
- Restart your development server after adding the token

**Images not displaying:**
- Check that the `public/images/` directory exists
- Verify file permissions
- Clear browser cache

**Generation fails:**
- Ensure your Replicate account has sufficient credits
- Check your internet connection
- Verify the model is accessible

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Credits

- **Replicate API** - For providing the AI image generation infrastructure
- **Next.js Team** - For the amazing React framework
- **DC Comics** - For the iconic comic book aesthetic inspiration
- **LoRA Model Creator** - For the fine-tuned comic cover model

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#-troubleshooting)
2. Open an issue on GitHub
3. Contact the development team

---

**Made with ❤️ for comic book enthusiasts and AI art lovers**
