from os import system

sections = [
    "ambient",
    "fishtank",
    "lowerbed",
    "mediumbed",
    "upperbed"
]

for s in sections:
    system(f"cp {s}.json {s}.test.json")