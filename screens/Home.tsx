import { View, Text, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseConfig';
import { StackNavigationProp } from '../Router';
import useAuth from '../components/AuthProvider';
import { Image } from 'expo-image';
import TinderCard from 'react-tinder-card';

const Home = ({ navigation }: StackNavigationProp) => {
  const { currentUser, loggedInUser, setLoggedInUser } = useAuth();
  const [profileImages, setProfileImages] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const onSwipe = (direction: any) => {
    console.log('You swiped: ' + direction);
  };

  const onCardLeftScreen = (myIdentifier: any) => {
    console.log(myIdentifier + ' left the screen');
  };

  const getName = async () => {
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', currentUser.user.id);
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
    if (loggedInUser.id !== '') {
      setLoading(true);
      for (let i = 0; i < loggedInUser.images.length; i++) {
        const { data } = await supabase.storage
          .from('pictures')
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
      navigation.navigate('Welcome');
    }
  }, []);
  return (
    <View className="flex-1 justify-between">
      {/* Top bar  */}
      <View className="bg-theme-green pt-32"></View>

      {/* middle section */}
      <View className="flex-1">
        {loading && <Text>Loading ...</Text>}
        {!loading && (
          <>
            {profileImages.map((item: string, index: string) => (
              <TinderCard
                onSwipe={onSwipe}
                onCardLeftScreen={() => onCardLeftScreen('fooBar')}
                key={index}
              >
                <View className="absolute flex  flex-1 items-center justify-center">
                  <Image
                    source={index}
                    contentFit="cover"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  />
                </View>
              </TinderCard>
            ))}
          </>
        )}
      </View>

      {/* Bottom bar */}
      <View className="bg-theme-green pb-32"></View>
    </View>
  );
};

export default Home;
