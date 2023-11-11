import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import transforms, datasets  # Updated import
from model import IngredientsClassifier  # Importez votre classe de modèle

# Paramètres d'entraînement
num_classes = 22  # Nombre de classes (tomate et non-tomate)
batch_size = 32
num_epochs = 10
learning_rate = 0.001

# Transformation des données (assurez-vous qu'elle correspond à celle utilisée dans data_loader.py)
data_transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Chargez les données d'entraînement en utilisant ImageFolder
train_dataset = datasets.ImageFolder(root='ingredients_dataset/train', transform=data_transform)

# Créez un DataLoader pour les données d'entraînement
train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

# Créez une instance du modèle
model = IngredientsClassifier(num_classes)

# Définissez la fonction de perte et l'optimiseur
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# Boucle d'entraînement
for epoch in range(num_epochs):
    model.train()  # Mettez le modèle en mode d'entraînement
    running_loss = 0.0
    
    for inputs, labels in train_loader:
        optimizer.zero_grad()  # Réinitialisez les gradients
        
        # Propagation avant et calcul de la perte
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        
        # Rétropropagation et mise à jour des poids
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
    
    # Affichez la perte moyenne de l'époque
    print(f'Epoch {epoch+1}/{num_epochs}, Loss: {running_loss / len(train_loader)}')

# Sauvegarder les poids du modèle
torch.save(model.state_dict(), 'ingredients_classifier.pth')

print('Entraînement terminé!')
