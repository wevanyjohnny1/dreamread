import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
import { User, Bell, ShieldAlert, HelpCircle } from 'lucide-react-native';
import { Button, ButtonText } from '@/components/ui/Button';

const configOptions = [
  { id: '1', title: 'Conta', icon: User },
  { id: '2', title: 'Notificações', icon: Bell },
  { id: '3', title: 'Privacidade', icon: ShieldAlert },
  { id: '4', title: 'Ajuda', icon: HelpCircle },
];

export default function Config() {
  const router = useRouter();

  const handleOptionPress = (optionTitle: string) => {
    console.log(`Opção selecionada: ${optionTitle}`);
  };

  const handleLogout = () => {
    console.log('Usuário saiu');
    router.replace('/(auth)');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <Box className="flex-1 p-4">
        <Box className="mb-8">
          <Text className="text-white text-2xl font-bold text-center">
            Configurações
          </Text>
        </Box>

        <FlashList
          data={configOptions}
          keyExtractor={(item) => item.id}
          estimatedItemSize={50}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleOptionPress(item.title)}>
              <Box className="flex-row items-center p-4 bg-gray-800 rounded mb-4">
                <Icon as={item.icon} size="md" className="text-white mr-4" />
                <Text className="text-white text-lg">{item.title}</Text>
              </Box>
            </TouchableOpacity>
          )}
        />

        <Box className="mt-auto">
          <Button onPress={handleLogout} action="secondary">
            <ButtonText>Sair</ButtonText>
          </Button>
        </Box>
      </Box>
    </SafeAreaView>
  );
}
