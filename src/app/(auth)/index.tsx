import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
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
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <VStack>
        <Center>
          <Center>
            <Text size='2xl'>Bem vindo</Text>
            <Text size='xl'>Ao DreamRead</Text>
          </Center>

          <Box>
            <Text size='lg'>Realize seu login</Text>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField placeholder="e-mail" />
            </Input>
            <Input
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
            >
              <InputField placeholder="senha" />
            </Input>
            <Center>
              <Text
                onPress={() => { }}
                underline
              >
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
              {isLoading ? <Spinner size="small" color="#fff" /> : <ButtonText>ENTRAR</ButtonText>}
            </Button>
          </Box>
        </Center>
      </VStack>
    </KeyboardAvoidingView>
  );
}
