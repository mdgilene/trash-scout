#http://www.learnopencv.com/keras-tutorial-using-pre-trained-imagenet-models/
import keras
import numpy as np
from keras.applications import vgg19, inception_v3, resnet50, mobilenet


#Load the models
#InceptionResNetV2: 0.804; 0.953    215 MB ***
#Xception: 0.790; 0.945             88 MB
#InceptionV3: 0.788; 0.944          92 MB
#DenseNet201: 0.770; 0.933          80 MB
#ResNet50 0.759; 0.929              99 MB
#DenseNet169: 0.759; 0.928          59 MB
#DenseNet121: 0.745; 0.918          33 MB
#VGG19: 0.727, 0.910                549 MB
#VGG16: 0.715 0.901                 528 MB
#MobileNet: 0.665; 0.871            17 MB


#https://becominghuman.ai/building-an-image-classifier-using-deep-learning-in-python-totally-from-a-beginners-perspective-be8dbaf22dd8
# https://tensorflow.rstudio.com/blog/keras-image-classification-on-small-datasets.html
