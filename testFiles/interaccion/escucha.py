from time import sleep
import os
import json
import csv
import random
from datetime import datetime

def actuator():
    try:
        with open("request.actuator", "r") as arch:
            data = arch.readline()
        # borro el archivo
        os.remove("request.actuator")
        # ejecuto la acción solicitada
        d = json.loads(data)
        state = d['state']
        with open('../logs/ambient.log', 'a') as arch:
            writer = csv.writer(arch)
            vec = [datetime.now()]
            for _ in range(3):
                vec.append(round(random.random()*100, 2))
            vec.append(state)
            writer.writerow(vec)
        # comunico el exito o fracaso
        if True:
            with open("success.actuator", "w") as arch:
                arch.write("1")
            print(state)
        else:
            with open("error.actuator", "w") as arch:
                arch.write("te la comiste")
    except:
        pass

def update():
    try:
        with open("request.update", "r") as arch:
            arch.readline()
        # borro el archivo
        os.remove("request.update")
        # ejecuto la acción solicitada
        # ponele
        # comunico el exito o fracaso
        if True:
            with open("success.update", "w") as arch:
                arch.write("1")
            print("update")
        else:
            with open("error.update", "w") as arch:
                arch.write("te la comiste")
    except:
        pass

while True:
    actuator()
    update()
    sleep(0.5)
