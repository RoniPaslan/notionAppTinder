import React, { useState, useRef } from "react";
import { View, ActivityIndicator, Animated, ImageStyle } from "react-native";
import { images } from "../../assets/images";

interface FadeInImageProps {
  uri?: string;
  style?: ImageStyle;
}

const FadeInImage: React.FC<FadeInImageProps> = ({ uri, style }) => {
  const [loaded, setLoaded] = useState(false);
  const opacity = useRef(new Animated.Value(0)).current;

  const handleLoad = () => {
    setLoaded(true);
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ position: "relative" }}>
      {!loaded && (
        <View
          style={{
            ...style,
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#ddd",
          }}
        >
          <ActivityIndicator size="large" color="#FF5864" />
        </View>
      )}

      <Animated.Image
        source={uri ? { uri } : images.defaultPeople}
        style={[style, { opacity }]}
        resizeMode="cover"
        onLoad={handleLoad}
        onError={(e) =>
          console.log("❌ Image load error:", uri, e.nativeEvent.error)
        }
      />
    </View>
  );
};

export default FadeInImage;
