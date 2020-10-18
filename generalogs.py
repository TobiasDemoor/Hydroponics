import csv
import time
import random
from datetime import datetime

with open('prueba.log', 'w') as arch:
    writer = csv.writer(arch)
    for i in range(100):
        vec = [datetime.now()]#[int(round(time.time()*1000))]
        for i in range(3):
            vec.append(random.random()*100)
        writer.writerow(vec)