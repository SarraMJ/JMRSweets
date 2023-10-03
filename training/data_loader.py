import os
import torch
from torchvision import transforms
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader

# Définissez les chemins vers les répertoires de données
data_dir = 'fruits_dataset'  # Assurez-vous que votre structure de répertoire est correcte

# Transformations pour le prétraitement des images
transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Créez des ensembles de données pour l'entraînement, la validation et les tests
train_dataset = ImageFolder(os.path.join(data_dir, 'train'), transform=transform)
val_dataset = ImageFolder(os.path.join(data_dir, 'val'), transform=transform)
test_dataset = ImageFolder(os.path.join(data_dir, 'test'), transform=transform)

# Créez des chargeurs de données pour l'entraînement, la validation et les tests
batch_size = 32  # Personnalisez la taille du lot selon vos besoins
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
val_loader = DataLoader(val_dataset, batch_size=batch_size)
test_loader = DataLoader(test_dataset, batch_size=batch_size)

# Facultatif : si vous avez besoin de récupérer les classes (étiquettes) de vos données
class_names = train_dataset.classes

# Exemple d'utilisation des chargeurs de données :
# for images, labels in train_loader:
#     # Vos opérations d'entraînement ici
