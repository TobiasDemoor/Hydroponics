import os
from time import sleep

mensaje = input("Ingrese codigo: ")
with open("codigo.txt", "w") as arch:
    arch.write(mensaje)

while True:
    try:
        with open("exito.response.txt", "r") as arch:
            exito = arch.readline()
        os.remove("exito.response.txt")
        print("exito")
        break
    except:
        pass
    try:
        with open("fracaso.response.txt", "r") as arch:
            fracaso = arch.readline()
        os.remove("fracaso.response.txt") 
        print("fracaso")
        break
    except:
        pass
    sleep(0.5)