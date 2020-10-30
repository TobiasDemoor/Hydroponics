from time import sleep
import os
import json
import csv
import random
from datetime import datetime

while True:
    try:
        with open("request.actuator", "r") as arch:
            data = arch.readline()
        # borro el archivo
        os.remove("request.actuator")
        # ejecuto la acción solicitada
        d = json.loads(data)
        state = d['state']
        with open('../testFiles/temperatures0.log', 'a') as arch:
            writer = csv.writer(arch)
            vec = [datetime.now()]
            for i in range(3):
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
    sleep(0.5)
