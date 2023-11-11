
import torch
import torch.nn as nn
import torchvision.models as models

class IngredientsClassifier(nn.Module):
    def __init__(self, num_classes):
        super(IngredientsClassifier, self).__init__()

        # Charger le modèle ResNet-18 pré-entraîné
        self.resnet = models.resnet18(pretrained=True)

        # Geler les couches du modèle de base (facultatif)
        for param in self.resnet.parameters():
            param.requires_grad = False

        # Remplacez la dernière couche (classifier) pour 2 classes
        self.resnet.fc = nn.Linear(self.resnet.fc.in_features, num_classes)

    def forward(self, x):
        # Propagation avant à travers le modèle
        x = self.resnet(x)
        return x


