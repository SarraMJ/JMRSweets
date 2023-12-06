import torch
import torch.nn as nn
import torch.optim as optim
from torch.utils.data import DataLoader
from torchvision import transforms, datasets  
from model import IngredientsClassifier  

# Training parameters
num_classes = 14  
batch_size = 32 #(same batch size for all of our files)
num_epochs = 10
learning_rate = 0.001

# Needed data transformations (matches those in data_loader.py too)
data_transform = transforms.Compose([
    transforms.Resize(224),
    transforms.CenterCrop(224),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Loads the training dataset and creates a Dataloader object for them 
train_dataset = datasets.ImageFolder(root='ingredients_dataset/train', transform=data_transform)

train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)

# Creates an instance of the model
model = IngredientsClassifier(num_classes)

# Loss function and optimizer 
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=learning_rate)

# Training loop
for epoch in range(num_epochs):
    model.train()  # puts it training mode 
    running_loss = 0.0
    
    for inputs, labels in train_loader:
        optimizer.zero_grad()  # re initializes gradients 
        
        # Forward pass and loss calculation
        outputs = model(inputs)
        loss = criterion(outputs, labels)
        
        
        loss.backward()
        optimizer.step()
        
        running_loss += loss.item()
    
    # Displays average loss of the epoch
    print(f'Epoch {epoch+1}/{num_epochs}, Loss: {running_loss / len(train_loader)}')

# Saves the weight of the model
torch.save(model.state_dict(), 'ingredients_classifier.pth')

print('Entraînement terminé!')
