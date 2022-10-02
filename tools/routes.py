import json

features = None
with open("features.json", "rb") as f:
    features = json.load(f)["features"]

rocks = []
for f in features:
    if f["properties"].get("natural") == "bare_rock":
        for k in list(f["properties"].keys()):
            if k != "height" and k != "name":
                del f["properties"][k]
        rocks.append(f)

routes = {}
with open("routes.txt", "r") as f:
    for line in f.readlines():
        name, grade, page, rock = line.split(";")
        rock = rock.strip()
        for r in rocks:
            if r["properties"]["name"] == rock:
                has_routes = r.get("routes")
                if not has_routes:
                    r["routes"] = []
                r["routes"].append({"name": name, "difficulty": grade, "properties": {"page": page}})

with open("rocks.json", "w") as f:
    json.dump(rocks, f, indent=2)

