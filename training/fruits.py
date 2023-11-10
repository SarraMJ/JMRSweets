from PIL import Image
from model import FruitsClassifier
import torchvision.transforms as transforms
import torch
import os
import glob


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
        image_fil = 'fruits_classifier.pth'

        # Construct the full path to the image file
        image_pat = os.path.join(script_dir, image_fil)
        model_checkpoint = image_pat #'training/fruits_classifier.pth'
        model = FruitsClassifier(num_classes=3)  # Assurez-vous d'utiliser les mêmes paramètres que lors de l'entraînement
        model.load_state_dict(torch.load(model_checkpoint))
        model.eval()


        # Makes the prediction
        with torch.no_grad():
            outputs = model(input_image)
            _, predicted = torch.max(outputs, 1)

        # Interprets the predictions for the classes 

        if predicted.item() == 0:
            print("apple")
        elif predicted.item() == 1:
            print("chocolate")
        else:
            print("prune")


        #Delete the used image

        #os.remove(image_file)
        #print(f"L'image {image_file} a été supprimée.")
    else:
        print("Aucune image trouvée dans le répertoire 'uploads'.")
        

script_dir = os.path.dirname(os.path.abspath(__file__))

# Takes the absolute path of "uploads" directory 
upload_dir = os.path.join(script_dir, '../uploads')

image_file = None

# Looks or the last image in "uploads" directory 
image_files = glob.glob(os.path.join(upload_dir, '*.jpeg')) or glob.glob(os.path.join(upload_dir, '*.jpg')) or glob.glob(os.path.join(upload_dir, '*.png'))
for image_file in image_files : 
    predict_image(image_file)
    
    """if image_files:
        # Sorts the files by modification date (the most recent first)
            image_files.sort(key=os.path.getmtime, reverse=True)

    # Takes the first image (the most recent)
        image_file = image_files[0]"""
    