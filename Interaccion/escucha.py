from time import sleep
import os

while True:
    try:
        with open("codigo.txt", "r") as arch:
            codigo = arch.readline()
        # borro el archivo
        os.remove("codigo.txt")
        # ejecuto la acción solicitada
        print("codigo: " + codigo)
        # comunico el exito o fracaso
        if codigo == "bien":
            with open("exito.response.txt", "w") as arch:
                arch.write("1")
        else:
            with open("fracaso.response.txt", "w") as arch:
                arch.write("1")
    except:
        pass
    sleep(0.5)