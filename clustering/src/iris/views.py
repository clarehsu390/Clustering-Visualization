# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

from .models import Iris, Pca

import json

# Create your views here.

def index(request):
    iris = Iris.objects.values("petal_width", "petal_length", "sepal_length", "sepal_width", "name")
    iris_list = json.dumps(list(iris))
    pca = Pca.objects.values("x", "y", "z", "label")
    pca_list = json.dumps(list(pca))
    context = {'iris_list': iris_list, 'pca_list': pca_list}
    return render(request,'iris/index.html', context)
# import math
# import random

# def main():  
#     num_points = 20
#     dimensions = 2
#     lower = 0 
#     upper = 200 
#     num_clusters = 3 
#     cutoff = 0.2
#     points = [makeRandomPoint(dimensions, lower, upper) for i in xrange(num_points)]
    
#     clusters = kmeans(points, num_clusters, cutoff)
#     print(clusters)

# class Point(object):
    
#     def __init__(self,coords):
#         self.coords = coords
#         self.n = len(coords)
        
#     def __repr__(self):
#         return str(self.coords)

# class Cluster(object):
    
#     def __init__(self,points):
#         self.points = points
#         self.n = points[0].n
#         self.centroid = self.calculateCentroid()
    
#     def __repr__(self):
#         return str(self.points)
    
#     def update(self, points):
#         old_centroid = self.centroid 
#         self.points = points
#         self.centroid = self.calculateCentroid()
#         shift = getDistance(old_centroid, self.centroid)
#         return shift
    
#     def calculateCentroid(self):
#         numPoints = len(self.points)
#         coords = [p.coords for p in self.points]
#         unzipped = zip(*coords)
#         centroid_coords = [math.fsum(dList)/numPoints for dList in unzipped]
#         return Point(centroid_coords)
    
# def kmeans(points, k, cutoff):
#     initial = random.sample(points, k)
#     clusters = [Cluster([p]) for p in initial]
    
#     loopCounter = 0 
#     while True: 
#         lists = [[] for _ in clusters]
#         clusterCount = len(clusters)
#         loopCounter += 1 
        
#         for p in points:
#             smallest_distance = getDistance(p, clusters[0].centroid)
#             clusterIndex = 0 
        
#             for i in range(clusterCount -1):
#                 distance = getDistance(p, clusters[i+1].centroid)
            
#                 if distance < smallest_distance: 
#                     smallest_distance = distance 
#                     clusterIndex = i+1
#             lists[clusterIndex].append(p)   
            
#         biggest_shift = 0.0
        
#         for i in range(clusterCount):
#             shift = clusters[i].update(lists[i])
#             biggest_shift = max(biggest_shift,shift)
        
#         if biggest_shift < cutoff:
#             break
            
#     return clusters

# def getDistance(a,b):
#     accumulatedDifference = 0.0
#     for i in range(a.n):
#         squareDifference = pow((a.coords[i]-b.coords[i]),2)
#         accumulatedDifference += squareDifference
#     distance = math.sqrt(accumulatedDifference)
    
#     return distance

# def makeRandomPoint(n, lower, upper):
#     p = Point([random.uniform(lower, upper) for _ in range(n)])
#     return p

