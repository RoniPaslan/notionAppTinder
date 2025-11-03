import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions
} from "react-native";
import Swiper from "react-native-deck-swiper";
import Icon from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { useQueryClient } from "@tanstack/react-query";
import {
  usePeople,
  useLikePerson,
  useDislikePerson,
  Person,
} from "../api/usePeople";
import { getCurrentUser, useLogout } from "../api/useAuth";
import FadeInImage from "../components/atoms/FadeInImage";
import styles from "../assets/styles/HomeScreenStyles";
import { images } from "../assets/images";

const HomeScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [userId, setUserId] = useState<number | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const { data: people = [], isLoading } = usePeople();
  const likePerson = useLikePerson();
  const dislikePerson = useDislikePerson();
  const swiperRef = useRef<Swiper<Person>>(null);
  const queryClient = useQueryClient();
  const logoutMutation = useLogout(() => navigation.replace("Login"));
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ambil tinggi layar untuk menyesuaikan offset toast (jika mau)
  const { height } = Dimensions.get("window");
  const toastTopOffset = height * 0.12; // ±12% dari tinggi layar

  // Ambil user saat mount
  useEffect(() => {
    const loadUser = async () => {
      const userData: any = await getCurrentUser();
      if (userData) {
        console.log("User loaded:", userData);
        setUserId(userData.user.id);
      } else {
        console.log("No user found, redirecting to Login");
        navigation.replace("Login");
      }
    };
    loadUser();
  }, []);

  // ------------------ LOGOUT ------------------
  const handleLogout = () => logoutMutation.mutate();

  // ------------------ LIKE ------------------
  const handleLike = (index: number) => {
    const person = people[index];
    if (!userId || !person) return;

    likePerson.mutate(
      { personId: person.id, userId },
      {
        onSuccess: () => {
          Toast.show({
            type: "success",
            text1: `You liked ${person.name}!`,
            position: "top",
            topOffset: toastTopOffset,
          });
        },
        onError: (e) => console.log("LIKE error:", e),
      }
    );
  };

  // ------------------ DISLIKE ------------------
  const handleDislike = (index: number) => {
    const person = people[index];
    if (!userId || !person) return;

    dislikePerson.mutate(
      { personId: person.id, userId },
      {
        onSuccess: () => {
          Toast.show({
            type: "info",
            text1: `You disliked ${person.name}`,
            position: "top",
            topOffset: toastTopOffset,
          });
        },
        onError: (e) => console.log("DISLIKE error:", e),
      }
    );
  };

  // ------------------ REFRESH ------------------
  const handleRefresh = async () => {
    setCurrentIndex(0);
    swiperRef.current?.jumpToCardIndex(0);
    await queryClient.resetQueries({ queryKey: ["people"] });
    Toast.show({
      type: "success",
      text1: "Profiles refreshed!",
      position: "top",
      topOffset: toastTopOffset,
    });
  };

  // ------------------ BUTTON HANDLERS ------------------
  const handleLikePress = () => {
    const person = people[currentIndex];
    if (!userId || !person) return;

    handleLike(currentIndex);
    swiperRef.current?.swipeRight();
  };

  const handleDislikePress = () => {
    const person = people[currentIndex];
    if (!userId || !person) return;

    handleDislike(currentIndex);
    swiperRef.current?.swipeLeft();
  };

  // ------------------ LOADING ------------------
  if (isLoading || userId === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5864" />
        <Text>Loading profiles...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, overflow: "visible" }}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={images.logo} style={styles.logo} />
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Icon name="menu" size={28} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {/* Menu */}
      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Swiper */}
      {people.length > 0 ? (
        <Swiper
          ref={swiperRef}
          cards={people}
          cardIndex={currentIndex}
          renderCard={(person) =>
            person ? (
              <View style={styles.card} key={person.id}>
                <FadeInImage key={person.picture} uri={person.picture} style={styles.image} />
                <View style={styles.cardInfo}>
                  <Text style={styles.name}>{person.name}, {person.age}</Text>
                  <View style={styles.locationContainer}>
                    <Icon name="location-sharp" size={16} color="#fff" />
                    <Text style={styles.location}>{person.location}</Text>
                  </View>
                  <Text style={{ color: "#fff", marginTop: 4 }}>
                    Likes: {person.likes_count}
                  </Text>
                </View>
              </View>
            ) : null
          }
          onSwiped={(i) => setCurrentIndex(i + 1)}
          onSwipedLeft={(i) => handleDislike(i)}
          onSwipedRight={(i) => handleLike(i)}
          stackSize={3}
          backgroundColor="transparent"
          disableTopSwipe
          disableBottomSwipe
        />
      ) : (
        <Text style={{ marginTop: 120, fontSize: 18 }}>No profiles found 😢</Text>
      )}

      {/* Floating Buttons */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.floatingButton} onPress={handleRefresh}>
          <Icon name="refresh" size={22} color="#FF5864" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton} onPress={handleDislikePress}>
          <Icon name="close" size={26} color="#FF5864" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.floatingButton}>
          <Icon name="star" size={22} color="#3AB4F2" />
        </TouchableOpacity> */}

        <TouchableOpacity style={styles.floatingButton} onPress={handleLikePress}>
          <FontAwesome name="heart" size={24} color="#4DED30" />
        </TouchableOpacity>

        {/* <TouchableOpacity style={styles.floatingButton}>
          <Icon name="flash" size={22} color="#915DD1" />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default HomeScreen;
