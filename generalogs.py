import csv
import time
import random

with open('prueba1.log', 'w') as arch:
    writer = csv.writer(arch)
    for i in range(100):
        vec = [int(round(time.time()*1000))]
        for i in range(6):
            vec.append(random.random()*100)
        writer.writerow(vec)