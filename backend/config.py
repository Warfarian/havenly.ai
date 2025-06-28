import os
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables once at module import
def load_env():
    """Load environment variables from .env file"""
    # Try different possible locations for .env file
    possible_paths = [
        Path(__file__).parent / '.env',  # Same directory as config.py
        Path(__file__).parent.parent / '.env',  # Parent directory
        Path.cwd() / '.env',  # Current working directory
    ]
    
    for env_path in possible_paths:
        if env_path.exists():
            load_dotenv(env_path)
            print(f"Loaded .env from: {env_path}")
            break
    else:
        print("Warning: No .env file found in any of the expected locations:")
        for path in possible_paths:
            print(f"  - {path}")

# Load environment variables when this module is imported
load_env()

# Environment variables
NEBIUS_API_KEY = os.getenv("NEBIUS_API_KEY")
TAVILY_API_KEY = os.getenv("TAVILY_API_KEY")

# Validation
if not NEBIUS_API_KEY:
    raise ValueError("NEBIUS_API_KEY environment variable is required")

if not TAVILY_API_KEY:
    raise ValueError("TAVILY_API_KEY environment variable is required")

print(f"Config loaded - NEBIUS_API_KEY: {'✓' if NEBIUS_API_KEY else '✗'}")
print(f"Config loaded - TAVILY_API_KEY: {'✓' if TAVILY_API_KEY else '✗'}")