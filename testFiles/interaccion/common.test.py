from time import sleep
import os
import json
import csv
import random
from datetime import datetime

while True:
    try:
        with open("request.test", "r") as arch:
            data = arch.readline()
        # borro el archivo
        os.remove("request.test")
        # ejecuto la acción solicitada
        if data != "error":
            with open("success.test", "w") as arch:
                arch.write("test ok")
        else:
            with open("error.test", "w") as arch:
                arch.write("test error")
        break
    except:
        pass
    sleep(0.5)
