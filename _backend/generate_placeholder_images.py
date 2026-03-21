"""
Generate placeholder images for testing
Requires: pip install pillow
"""

from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

MEDIA_DIR = Path(__file__).parent / "media" / "images"
MEDIA_DIR.mkdir(parents=True, exist_ok=True)

# Image configurations
IMAGES = [
    # Central Park - Version 1 (2 images)
    {"name": "object_1_v1_img1.jpg", "text": "Central Park\nVersion 1\nImage 1", "color": "#4CAF50"},
    {"name": "object_1_v1_img2.jpg", "text": "Central Park\nVersion 1\nImage 2", "color": "#66BB6A"},
    
    # Central Park - Version 2 (3 images)
    {"name": "object_1_v2_img1.jpg", "text": "Central Park\nRenovation\nImage 1", "color": "#FFA726"},
    {"name": "object_1_v2_img2.jpg", "text": "Central Park\nRenovation\nImage 2", "color": "#FFB74D"},
    {"name": "object_1_v2_img3.jpg", "text": "Central Park\nRenovation\nImage 3", "color": "#FFCC80"},
    
    # Central Park - Version 3 (3 images)
    {"name": "object_1_v3_img1.jpg", "text": "Central Park\nModern\nImage 1", "color": "#42A5F5"},
    {"name": "object_1_v3_img2.jpg", "text": "Central Park\nModern\nImage 2", "color": "#64B5F6"},
    {"name": "object_1_v3_img3.jpg", "text": "Central Park\nModern\nImage 3", "color": "#90CAF9"},
    
    # City Library - Version 1 (2 images)
    {"name": "object_2_v1_img1.jpg", "text": "City Library\nOriginal\nImage 1", "color": "#AB47BC"},
    {"name": "object_2_v1_img2.jpg", "text": "City Library\nOriginal\nImage 2", "color": "#BA68C8"},
    
    # City Library - Version 2 (3 images)
    {"name": "object_2_v2_img1.jpg", "text": "City Library\nDigital Hub\nImage 1", "color": "#EC407A"},
    {"name": "object_2_v2_img2.jpg", "text": "City Library\nDigital Hub\nImage 2", "color": "#F06292"},
    {"name": "object_2_v2_img3.jpg", "text": "City Library\nDigital Hub\nImage 3", "color": "#F48FB1"},
    
    # Shopping Mall - Version 1 (2 images)
    {"name": "object_3_v1_img1.jpg", "text": "Shopping Mall\nOpening\nImage 1", "color": "#26A69A"},
    {"name": "object_3_v1_img2.jpg", "text": "Shopping Mall\nOpening\nImage 2", "color": "#4DB6AC"},
    
    # Shopping Mall - Version 2 (3 images)
    {"name": "object_3_v2_img1.jpg", "text": "Shopping Mall\nExpansion\nImage 1", "color": "#FF7043"},
    {"name": "object_3_v2_img2.jpg", "text": "Shopping Mall\nExpansion\nImage 2", "color": "#FF8A65"},
    {"name": "object_3_v2_img3.jpg", "text": "Shopping Mall\nExpansion\nImage 3", "color": "#FFAB91"},
]

def hex_to_rgb(hex_color):
    """Convert hex color to RGB tuple"""
    hex_color = hex_color.lstrip('#')
    return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))

def create_placeholder_image(filename, text, color, size=(800, 600)):
    """Create a placeholder image with text"""
    # Create image
    img = Image.new('RGB', size, color=hex_to_rgb(color))
    draw = ImageDraw.Draw(img)
    
    # Try to use a nice font, fallback to default
    try:
        font = ImageFont.truetype("arial.ttf", 60)
        small_font = ImageFont.truetype("arial.ttf", 30)
    except:
        font = ImageFont.load_default()
        small_font = ImageFont.load_default()
    
    # Draw text in center
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    position = ((size[0] - text_width) // 2, (size[1] - text_height) // 2)
    
    # Draw shadow
    draw.text((position[0] + 2, position[1] + 2), text, fill=(0, 0, 0, 128), font=font)
    # Draw text
    draw.text(position, text, fill=(255, 255, 255), font=font)
    
    # Draw filename at bottom
    draw.text((10, size[1] - 40), filename, fill=(255, 255, 255), font=small_font)
    
    # Save image
    filepath = MEDIA_DIR / filename
    img.save(filepath, 'JPEG', quality=85)
    return filepath

print("🖼️  Generating placeholder images...")
print()

for img_config in IMAGES:
    filepath = create_placeholder_image(
        img_config["name"],
        img_config["text"],
        img_config["color"]
    )
    print(f"✅ Created {filepath.name}")

print()
print(f"✅ Generated {len(IMAGES)} placeholder images!")
print(f"📁 Location: {MEDIA_DIR}")

