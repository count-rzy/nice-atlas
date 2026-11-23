import json
from pathlib import Path

data = json.loads(Path('countries.geojson').read_text(encoding='utf-8'))
source = {feature['properties']['adm0_a3']: feature for feature in data['features']}


def join_adjacent_polygons(first, second):
    """Remove their shared boundary and trace the remaining outer ring."""
    rings = [first['coordinates'][0], second['coordinates'][0]]
    edges = {(tuple(a), tuple(b)) for ring in rings for a, b in zip(ring, ring[1:])}
    boundary = {edge for edge in edges if (edge[1], edge[0]) not in edges}
    following = {a: b for a, b in boundary}
    if len(following) != len(boundary):
        raise ValueError('Polygon boundary has branches')
    start = next(iter(following))
    ring = [start]
    while True:
        ring.append(following[ring[-1]])
        if ring[-1] == start:
            break
        if len(ring) > len(boundary):
            raise ValueError('Polygon boundary did not close')
    if len(ring) - 1 != len(boundary):
        raise ValueError('Polygon boundary has disconnected pieces')
    return {'type': 'Polygon', 'coordinates': [[list(point) for point in ring]]}


# For this atlas, Serbia and Kosovo are shown as one outline, without an inner border.
serbia_geometry = join_adjacent_polygons(source['SRB']['geometry'], source['KOS']['geometry'])
# The 110m Palestine feature contains the West Bank only. Add the Gaza Strip
# polygon from Natural Earth's 50m admin-0 countries layer to the same feature.
gaza_ring = [
    [34.477344, 31.584863], [34.524121, 31.54165],
    [34.525586, 31.525635], [34.350195, 31.362744],
    [34.34834, 31.29292], [34.245313, 31.208301],
    [34.2125, 31.292285], [34.198145, 31.322607],
    [34.387305, 31.483789], [34.477344, 31.584863],
]
palestine_geometry = {
    'type': 'MultiPolygon',
    'coordinates': [source['PSX']['geometry']['coordinates'], [gaza_ring]],
}
features = []
for feature in data['features']:
    properties = feature['properties']
    country_id = properties['adm0_a3']
    if country_id == 'KOS':
        continue
    features.append({
        'id': country_id,
        'name': properties['name'],
        'continent': properties['continent'],
        'geometry': serbia_geometry if country_id == 'SRB' else
                    palestine_geometry if country_id == 'PSX' else feature['geometry'],
    })
# Andorra is absent from the 110m countries layer. Add its outline from Natural
# Earth's 50m admin-0 countries layer so it remains a real map feature.
features.append({
    'id': 'AND', 'name': 'Andorra', 'continent': 'Europe',
    'geometry': {'type': 'Polygon', 'coordinates': [[
        [1.706055, 42.50332], [1.678516, 42.49668], [1.586426, 42.455957],
        [1.534082, 42.441699], [1.48623, 42.434473], [1.448828, 42.437451],
        [1.428125, 42.461328], [1.430273, 42.497852], [1.421973, 42.530811],
        [1.414844, 42.548389], [1.42832, 42.595898], [1.458887, 42.62168],
        [1.501367, 42.642725], [1.568164, 42.63501], [1.709863, 42.604443],
        [1.739453, 42.575928], [1.740234, 42.556738], [1.713965, 42.525635],
        [1.706055, 42.50332],
    ]]},
})
# Singapore is likewise missing at 110m; its 50m outline keeps the map accurate.
features.append({
    'id': 'SGP', 'name': 'Singapore', 'continent': 'Asia',
    'geometry': {'type': 'Polygon', 'coordinates': [[
        [103.969727, 1.331445], [103.819922, 1.265381],
        [103.650195, 1.325537], [103.705273, 1.423437],
        [103.817969, 1.44707], [103.908984, 1.415967],
        [103.96084, 1.392236], [103.996387, 1.365234],
        [103.969727, 1.331445],
    ]]},
})
Path('map-data.js').write_text('const MAP_DATA=' + json.dumps(features, separators=(',', ':'), ensure_ascii=False) + ';', encoding='utf-8')
print(len(features), Path('map-data.js').stat().st_size)
