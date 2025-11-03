import { StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  logoContainer: {
    position: "absolute",
    top: 10, // logo lebih ke atas
    width: SCREEN_WIDTH,
    alignItems: "center",
    zIndex: 15,
  },
  logo: {
    width: 140,
    height: 45,
    resizeMode: "contain",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.75,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ddd", 
    elevation: 4,
    alignSelf: "center",

  },
  image: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.75,
    resizeMode: "cover",
  },
  cardInfo: {
    position: "absolute",
    bottom: 45,
    left: 20,
  },
  name: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  locationIcon: {
    marginRight: 5,
  },
  location: {
    color: "#fff",
    fontSize: 16,
  },
  floatingButtons: {
    position: "absolute",
    bottom: 20, // lebih ke bawah dari sebelumnya
    width: SCREEN_WIDTH,
    flexDirection: "row",
    justifyContent: "space-evenly",
    zIndex: 999,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  menu: {
    position: 'absolute',
    top: 60, // sesuaikan dengan tinggi header
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    zIndex: 999, // pastikan di atas komponen lain
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Android
  },
  menuItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#FF5864',
  },


});
