import geojson
from geopy.distance import geodesic
from tunnelData import points

class Graph:
    def __init__(self):
        with open('umanitoba.geojson', 'r') as file:
            geojson_data = geojson.load(file)

        self.graph = {}
        self.path_c = []
        self.path_d = []

        for feature in geojson_data['features']:
            if feature['geometry']['type'] == 'LineString':
                coordinates = feature['geometry']['coordinates']
                for i in range(len(coordinates) - 1):
                    coord1 = tuple(coordinates[i])
                    coord2 = tuple(coordinates[i + 1])
                    coord1 = (coord1[1], coord1[0])
                    coord2 = (coord2[1], coord2[0])
                    weight = geodesic(coord1, coord2).meters
                    self.graph.setdefault(coord1, []).append((coord2, weight))
                    self.graph.setdefault(coord2, []).append((coord1, weight))
        tunnels = []

        for s in points:
            arbitrary_coord = (s[0], s[1])

            distances = {}
            for vertex in self.graph.keys():
                distance = geodesic(arbitrary_coord, vertex).meters
                distances[vertex] = distance

            sorted_nodes = sorted(distances, key=lambda k: distances[k])[:5]

            closest_distance = float('inf')

            # Iterate through the 5 closest nodes and their adjacent edges
            for node in sorted_nodes:
                for adjacent_vertex, weight in self.graph[node]:
                    distance_to_start = geodesic(arbitrary_coord, node).meters
                    distance_to_end = geodesic(arbitrary_coord, adjacent_vertex).meters

                    t = min(1, max(0, (distance_to_start ** 2) / (distance_to_start ** 2 + distance_to_end ** 2)))

                    interpolated_point = (
                        node[0] + t * (adjacent_vertex[0] - node[0]),
                        node[1] + t * (adjacent_vertex[1] - node[1])
                    )

                    distance_to_interpolated_point = geodesic(arbitrary_coord, interpolated_point).meters

                    # Update closest_edge if the distance is smaller
                    if distance_to_interpolated_point < closest_distance:
                        closest_edge1 = node
                        closest_edge2 = adjacent_vertex
                        # closest_edge = ((node, adjacent_vertex), distance_to_interpolated_point)
                        # closest_distance = distance_to_interpolated_point

            # Update the weight between (x1, y1) and (x2, y2) to infinity
            for index, (node, weight) in enumerate(self.graph[closest_edge1]):
                if node == (closest_edge2):
                    self.graph[closest_edge1][index] = (closest_edge2, float("inf"))
                    break

            for index, (node, weight) in enumerate(self.graph[closest_edge2]):
                if node == closest_edge1:
                    self.graph[closest_edge2][index] = (closest_edge1, float("inf"))
                    break

    def find_nearest_node(self, coord):
        return min(self.graph.keys(), key=lambda x: geodesic(coord, x).meters)

    def dijkstra(self, start, end):
        queue = []

        visited = {node: (float('inf'), None) for node in self.graph}
        visited[start] = (0, None)
        queue.append(start)

        while queue:
            current_node = min(queue, key=lambda node: visited[node][0])
            queue.remove(current_node)

            if current_node == end:
                path = []
                while current_node:
                    path.insert(0, current_node)
                    current_node = visited[current_node][1]
                return path

            for neighbor, weight in self.graph[current_node]:
                distance = visited[current_node][0] + weight
                if distance < visited[neighbor][0]:
                    visited[neighbor] = (distance, current_node)
                    queue.append(neighbor)

    def navigation(self, start_x, start_y, end_x, end_y):
        # Define your start and end coordinates
        start_coord = (start_x, start_y)
        end_coord = (end_x, end_y)

        # Find the nearest nodes to your start and end coordinates
        start_node = self.find_nearest_node(start_coord)
        end_node = self.find_nearest_node(end_coord)

        # Find the shortest path using Dijkstra's algorithm
        path = self.dijkstra(start_node, end_node)

        if path is None:
            return {"error": "Path not found."}, 0
    
        self.path_c = [node for node in path]

        distance = 0

        if self.path_c:
            self.path_d = list(range(len(self.path_c)))
            distance = geodesic(end_node, self.path_c[len(self.path_c)-1]).meters
            for i in range(len(self.path_c)-1, 0, -1):
                distance += geodesic(self.path_c[i], self.path_c[i-1]).meters
                self.path_d[i] = distance
            self.path_d[0] = geodesic(self.path_c[0], start_node).meters + distance
        else:
            pass

        return self.path_c, distance

    def keep_updated(self, currentx, currenty):
        current = (currentx, currenty)
        smallest = geodesic(self.path_c[0], current).meters
        smallest_index = 0
        for i in range(len(self.path_c)):
            if smallest < geodesic(self.path_c[i], current).meters:
                break
            else:
                smallest = geodesic(self.path_c[i], current).meters
                smallest_index = i
        distance = smallest + self.path_d[smallest_index]
        return distance
