import torch
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from torchvision.datasets import ImageFolder  # Utilisez ImageFolder directement
from model import FruitsClassifier  # Importez la classe TomatoClassifier depuis votre code existant

# Définissez le chemin du modèle entraîné
model_checkpoint = 'fruits_classifier.pth'

# Transformations pour les données de test
transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Chargez les données de test en utilisant ImageFolder
test_dataset = ImageFolder(root='fruits_dataset/test', transform=transform)

# Créez un DataLoader pour les données de test
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

# Chargez le modèle pré-entraîné
model = FruitsClassifier(num_classes=3)  # Assurez-vous d'utiliser les mêmes paramètres que lors de l'entraînement
model.load_state_dict(torch.load(model_checkpoint))
model.eval()

# Préparez des listes pour stocker les étiquettes prédites et les étiquettes réelles
predicted_labels = []
true_labels = []

# Parcourez les données de test et effectuez des prédictions
with torch.no_grad():
    for images, labels in test_loader:
        outputs = model(images)
        _, predicted = torch.max(outputs, 1)
        predicted_labels.extend(predicted.tolist())
        true_labels.extend(labels.tolist())

# Calculez la précision
accuracy = accuracy_score(true_labels, predicted_labels)
print(f'Accuracy: {accuracy:.2f}')

# Affichez le rapport de classification
print(classification_report(true_labels, predicted_labels))

# Affichez la matrice de confusion
confusion = confusion_matrix(true_labels, predicted_labels)
print('Confusion Matrix:')
print(confusion)

# Assurez-vous d'ajuster le chemin du modèle (model_checkpoint) et les paramètres de prétraitement (transform) en fonction de votre configuration.
