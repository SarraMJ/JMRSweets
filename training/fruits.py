from PIL import Image
from model import FruitsClassifier
import torchvision.transforms as transforms
import torch


# Chargez l'image
image_path = 'chocolate.jpeg'
image = Image.open(image_path)

# Transformations pour le prétraitement des images
transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Appliquez les transformations à l'image
input_image = transform(image).unsqueeze(0)  # Vous devez également ajouter une dimension de lot (batch) car le modèle s'attend à un lot.

# Chargez le modèle pré-entraîné
model_checkpoint = 'fruits_classifier.pth'
model = FruitsClassifier(num_classes=3)  # Assurez-vous d'utiliser les mêmes paramètres que lors de l'entraînement
model.load_state_dict(torch.load(model_checkpoint))
model.eval()


# Faites la prédiction
with torch.no_grad():
    outputs = model(input_image)
    _, predicted = torch.max(outputs, 1)

# Interprétez les prédictions pour les 3 classes
if predicted.item() == 0:
    print("L'image représente une pomme.")
elif predicted.item() == 1:
    print("L'image représente du chocolat.")
else:
    print("L'image représente une prune.")
