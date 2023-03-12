import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { StackNavigationProp } from '../../Router';
import { Audio } from 'expo-av';
import useAuth from '../../components/AuthProvider';
import Loading from '../Loading';
import * as FileSystem from 'expo-file-system';
import { supabase } from '../../supabaseConfig';
import { decode } from 'base64-arraybuffer';
import uuid from 'react-native-uuid';

const RegisterPt3 = ({ navigation }: StackNavigationProp) => {
  const {
    recording,
    setRecording,
    images,
    currentUser,
    age,
    name,
    location,
    username,
  } = useAuth();
  const [isRecording, setIsRecording] = useState(false);
  const [loading, isLoading] = useState(false);
  let imageArray: string[] = [];

  async function startRecording() {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      setIsRecording(true);
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }

  async function stopRecording() {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording.getURI();
    setRecording(uri);
    setIsRecording(false);
    console.log('Recording stopped and stored at', uri);
  }

  async function playSound() {
    const sound = new Audio.Sound();
    await sound.loadAsync({
      uri: recording,
    });
    await sound.playAsync();
  }

  const getUrl = async (bucket: string, name: string) => {
    const { data } = await supabase.storage.from(bucket).getPublicUrl(name);
    if (data.publicUrl) {
      return data!.publicUrl!;
    }
  };

  const uploadImages = async () => {
    for (const image of images) {
      let name = uuid.v4() + '.jpg';
      let encodedImage = image.base64;
      const { data, error } = await supabase.storage
        .from('pictures')
        .upload(name, decode(encodedImage), {
          contentType: 'image/jpg',
        });
      if (error) {
        console.log(error.message);
        return;
      }
      console.log('push');
      imageArray.push(name);
    }
    return 'done';
  };

  const uploadAudio = async (audio: string) => {
    let name = uuid.v4() + '.m4a';
    const { data, error } = await supabase.storage
      .from('audios')
      .upload(name, decode(audio), {
        contentType: 'audio/webm',
      });
    if (error) {
      console.log(error.message);
      return;
    }
    // const url = await getUrl('audios', name);
    // console.log(url);
    return name;
  };

  const createUser = async (audioName: string) => {
    //currentUser, age, name, location, username
    let id = currentUser.user.id;
    console.log('doin the thing! with this array', imageArray);

    const { error } = await supabase.from('users').insert({
      id: id,
      display_name: name,
      username: username,
      age: age,
      location: location,
      audio: audioName,
      images: imageArray,
    });
    if (error) {
      console.log(error.message);
      return;
    }
    console.log('successfully created a new user');
  };

  const createAccountWithInfo = async (audio: string) => {
    isLoading(true);
    //upload images to buckets
    const images = await uploadImages();
    //create user and attach images and audios to them
    const audioName = await uploadAudio(audio);

    await createUser(audioName!);
  };

  return (
    <>
      {loading && <Loading />}

      {!loading && (
        <ScrollView
          className="flex-1 bg-theme-brown"
          contentContainerStyle={{ alignItems: 'center' }}
        >
          <Text className="mt-24 text-3xl text-white font-bold tracking-widest shadow-sm shadow-gray-600 mb-16 text-center">
            Last Step ✅
          </Text>
          <Text className="text-white font-bold tracking-widest text-2xl mb-4">
            Upload a sweet audio 🎵
          </Text>

          <View className="flex-row gap-8">
            <TouchableOpacity
              className="bg-white rounded-full p-5 mb-16"
              onPress={startRecording}
            >
              <Text className="">🎤</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-white rounded-full p-5 mb-16"
              onPress={stopRecording}
            >
              <Text className="">🛑</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-white rounded-full p-5 mb-16"
              onPress={playSound}
            >
              <Text className="">▶️</Text>
            </TouchableOpacity>
          </View>

          {isRecording && (
            <Text className="text-3xl">Recording in progress...</Text>
          )}

          <TouchableOpacity
            className="bg-white px-14 py-2 my-16 rounded-2xl mt-80"
            onPress={async () => {
              if (recording) {
                const base64 = await FileSystem.readAsStringAsync(recording, {
                  encoding: 'base64',
                });

                createAccountWithInfo(base64);
              }
            }}
          >
            <Text className="text-lg font-semibold">Create My Account!!!</Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

export default RegisterPt3;
