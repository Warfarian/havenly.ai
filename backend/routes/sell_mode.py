from fastapi import APIRouter, File, UploadFile, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from services.video_processor import VideoProcessor
from services.listing_generator import ListingGenerator
import asyncio
import uuid
from typing import Dict, List

router = APIRouter(prefix="/api/sell", tags=["sell_mode"])

# Initialize services
video_processor = VideoProcessor()
listing_generator = ListingGenerator()

# Store for tracking extraction jobs
extraction_jobs: Dict[str, Dict] = {}

@router.post("/upload-video")
async def upload_video(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    """Upload video and start object extraction process"""
    
    # Validate file type
    if not file.content_type.startswith('video/'):
        raise HTTPException(status_code=400, detail="File must be a video")
    
    # Check file size (100MB limit)
    if file.size > 100 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size must be less than 100MB")
    
    try:
        print(f"Processing video: {file.filename}, size: {file.size}, type: {file.content_type}")
        
        # Generate job ID
        job_id = str(uuid.uuid4())
        
        # Initialize job status
        extraction_jobs[job_id] = {
            "status": "processing",
            "progress": 0,
            "filename": file.filename,
            "items": [],
            "error": None
        }
        
        # Read video data
        video_data = await file.read()
        
        # Start background processing
        background_tasks.add_task(process_video_extraction, job_id, video_data, file.filename)
        
        return JSONResponse(content={
            "success": True,
            "job_id": job_id,
            "message": "Video upload started. Use the job ID to check extraction status."
        })
        
    except Exception as e:
        print(f"Error in upload_video: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing video: {str(e)}")

@router.get("/extraction-status/{job_id}")
async def get_extraction_status(job_id: str):
    """Check the status of video extraction job"""
    
    if job_id not in extraction_jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = extraction_jobs[job_id]
    
    return JSONResponse(content={
        "success": True,
        "job_id": job_id,
        "status": job["status"],
        "progress": job["progress"],
        "filename": job["filename"],
        "frames": job.get("frames", []),  # Return frames for manual review
        "items": job["items"],
        "error": job.get("error")
    })

@router.post("/generate-listings")
async def generate_listings(job_id: str):
    """Generate marketplace listings for extracted items"""
    
    if job_id not in extraction_jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = extraction_jobs[job_id]
    
    if job["status"] != "completed":
        raise HTTPException(status_code=400, detail="Extraction not completed yet")
    
    try:
        print(f"Generating listings for {len(job['items'])} items")
        
        # Generate listings for each item
        listings = []
        for item in job["items"]:
            listing = await listing_generator.create_listing(item)
            listings.append(listing)
        
        return JSONResponse(content={
            "success": True,
            "listings": listings,
            "message": f"Generated {len(listings)} marketplace listings"
        })
        
    except Exception as e:
        print(f"Error generating listings: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating listings: {str(e)}")

@router.post("/negotiate")
async def handle_negotiation(listing_id: str, buyer_message: str, current_price: float):
    """Handle buyer negotiation using AI"""
    
    try:
        response = await listing_generator.handle_negotiation(
            listing_id, buyer_message, current_price
        )
        
        return JSONResponse(content={
            "success": True,
            "response": response,
            "message": "Negotiation response generated"
        })
        
    except Exception as e:
        print(f"Error in negotiation: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error handling negotiation: {str(e)}")

@router.post("/add-manual-item")
async def add_manual_item(job_id: str, frame_id: str, item_name: str, category: str, price: float, condition: str = "good"):
    """Add a manually identified item to a frame"""
    
    if job_id not in extraction_jobs:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job = extraction_jobs[job_id]
    
    # Create manual item
    manual_item = {
        'id': f"manual_item_{len(job['items'])}",
        'name': item_name,
        'category': category,
        'frame_id': frame_id,
        'estimated_price': price,
        'condition': condition,
        'description': f"A {item_name} in {condition} condition",
        'timestamp': 0  # Will be updated based on frame
    }
    
    # Add to job items
    job['items'].append(manual_item)
    
    return JSONResponse(content={
        "success": True,
        "item": manual_item,
        "message": "Item added successfully"
    })

@router.get("/category-suggestions")
async def get_category_suggestions():
    """Get category suggestions for manual item entry"""
    
    video_processor = VideoProcessor()
    suggestions = video_processor.get_category_suggestions()
    
    return JSONResponse(content={
        "success": True,
        "categories": suggestions
    })

async def process_video_extraction(job_id: str, video_data: bytes, filename: str):
    """Background task to process video and extract sellable items using AI"""
    
    try:
        # Update progress
        extraction_jobs[job_id]["progress"] = 10
        
        # Extract frames from video
        frames = await video_processor.extract_frames(video_data)
        extraction_jobs[job_id]["progress"] = 30
        extraction_jobs[job_id]["frames"] = frames
        
        # Detect objects in frames using AI
        detected_objects = await video_processor.detect_objects(frames)
        extraction_jobs[job_id]["progress"] = 60
        
        # Filter for sellable items
        sellable_items = await video_processor.filter_sellable_items(detected_objects)
        extraction_jobs[job_id]["progress"] = 80
        
        # Store results
        extraction_jobs[job_id]["items"] = sellable_items
        extraction_jobs[job_id]["progress"] = 100
        extraction_jobs[job_id]["status"] = "completed"
        
        print(f"Video extraction completed for job {job_id}: {len(sellable_items)} items found")
        
    except Exception as e:
        print(f"Error in video extraction for job {job_id}: {str(e)}")
        extraction_jobs[job_id]["status"] = "failed"
        extraction_jobs[job_id]["error"] = str(e)
