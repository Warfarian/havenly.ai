🏡 Havenly.ai — Your AI-Powered Home Concierge
Havenly.ai is an intelligent home assistant that helps you transform your space with zero effort. Whether you're trying to declutter and sell unused items or breathe new life into your room, Havenly's autonomous agents handle everything — from analyzing your environment to generating listings, negotiating deals, and simulating deliveries. Just upload a photo or video, and Havenly turns your messy space into a cozy, optimized haven — powered by vision, memory, and automation.

🔁 Flow of Havenly.ai
🛋️ Buy Mode — Make My Room Cozy
User uploads a photo of their room.

Gemini Flash analyzes the image and identifies what could improve (e.g. lighting, seating).

BuyAgent fetches product suggestions using Tavily.

Cards with product images, prices, and descriptions are shown to the user.

On “Buy,” a simulated purchase is triggered.

Make.com sends a confirmation email and schedules a fake delivery.

Purchase details are stored in Memo and Appwrite.

📦 Sell Mode — Declutter My Space
User uploads a video of their room.

Gemini Flash returns a CSV of sellable items with timestamps.

OpenCV extracts exact video frames for each item.

Image URLs are uploaded to Supabase storage.

Each item is sent to DeepSeek V3 (via Nebius API) for:

Title and description generation

Listing content formatting

Listings with real images are shown to the user.

Clicking “Negotiate” opens a chat simulated by DeepSeek V3.

Memo tracks buyer history and negotiation outcomes.

A pickup time is suggested via SchedulerAgent.

Make.com adds the time to a calendar and sends reminders.