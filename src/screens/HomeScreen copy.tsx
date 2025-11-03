import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
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
  const [cardIndex, setCardIndex] = useState(0);
  const swiperRef = useRef<Swiper<Person>>(null);
  const queryClient = useQueryClient();
  const logoutMutation = useLogout(() => {
    navigation.replace("Login");
  });

  useEffect(() => {
    const loadUser = async () => {
      const user = await getCurrentUser();
      if (user) setUserId(user.id);
      else navigation.replace("Login");
    };
    loadUser();
  }, [navigation]);

  const handleLogout = () => logoutMutation.mutate();

  const handleLike = (index: number) => {
    if (!userId || !people[index]) return;
    const person = people[index];
    likePerson.mutate({ personId: person.id, userId }, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: `You liked ${person.name}!`,
          position: "top",
        });
      },
    });
  };

  const handleDislike = (index: number) => {
    if (!userId || !people[index]) return;
    const person = people[index];
    dislikePerson.mutate({ personId: person.id, userId }, {
      onSuccess: () => {
        Toast.show({
          type: "success",
          text1: `You liked ${person.name}!`,
          position: "top",
        });
      },
    });
  };

  const handleRefresh = async () => {
    setCardIndex(0);
    await queryClient.resetQueries({ queryKey: ["people"] });
    Toast.show({
      type: "success",
      text1: "Profiles refreshed!",
      position: "top",
    });
  };


  if (isLoading || userId === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF5864" />
        <Text>Loading profiles...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={images.logo} style={styles.logo} />
        <TouchableOpacity onPress={() => setShowMenu(!showMenu)}>
          <Icon name="menu" size={28} color="#FF5864" />
        </TouchableOpacity>
      </View>

      {showMenu && (
        <View style={styles.menu}>
          <TouchableOpacity onPress={handleLogout}>
            <Text style={styles.menuItem}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      {people.length > 0 ? (
        <Swiper
          ref={swiperRef}
          cards={people}
          cardIndex={cardIndex}
          renderCard={(person) =>
            person ? (
              <View style={styles.card} key={person.id}>
                {/* Gunakan key di gambar agar re-render ketika picture berubah */}
                <FadeInImage key={person.picture} uri={person.picture} style={styles.image} />

                <View style={styles.cardInfo}>
                  <Text style={styles.name}>
                    {person.name}, {person.age}
                  </Text>
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
          onSwiped={(i) => setCardIndex(i + 1)}         // ✅ update card index setiap swipe
          onSwipedLeft={(i) => handleDislike(i)}        // ✅ dislike per kartu
          onSwipedRight={(i) => handleLike(i)}          // ✅ like per kartu
          stackSize={3}
          backgroundColor="transparent"
          disableTopSwipe
          disableBottomSwipe
        />

      ) : (
        <Text style={{ marginTop: 120, fontSize: 18 }}>
          No profiles found 😢
        </Text>
      )}

      {/* Floating Buttons */}
      <View style={styles.floatingButtons}>
        <TouchableOpacity style={styles.floatingButton} onPress={handleRefresh}>
          <Icon name="refresh" size={22} color="#FF5864" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
            const index = cardIndex; // ambil kartu aktif
            if (index < people.length) {
              handleDislike(index);           // jalankan dislike
              swiperRef.current?.swipeLeft(); // animasi geser kiri
            }
          }}
        >
          <Icon name="close" size={26} color="#FF5864" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton}>
          <Icon name="star" size={22} color="#3AB4F2" />
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={() => {
            const index = cardIndex; // ambil kartu aktif
            if (index < people.length) {
              handleLike(index);            // jalankan like
              swiperRef.current?.swipeRight(); // animasi geser kanan
            }
          }}
        >
          <FontAwesome name="heart" size={24} color="#4DED30" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.floatingButton}>
          <Icon name="flash" size={22} color="#915DD1" />
        </TouchableOpacity>
      </View>

      <Toast />
    </View>
  );
};

export default HomeScreen;
