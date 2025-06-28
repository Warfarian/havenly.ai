from fastapi import APIRouter, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from services.room_analyzer import RoomAnalyzer
from services.product_search import ProductSearchService
import asyncio

router = APIRouter(prefix="/api/buy", tags=["buy_mode"])

# Initialize services
room_analyzer = RoomAnalyzer()
product_search = ProductSearchService()

@router.post("/analyze-room")
async def analyze_room(file: UploadFile = File(...)):
    """Analyze uploaded room image and provide decoration suggestions"""
    
    # Validate file type
    if not file.content_type.startswith('image/'):
        raise HTTPException(status_code=400, detail="File must be an image")
    
    # Check file size (10MB limit)
    if file.size > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be less than 10MB")
    
    try:
        print(f"Processing file: {file.filename}, size: {file.size}, type: {file.content_type}")
        
        # Read image data
        image_data = await file.read()
        print(f"Image data read successfully, length: {len(image_data)}")
        
        # Analyze room
        print("Starting room analysis...")
        analysis = await room_analyzer.analyze_room_image(image_data)
        print(f"Room analysis completed: {analysis.get('room_type', 'unknown')}")
        
        # Search for products based on suggestions
        print("Starting product search...")
        products = await product_search.search_products(analysis['suggestions'])
        print(f"Product search completed, found {len(products)} products")
        
        return JSONResponse(content={
            "success": True,
            "analysis": analysis,
            "products": products,
            "message": "Room analyzed successfully! Here are some suggestions to make your space more cozy."
        })
        
    except Exception as e:
        print(f"Error in analyze_room: {str(e)}")
        print(f"Error type: {type(e)}")
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")

@router.post("/search-product")
async def search_product(product_name: str, category: str = ""):
    """Search for specific products"""
    try:
        products = await product_search.search_specific_product(product_name, category)
        
        return JSONResponse(content={
            "success": True,
            "products": products,
            "query": product_name
        })
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error searching products: {str(e)}")

@router.get("/suggestions/{room_type}")
async def get_room_suggestions(room_type: str):
    """Get general suggestions for a room type"""
    
    suggestions_db = {
        "living_room": [
            {"category": "lighting", "item": "floor lamps", "description": "Create ambient lighting", "priority": "high"},
            {"category": "textiles", "item": "throw pillows", "description": "Add comfort and color", "priority": "high"},
            {"category": "plants", "item": "potted plants", "description": "Bring nature indoors", "priority": "medium"}
        ],
        "bedroom": [
            {"category": "lighting", "item": "bedside lamps", "description": "Soft reading light", "priority": "high"},
            {"category": "textiles", "item": "cozy blankets", "description": "Layer textures for warmth", "priority": "high"},
            {"category": "decor", "item": "wall art", "description": "Personalize your space", "priority": "medium"}
        ],
        "kitchen": [
            {"category": "lighting", "item": "pendant lights", "description": "Task and ambient lighting", "priority": "high"},
            {"category": "decor", "item": "herb garden", "description": "Fresh herbs and greenery", "priority": "medium"},
            {"category": "textiles", "item": "kitchen rugs", "description": "Comfort and style", "priority": "low"}
        ]
    }
    
    suggestions = suggestions_db.get(room_type, [])
    
    if not suggestions:
        raise HTTPException(status_code=404, detail="Room type not found")
    
    return JSONResponse(content={
        "success": True,
        "room_type": room_type,
        "suggestions": suggestions
    })
