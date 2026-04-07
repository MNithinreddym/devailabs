no
from PIL import Image

def crop_kamala():
    # Load the cleaned image
    img = Image.open(r'c:\Users\SRIRAM\OneDrive\Desktop\DEV AI\Devailabs\src\assets\kamala-profile.png').convert('RGBA')
    width, height = img.size
    
    # Define crop area (focus on the head, remove the excessive white space)
    # The head seems to be in the middle, but slightly high.
    # Let's take a square crop from the center.
    zoom_factor = 0.6  # 60% of original size
    
    new_w = int(width * zoom_factor)
    new_h = int(height * zoom_factor)
    
    left = (width - new_w) / 2
    top = (height - new_h) / 2
    right = (width + new_w) / 2
    bottom = (height + new_h) / 2
    
    cropped_img = img.crop((left, top, right, bottom))
    
    # Resize back to original dimensions for high quality display
    final_img = cropped_img.resize((width, height), Image.LANCZOS)
    
    final_img.save(r'c:\Users\SRIRAM\OneDrive\Desktop\DEV AI\Devailabs\src\assets\kamala-profile.png')

if __name__ == '__main__':
    crop_kamala()
