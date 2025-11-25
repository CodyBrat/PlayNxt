import React from "react";
import { View, Text, TextInput, StyleSheet, FlatList, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";

const turfs = [
  {
    id: "1",
    name: "Nimbalkar Turf Pune",
    type: "5-a-side",
    price: "₹600/hr",
    image: "https://5.imimg.com/data5/SELLER/Default/2023/10/350327019/NU/WB/TZ/38215148/7-a-side-football-turf.jpg",
  },
  {
    id: "2",
    name: "Gitai Turf, Porwal Road",
    type: "7-a-side",
    price: "₹1200/hr",
    image: "https://turftown.in/_next/image?url=https%3A%2F%2Fturftown.s3.ap-south-1.amazonaws.com%2Fsuper_admin%2Ftt-1727866029596.webp&w=828&q=75",
  },
];

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search turfs..."
          placeholderTextColor="#888"
          style={styles.searchInput}
        />
      </View>

      {/* Title */}
      <Text style={styles.sectionTitle}>Nearby Turfs</Text>

      {/* Turf List */}
      <FlatList
        data={turfs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.turfName}>{item.name}</Text>
            <Text style={styles.turfDetails}>
              {item.type} · {item.price}
            </Text>
            <View style={styles.buttonRow}>
              <Button mode="contained" style={styles.button}>
                Book Now
              </Button>
              <Button mode="outlined" style={styles.button}>
                Details
              </Button>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginHorizontal: 16,
    marginVertical: 12,
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  turfName: {
    fontSize: 18,
    fontWeight: "600",
    margin: 12,
  },
  turfDetails: {
    fontSize: 14,
    color: "#555",
    marginHorizontal: 12,
    marginBottom: 8,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
  },
  button: {
    borderRadius: 10,
  },
});
