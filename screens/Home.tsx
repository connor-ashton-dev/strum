import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseConfig";
import { StackNavigationProp } from "../Router";
import useAuth from "../components/AuthProvider";
import { Image } from "expo-image";
import TinderCard from "react-tinder-card";

const Home = ({ navigation }: StackNavigationProp) => {
  const { currentUser, loggedInUser, setLoggedInUser } = useAuth();
  const [profileImages, setProfileImages] = useState<any>([]);
  const [currImageIndex, setCurrImageIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const onSwipe = (direction: any) => {
    console.log("You swiped: " + direction);
  };

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + " left the screen");
  };

  const getName = async () => {
    const { data, error } = await supabase
      .from("users")
      .select()
      .eq("id", currentUser.user.id);
    if (error) {
      console.log(error);
      return;
    }
    setLoggedInUser(data[0]);
  };

  useEffect(() => {
    populateImages();
  }, [loggedInUser]);

  const populateImages = async () => {
    if (loggedInUser.id !== "") {
      setLoading(true);
      for (let i = 0; i < loggedInUser.images.length; i++) {
        const { data } = await supabase.storage
          .from("pictures")
          .getPublicUrl(loggedInUser.images[i]);
        if (data) {
          setProfileImages((oldData: any) => [...oldData, data.publicUrl]);
        }
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      getName();
    } else {
      navigation.navigate("Welcome");
    }
  }, []);
  return (
    <View className="flex-1">
      {/* Top bar  */}
      <View className="h-28 w-full pt-8 bg-theme-green flex flex-row items-center justify-center">
        <Image
          source={require("../assets/electric-guitar.png")}
          style={{
            width: "50%",
            height: "50%",
          }}
          contentFit="contain"
        />
      </View>
      {/* middle section */}
      <View className="flex-1  items-center justify-center">
        <Image
          source={profileImages[currImageIndex]}
          contentFit="cover"
          style={{
            flex: 1,
            width: "100%",
            backgroundColor: "#0553",
          }}
          placeholder={blurhash}
        />

        {/* {loading ? (
          <Text className="flex-1 bg-blue-500">Loading...</Text>
        ) : (
          <>
           
              <Image
                source={profileImages[1]}
                contentFit="cover"
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </TinderCard>
          </>
        )} */}
      </View>

      {/* Bottom bar */}
      <View className="h-28 bg-theme-green flex-row items-center justify-between px-4 gap-x-2">
        <TouchableOpacity
          className="bg-white p-3 rounded-full flex-1 items-center"
          onPress={() => {
            if (currImageIndex !== profileImages.length) {
              setCurrImageIndex(currImageIndex + 1);
            } else {
              setCurrImageIndex(0);
            }
          }}
        >
          <Text className="font-bold font-xl tracking-wide">No thanks</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white p-3 rounded-full flex-1 items-center"
          onPress={() => {
            if (currImageIndex !== profileImages.length) {
              setCurrImageIndex(currImageIndex + 1);
            } else {
              setCurrImageIndex(0);
            }
          }}
        >
          <Text className="font-bold font-xl tracking-wide">Next picture</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-white p-3 rounded-full flex-1 items-center"
          onPress={() => {
            if (currImageIndex !== profileImages.length) {
              setCurrImageIndex(currImageIndex + 1);
            } else {
              setCurrImageIndex(0);
            }
          }}
        >
          <Text className="font-bold font-xl tracking-wide">Like</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
