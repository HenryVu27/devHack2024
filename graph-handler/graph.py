import geojson
from geopy.distance import geodesic


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
        # start_x = input()
        # start_y = input()
        # end_x = input()
        # end_y = input()
        start_coord = (start_x, start_y)
        end_coord = (end_x, end_y)

        # start_coord = (-78.9280652, 36.0077519)  # Replace with your start coordinate
        # end_coord = (-78.9358661, 36.0055298)  # Replace with your end coordinate

        # Find the nearest nodes to your start and end coordinates
        start_node = self.find_nearest_node(start_coord)
        end_node = self.find_nearest_node(end_coord)

        # Find the shortest path using Dijkstra's algorithm
        path = self.dijkstra(start_node, end_node)
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
