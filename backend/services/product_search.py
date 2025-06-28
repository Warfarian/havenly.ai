from tavily import TavilyClient
import config
from typing import List, Dict

class ProductSearchService:
    def __init__(self):
        self.client = TavilyClient(api_key=config.TAVILY_API_KEY)
    
    async def search_products(self, suggestions: List[Dict]) -> List[Dict]:
        """Search for products based on room analysis suggestions"""
        products = []
        
        for suggestion in suggestions:
            try:
                # Create more specific search queries for direct product links
                queries = [
                    f"{suggestion['item']} buy online amazon wayfair target",
                    f"shop {suggestion['item']} home decor furniture store",
                    f"{suggestion['item']} price buy now {suggestion['category']}"
                ]
                
                for query in queries:
                    # Search using Tavily with more specific parameters
                    response = self.client.search(
                        query=query,
                        search_depth="advanced",
                        max_results=2,
                        include_domains=["amazon.com", "wayfair.com", "target.com", "ikea.com", "homedepot.com", "lowes.com", "overstock.com", "cb2.com", "crateandbarrel.com"]
                    )
                    
                    # Process results
                    for result in response.get('results', []):
                        # Filter for actual product pages
                        url = result.get('url', '')
                        title = result.get('title', '')
                        
                        # Skip if it's just a category page or homepage
                        if any(skip_term in url.lower() for skip_term in ['/category/', '/categories/', '/search?', '/browse/', 'homepage']):
                            continue
                            
                        # Look for product indicators in URL
                        if any(product_term in url.lower() for product_term in ['/product/', '/p/', '/dp/', '/item/', '/products/']):
                            product = {
                                "title": title,
                                "url": url,
                                "description": result.get('content', '')[:200] + "...",
                                "category": suggestion['category'],
                                "suggestion_item": suggestion['item'],
                                "priority": suggestion['priority'],
                                "source": "tavily_search",
                                "store": self._extract_store_name(url)
                            }
                            products.append(product)
                    
                    # Limit products per suggestion
                    if len([p for p in products if p['suggestion_item'] == suggestion['item']]) >= 3:
                        break
                        
            except Exception as e:
                print(f"Error searching for {suggestion['item']}: {str(e)}")
                continue
        
        return products
    
    def _extract_store_name(self, url: str) -> str:
        """Extract store name from URL"""
        if 'amazon.com' in url:
            return 'Amazon'
        elif 'wayfair.com' in url:
            return 'Wayfair'
        elif 'target.com' in url:
            return 'Target'
        elif 'ikea.com' in url:
            return 'IKEA'
        elif 'homedepot.com' in url:
            return 'Home Depot'
        elif 'lowes.com' in url:
            return 'Lowe\'s'
        elif 'overstock.com' in url:
            return 'Overstock'
        elif 'cb2.com' in url:
            return 'CB2'
        elif 'crateandbarrel.com' in url:
            return 'Crate & Barrel'
        else:
            return 'Online Store'
    
    async def search_specific_product(self, product_name: str, category: str = "") -> List[Dict]:
        """Search for a specific product"""
        try:
            # More specific query for direct product links
            query = f"{product_name} {category} buy online product page"
            
            response = self.client.search(
                query=query,
                search_depth="advanced",
                max_results=8,
                include_domains=["amazon.com", "wayfair.com", "target.com", "ikea.com", "homedepot.com", "lowes.com", "overstock.com", "cb2.com", "crateandbarrel.com"]
            )
            
            products = []
            for result in response.get('results', []):
                url = result.get('url', '')
                
                # Filter for actual product pages
                if any(product_term in url.lower() for product_term in ['/product/', '/p/', '/dp/', '/item/', '/products/']):
                    product = {
                        "title": result.get('title', ''),
                        "url": url,
                        "description": result.get('content', '')[:200] + "...",
                        "category": category,
                        "source": "tavily_search",
                        "store": self._extract_store_name(url)
                    }
                    products.append(product)
            
            return products
            
        except Exception as e:
            raise Exception(f"Error searching for product: {str(e)}")
