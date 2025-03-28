import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useCustomToast } from '@/components/ui/Toast/useToast';
import { VStack } from '@/components/ui/VStack';
import { Center } from '@/components/ui/Center';
import { Text } from '@/components/ui/Text';
import { Box } from '@/components/ui/Box';
import { Input, InputField } from '@/components/ui/Input';
import { Button, ButtonText } from '@/components/ui/Button';
import { Spinner } from '@/components/ui/Spinner';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const toast = useCustomToast();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      router.replace('/(tabs)');
    } catch (err: any) {
      console.error('Could not Login, error: ', err);
      toast.error({
        id: 'login-error',
        title: 'Erro ao realizar login',
        description: err.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    // Implemente aqui sua lógica de autenticação com Google
    console.log('Entrar com Google');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      // TODO use theme here
      className="flex-1 bg-background-dark items-center justify-center"
    >
      <VStack className="space-y-6 p-8 w-full max-w-md">
        <Center>
          <Text className="text-2xl font-bold">Bem vindo</Text>
          <Text className="text-xl font-bold">Ao DreamRead</Text>
        </Center>

        <Box className="w-full mt-4">
          <Text className="text-lg mb-4">Realize seu login</Text>
          <Input variant="outline" size="md" className="mb-3">
            <InputField placeholder="e-mail" />
          </Input>
          <Input variant="outline" size="md" className="mb-3">
            <InputField placeholder="senha" secureTextEntry />
          </Input>
          <Center className="mb-4">
            <Text onPress={() => { }} underline>
              Esqueci a Senha
            </Text>
          </Center>
          <Button
            onPress={handleSubmit}
            isDisabled={isLoading}
            size="lg"
            action="primary"
            className="mt-4"
          >
            {isLoading ? (
              <Spinner size="small" color="#fff" />
            ) : (
              <ButtonText>ENTRAR</ButtonText>
            )}
          </Button>
          <Button
            onPress={handleGoogleSignIn}
            isDisabled={isLoading}
            size="lg"
            action="secondary"
            variant="outline"
            className="mt-4"
          >
            <ButtonText>ENTRAR COM GOOGLE</ButtonText>
          </Button>
        </Box>
      </VStack>
    </KeyboardAvoidingView>
  );
}
