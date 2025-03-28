import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { FlashList } from '@shopify/flash-list';
import { Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@/components/ui/Avatar';
import { Image } from '@/components/ui/Image';
import { useRouter } from 'expo-router';

const stories = [
  {
    id: '1',
    title: 'Moisés',
    description: 'A história de Moisés, o libertador que guiou seu povo.',
    duration: '15 min',
    ageRange: '5-7 anos',
    image: require('@/assets/images/histories/moses.png'),
  },
  {
    id: '2',
    title: 'Sansão',
    description: 'A história de Sansão, o homem de força que enfrentou desafios.',
    duration: '20 min',
    ageRange: '6-8 anos',
    image: require('@/assets/images/histories/samson.png'),
  },
];

export default function HomeScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <Box className="flex-1 p-4">
        <Box className="flex-row items-center justify-between mb-4">
          <Text className="text-white text-xl font-bold">Olá, Fulano</Text>
          <Avatar size="md">
            <AvatarFallbackText>Fulano</AvatarFallbackText>
            <AvatarImage source={require('@/assets/images/avatar.png')} />
            <AvatarBadge />
          </Avatar>
        </Box>

        <Text className="text-white text-lg mb-4">
          Escolha uma história de ninar
        </Text>

        <FlashList
          data={stories}
          keyExtractor={(item) => item.id}
          estimatedItemSize={150}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: '/history',
                  params: { storyId: item.id },
                })
              }
            >
              <Box className="mb-4 bg-gray-800 rounded p-4">
                <Image
                  source={item.image}
                  alt={item.title}
                  size="none"
                  className="w-full max-w-[320px] h-24 rounded-lg object-cover"
                />
                <Text className="text-white text-xl font-bold mt-2">
                  {item.title}
                </Text>
                <Text className="text-white mt-1">
                  {item.description}
                </Text>
                <Text className="text-white mt-1">
                  Duração: {item.duration}
                </Text>
                <Text className="text-white mt-1">
                  Faixa etária: {item.ageRange}
                </Text>
              </Box>
            </TouchableOpacity>
          )}
        />
      </Box>
    </SafeAreaView>
  );
}
