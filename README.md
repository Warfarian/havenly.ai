# 🏡 Havenly.ai - Your AI-Powered Home Concierge

Havenly.ai is an intelligent home assistant that helps you transform your space with zero effort. Whether you're looking to make your room more cozy or declutter by selling unused items, Havenly's autonomous agents handle everything — from analyzing your environment to generating listings, negotiating deals, and managing your space.

## ✨ Features

### 🛋️ Buy Mode - Make Your Room Cozy
- **AI Room Analysis**: Upload a photo and get personalized decoration suggestions
- **Smart Product Search**: AI finds relevant furniture and decor items using Tavily API
- **Intelligent Chat**: Ask questions and get personalized home decoration advice
- **Memory System**: Remembers your preferences across sessions using Mem0
- **Save & Track**: Save favorite items and track your decoration journey

### 📦 Sell Mode - Declutter Your Space
- **Video Processing**: Upload room walkthrough videos for automatic item detection
- **AI Item Recognition**: Identifies sellable items with timestamps and descriptions
- **Smart Pricing**: AI estimates market value for each item
- **Marketplace Integration**: Automatically posts to rental platforms like UseThis
- **Listing Generation**: Creates compelling descriptions and optimized images

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 18+
- npm or yarn

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/havenly.ai.git
   cd havenly.ai
   ```

2. **Set up Python environment**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```env
   # Required API Keys
   NEBIUS_API_KEY=your_nebius_api_key
   TAVILY_API_KEY=your_tavily_api_key
   MEM0_API_KEY=your_mem0_api_key
   APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
   APPWRITE_PROJECT_ID=your_project_id
   APPWRITE_API_KEY=your_appwrite_api_key
   APPWRITE_DATABASE_ID=your_database_id
   
   # eBay Integration (Optional)
   EBAY_APP_ID=your_ebay_app_id
   EBAY_CERT_ID=your_ebay_cert_id
   EBAY_DEV_ID=your_ebay_dev_id
   EBAY_SANDBOX_AUTH_TOKEN=your_sandbox_token
   EBAY_SANDBOX=true
   ```

4. **Start the backend server**
   ```bash
   python main.py
   ```
   The API will be available at `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

## 🏗️ Architecture

### Frontend (React + TypeScript)
- **Framework**: React 19 with TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Animations**: Framer Motion for smooth transitions
- **Build Tool**: Vite for fast development

### Backend (Python FastAPI)
- **Framework**: FastAPI for high-performance API
- **AI Services**: Nebius AI (DeepSeek-V3) for image analysis and text generation
- **Search**: Tavily API for product discovery
- **Memory**: Mem0 for user preference learning
- **Database**: Appwrite for data storage
- **Video Processing**: OpenCV for frame extraction and analysis

## 🔧 API Endpoints

### Buy Mode
- `POST /api/buy/analyze-room` - Analyze uploaded room photo
- `POST /api/buy/chat` - Handle intelligent chat messages
- `POST /api/buy/save-item` - Save product to user's list
- `GET /api/buy/saved-items/{user_id}` - Get user's saved items

### Sell Mode
- `POST /api/sell/upload-video` - Upload room video for processing
- `GET /api/sell/extraction-status/{job_id}` - Check processing status
- `POST /api/sell/post-to-marketplace` - Post items to marketplace
- `PUT /api/sell/update-item` - Edit item details

## 🤖 AI Services

### Nebius AI (DeepSeek-V3)
- Room analysis and object detection
- Natural language processing for chat
- Listing generation and pricing

### Tavily API
- Real-time product search
- Market data and pricing information

### Mem0
- User preference learning
- Conversation context maintenance
- Personalized recommendations

### Appwrite
- User data and preferences storage
- File storage for images and videos
- Authentication and sessions

## 🎨 Design Philosophy

- **Dark Theme**: Modern, premium aesthetic
- **Glass Morphism**: Translucent cards with backdrop blur
- **Micro-interactions**: Smooth hover effects and animations
- **Responsive**: Works seamlessly across all devices
- **AI-First**: Complex tasks handled automatically by AI

## 📁 Project Structure

```
havenly.ai/
├── backend/
│   ├── routes/
│   │   ├── buy_mode.py          # Buy mode API endpoints
│   │   └── sell_mode.py         # Sell mode API endpoints
│   ├── services/
│   │   ├── room_analyzer.py     # AI room analysis
│   │   ├── video_processor.py   # Video processing
│   │   ├── product_search.py    # Product search API
│   │   ├── chat_service.py      # Intelligent chat
│   │   ├── mem0_service.py      # Memory management
│   │   └── appwrite_service.py  # Database operations
│   ├── config.py                # Configuration and env vars
│   ├── main.py                  # FastAPI application
│   └── requirements.txt         # Python dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.tsx  # Main landing page
│   │   │   ├── BuyMode.tsx      # Buy mode interface
│   │   │   ├── SellMode.tsx     # Sell mode interface
│   │   │   └── SavedItemsPage.tsx # User's saved products
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx             # App entry point
│   ├── package.json             # Node.js dependencies
│   └── vite.config.ts           # Vite configuration
└── README.md                    # This file
```

## 🔑 Required API Keys

To use Havenly.ai, you'll need API keys from these services:

1. **Nebius AI** - For AI image analysis and text generation
   - Sign up at [Nebius AI Studio](https://studio.nebius.ai/)
   
2. **Tavily API** - For product search and market data
   - Get your key at [Tavily](https://tavily.com/)

3. **Mem0** (Optional) - For user memory and personalization
   - Register at [Mem0](https://mem0.ai/)

4. **Appwrite** (Optional) - For database and file storage
   - Set up at [Appwrite Cloud](https://cloud.appwrite.io/)

## 🚀 Deployment

### Backend Deployment
The FastAPI backend can be deployed to any cloud platform:

```bash
# Using uvicorn for production
uvicorn main:app --host 0.0.0.0 --port 8000
```

### Frontend Deployment
Build and deploy the React frontend:

```bash
npm run build
# Deploy the dist/ folder to your hosting platform
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/havenly.ai/issues) page
2. Create a new issue with detailed information
3. Join our community discussions

## 🔮 Future Enhancements

- **Real Marketplace Integration**: Connect to actual selling platforms
- **AR Visualization**: See furniture in your room before buying
- **Mobile App**: Native iOS/Android applications
- **Social Features**: Share room transformations with friends
- **Professional Services**: Connect with interior designers

---

**Made with ❤️ by the Havenly.ai team**

Transform your space with the power of AI! 🏡✨