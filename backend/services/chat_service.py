import asyncio
from typing import Dict, List, Any
import config
from services.mem0_service import Mem0Service
from services.product_search import ProductSearchService

class ChatService:
    """Service for handling intelligent chat interactions with Mem0 and Tavily"""
    
    def __init__(self):
        self.conversation_history = {}
        
        # Initialize Mem0 service
        try:
            self.mem0_service = Mem0Service()
            self.mem0_enabled = True
            print("ChatService: Mem0 service enabled")
        except Exception as e:
            print(f"ChatService: Mem0 service not available: {str(e)}")
            self.mem0_service = None
            self.mem0_enabled = False
        
        # Initialize product search
        self.product_search = ProductSearchService()
    
    async def handle_chat_message(self, user_id: str, message: str, conversation_history: List[Dict] = None) -> Dict[str, Any]:
        """Handle chat message with intelligent responses using Mem0 and Tavily"""
        
        try:
            message_lower = message.lower()
            
            # Get user preferences from Mem0
            user_preferences = {}
            if self.mem0_enabled and self.mem0_service:
                try:
                    user_preferences = await self.mem0_service.get_user_preferences(user_id)
                    print(f"Retrieved user preferences: {user_preferences}")
                except Exception as e:
                    print(f"Error getting user preferences: {str(e)}")
            
            # Determine response type and generate response
            if any(word in message_lower for word in ["hello", "hi", "hey"]):
                response = await self._generate_greeting_response(user_id, user_preferences)
                
            elif any(word in message_lower for word in ["help", "what can you do"]):
                response = await self._generate_help_response(user_preferences)
                
            elif any(word in message_lower for word in ["furniture", "chair", "sofa", "table", "bed", "lamp", "lighting", "decor", "plants", "rug", "curtains", "mirror"]):
                response = await self._handle_product_inquiry(user_id, message, user_preferences)
                
            elif any(word in message_lower for word in ["color", "paint", "wall"]):
                response = await self._handle_color_inquiry(user_id, message, user_preferences)
                
            elif any(word in message_lower for word in ["budget", "cheap", "affordable", "expensive", "price"]):
                response = await self._handle_budget_inquiry(user_id, message, user_preferences)
                
            elif any(word in message_lower for word in ["room", "bedroom", "living room", "kitchen", "bathroom"]):
                response = await self._handle_room_inquiry(user_id, message, user_preferences)
                
            else:
                response = await self._generate_general_response(user_id, message, user_preferences)
            
            # Learn from this interaction
            if self.mem0_enabled and self.mem0_service:
                try:
                    await self.mem0_service.learn_from_interaction(user_id, "chat_message", {
                        "message": message,
                        "response_type": "chat_response"
                    })
                except Exception as e:
                    print(f"Error learning from interaction: {str(e)}")
            
            return {
                "response": response,
                "suggested_actions": [],
                "user_preferences_used": bool(user_preferences),
                "mem0_enabled": self.mem0_enabled
            }
            
        except Exception as e:
            print(f"Error in chat service: {str(e)}")
            return {
                "response": "Sorry, I'm having trouble right now. Please try again!",
                "suggested_actions": [],
                "user_preferences_used": False,
                "mem0_enabled": False
            }
    
    async def _generate_greeting_response(self, user_id: str, user_preferences: Dict) -> str:
        """Generate personalized greeting based on user preferences"""
        
        base_greeting = "Hi there! I'm your AI home concierge. "
        
        if user_preferences.get("preferred_categories"):
            categories = ", ".join(user_preferences["preferred_categories"][:2])
            return f"{base_greeting}I see you're interested in {categories}. How can I help make your space more cozy today? 🏡✨"
        
        elif user_preferences.get("room_types_analyzed"):
            rooms = ", ".join(user_preferences["room_types_analyzed"][:2])
            return f"{base_greeting}I remember you've been working on your {rooms}. What would you like to improve today? 🏡✨"
        
        else:
            return f"{base_greeting}How can I help make your space more cozy today? 🏡✨"
    
    async def _generate_help_response(self, user_preferences: Dict) -> str:
        """Generate help response with personalized suggestions"""
        
        base_help = "I can help you with home decoration! You can upload photos of your rooms for personalized suggestions, or ask me about specific furniture, colors, or decor ideas."
        
        if user_preferences.get("preferred_categories"):
            categories = ", ".join(user_preferences["preferred_categories"][:3])
            return f"{base_help} I notice you're particularly interested in {categories}. What would you like to know?"
        
        return f"{base_help} What would you like to know?"
    
    async def _handle_product_inquiry(self, user_id: str, message: str, user_preferences: Dict) -> str:
        """Handle product-related inquiries with search results"""
        
        try:
            # Extract product type from message
            product_keywords = ["furniture", "chair", "sofa", "table", "bed", "lamp", "lighting", "decor", "plants", "rug", "curtains", "mirror"]
            product_type = None
            
            for keyword in product_keywords:
                if keyword in message.lower():
                    product_type = keyword
                    break
            
            if not product_type:
                product_type = "home decor"
            
            # Search for products using Tavily
            search_results = await self.product_search.search_specific_product(product_type, "home decor")
            
            # Generate response with search results
            response = f"Great choice! {product_type.title()} can really transform a space. "
            
            # Add personalized context based on preferences
            if user_preferences.get("preferred_styles"):
                styles = ", ".join(user_preferences["preferred_styles"][:2])
                response += f"Based on your {styles} style preferences, "
            
            response += f"here are some great {product_type} options I found:\n\n"
            
            # Add top 3 search results
            for i, product in enumerate(search_results[:3], 1):
                response += f"{i}. **{product['title']}** - {product['store']}\n"
                response += f"   {product['description'][:100]}...\n"
                response += f"   🔗 {product['url']}\n\n"
            
            response += f"Would you like me to search for something more specific, or do you have questions about any of these {product_type} options?"
            
            return response
            
        except Exception as e:
            print(f"Error handling product inquiry: {str(e)}")
            return f"I'd love to help you find great {product_type if 'product_type' in locals() else 'home decor'} options! Could you tell me more about what style or specific features you're looking for?"
    
    async def _handle_color_inquiry(self, user_id: str, message: str, user_preferences: Dict) -> str:
        """Handle color and paint inquiries"""
        
        response = "Colors can completely change the mood of a room! "
        
        if user_preferences.get("room_types_analyzed"):
            rooms = ", ".join(user_preferences["room_types_analyzed"][:2])
            response += f"For your {rooms}, "
        
        response += "are you looking for something calming, energizing, or cozy? "
        
        if user_preferences.get("preferred_styles"):
            styles = ", ".join(user_preferences["preferred_styles"][:2])
            response += f"I can suggest colors that work well with {styles} style. "
        
        response += "What room are you thinking of updating?"
        
        return response
    
    async def _handle_budget_inquiry(self, user_id: str, message: str, user_preferences: Dict) -> str:
        """Handle budget-related inquiries"""
        
        response = "I understand budget is important! There are great options at every price point. "
        
        if user_preferences.get("preferred_categories"):
            categories = ", ".join(user_preferences["preferred_categories"][:2])
            response += f"For {categories}, I can find options in different price ranges. "
        
        response += "What's your approximate budget range, and what type of items are you looking for?"
        
        return response
    
    async def _handle_room_inquiry(self, user_id: str, message: str, user_preferences: Dict) -> str:
        """Handle room-specific inquiries"""
        
        # Extract room type from message
        room_types = ["bedroom", "living room", "kitchen", "bathroom", "dining room", "office"]
        room_type = None
        
        for room in room_types:
            if room in message.lower():
                room_type = room
                break
        
        if room_type:
            response = f"Great! {room_type.title()}s are wonderful spaces to personalize. "
            
            if user_preferences.get("preferred_categories"):
                categories = ", ".join(user_preferences["preferred_categories"][:2])
                response += f"Based on your interest in {categories}, I can suggest some perfect additions. "
            
            response += f"What specific aspect of your {room_type} would you like to improve? Lighting, furniture, colors, or decor?"
        else:
            response = "I'd love to help you with your room! Which room are you thinking about - bedroom, living room, kitchen, or another space?"
        
        return response
    
    async def _generate_general_response(self, user_id: str, message: str, user_preferences: Dict) -> str:
        """Generate general response for other inquiries"""
        
        response = f"That's interesting! I'd love to help you with '{message}'. "
        
        if user_preferences.get("preferred_categories"):
            categories = ", ".join(user_preferences["preferred_categories"][:2])
            response += f"I know you're interested in {categories}. "
        
        response += "Could you tell me more about what you're looking for? Are you decorating a specific room or looking for particular items?"
        
        return response
    
    async def search_products_for_chat(self, user_id: str, query: str) -> Dict[str, Any]:
        """Search products for chat interface"""
        
        try:
            products = await self.product_search.search_specific_product(query, "home decor")
            
            return {
                "success": True,
                "products": products,
                "query": query
            }
            
        except Exception as e:
            print(f"Error searching products: {str(e)}")
            return {
                "success": False,
                "products": [],
                "query": query,
                "error": str(e)
            }
    
    async def save_chat_preference(self, user_id: str, preference_type: str, preference_value: str) -> bool:
        """Save user preference from chat"""
        
        try:
            if self.mem0_enabled and self.mem0_service:
                await self.mem0_service.learn_from_interaction(user_id, "preference_update", {
                    "preference_type": preference_type,
                    "preference_value": preference_value
                })
                return True
            else:
                print(f"Saving preference for {user_id}: {preference_type} = {preference_value}")
                return True
            
        except Exception as e:
            print(f"Error saving preference: {str(e)}")
            return False
