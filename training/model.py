
import torch
import torch.nn as nn
import torchvision.models as models

class IngredientsClassifier(nn.Module):
    def __init__(self, num_classes):
        super(IngredientsClassifier, self).__init__()

        # Loads the Resnet18 
        self.resnet = models.resnet18(pretrained=True)

        # Freeze the parameters of the existing layers in the model
        for param in self.resnet.parameters():
            param.requires_grad = False

        # Replace the last layer (classifier) with a new linear layer for our classes
        self.resnet.fc = nn.Linear(self.resnet.fc.in_features, num_classes)

    def forward(self, x):
        x = self.resnet(x)
        return x


