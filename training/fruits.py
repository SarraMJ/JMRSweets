from PIL import Image
from model import IngredientsClassifier
import torchvision.transforms as transforms
import torch
import os
import glob
import json



"""
# Initializes the variable image_file
image_file = None

# Looks or the last image in "uploads" directory 
image_files = glob.glob(os.path.join(upload_dir, '*.jpeg')) or glob.glob(os.path.join(upload_dir, '*.jpg')) or glob.glob(os.path.join(upload_dir, '*.png'))
if image_files:
    # Sorts the files by modification date (the most recent first)
    image_files.sort(key=os.path.getmtime, reverse=True)

    # Takes the first image (the most recent)
    image_file = image_files[0]
"""
def predict_image(image_file) : 

    if image_file:
     # Loads the image using the constructed path
        image = Image.open(image_file)
        # Converts the image to RGB format if it's not already colored
        if image.mode != 'RGB':
            image = image.convert('RGB')
        # Transformations for image preprocessing
        transform = transforms.Compose([
            transforms.Resize(224),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
        ])

        # Applies transformations to images
        input_image = transform(image).unsqueeze(0)  

    
        # Specify the image file name
        image_fil = 'ingredients_classifier.pth'

        # Construct the full path to the image file
        image_pat = os.path.join(script_dir, image_fil)
        model_checkpoint = image_pat #'training/fruits_classifier.pth'
        model = IngredientsClassifier(num_classes=22)  # Assurez-vous d'utiliser les mêmes paramètres que lors de l'entraînement
        model.load_state_dict(torch.load(model_checkpoint))
        model.eval()


        # Makes the prediction
        with torch.no_grad():
            outputs = model(input_image)
            _, predicted = torch.max(outputs, 1)

        # Interprets the predictions for the classes 

        if predicted.item()== 0:
            return "apple"
        elif predicted.item()== 1:
            return "banana"   
        elif predicted.item()== 2:
            return "carrot"
        elif predicted.item()== 3:
            return "cherry"     
        elif predicted.item() == 4:
            return "chocolate"
        elif predicted.item()==5:
            return "cocoa powder"
        elif predicted.item() == 6:
            return "egg"
        elif predicted.item() ==7:
	        return "flour"
        elif predicted.item() == 8:
	        return "grapes"
        elif predicted.item() == 9:
	        return "ice cream"
        elif predicted.item() == 10:
	        return "kiwi"
        elif predicted.item() == 11:
	        return "lemon"
        elif predicted.item() == 12:
	        return "mango"
        elif predicted.item() == 13:
	        return "milk"
        elif predicted.item() == 14:
	        return "orange"
        
        elif predicted.item() == 15:
            return "pear"
        elif predicted.item() == 16:
            return "pineapple"
        elif predicted.item() == 17:
            return "plum"
        elif predicted.item() == 18:
            return "pomegranate"
        elif predicted.item() == 19:
            return "raspberry"
        elif predicted.item() == 20:
            return "strawberry"            
        else:
            return "watermelon"


        #Delete the used image

        #os.remove(image_file)
        #print(f"L'image {image_file} a été supprimée.")
    else:
        print("Aucune image trouvée dans le répertoire 'uploads'.")


        

script_dir = os.path.dirname(os.path.abspath(__file__))

# Takes the absolute path of "uploads" directory 
upload_dir = os.path.join(script_dir, '../uploads')

image_file = None

 
image_files = glob.glob(os.path.join(upload_dir, '*.jpeg')) or glob.glob(os.path.join(upload_dir, '*.jpg')) or glob.glob(os.path.join(upload_dir, '*.png'))

ingredientsArray = [predict_image(image_file) for image_file in image_files]
print(json.dumps(ingredientsArray))