import torch

# Spécifiez le chemin vers le fichier .pth que vous souhaitez inspecter
file_path = 'ingredients_classifier.pth'



# Chargez les poids à partir du fichier .pth
weights = torch.load(file_path)

# Affichez les clés du dictionnaire de poids pour voir quelles parties du modèle sont enregistrées
print(weights.keys())

# Vous pouvez maintenant inspecter les valeurs des poids individuels en utilisant les clés du dictionnaire
# Par exemple, pour inspecter les poids d'une couche nommée "resnet.layer1.0.conv1.weight", vous pouvez faire quelque chose comme ceci :
layer1_conv1_weight = weights['resnet.layer1.0.conv1.weight']
print(layer1_conv1_weight)
