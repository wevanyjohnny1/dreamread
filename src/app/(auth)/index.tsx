import React, { useCallback, useRef, useState } from 'react';
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
  ImageBackground,
} from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/Ionicons';
import userService from '@/services/user-service';
import { handleChangeCPFtoCNPJ } from 'utils/general';
import SmallLogo from '../../../assets/images/logomobile.png';
import LogoBackground from '../../../assets/images/logobackground.jpeg';
import { Input } from '@/components/ui/input';
import toast from '@/components/Toast';
import { Center } from '@/components/ui/center';
import { VStack } from '@/components/ui/v-stack';
import { Box } from '@/components/ui/box';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { HStack } from '@/components/ui/h-stack';
import { Button, ButtonText } from '@/components/ui/button';

export default function SignIn() {
  const router = useRouter();
  const [doc, setLogin] = useState('');
  const [password, setSenha] = useState('');
  const [seePasswordFlag, setSeePasswordFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const passwordInputRef = useRef();

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      await userService.signIn(doc, password);
      router.replace('/(drawer)');
    } catch (err: any) {
      console.error('Could not Login, error: ', err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCpfCnpjChange = useCallback((event: any) => {
    const data = handleChangeCPFtoCNPJ(event);
    setLogin(data);
  }, []);

  const handlePasswordIconPress = useCallback(() => {
    setSeePasswordFlag(value => !value);
  }, []);

  const handlePassFocus = useCallback(() => {
    // @ts-ignore
    passwordInputRef.current.focus();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <VStack>
        <Center>
          <Box style={styles.smallLogoContainer}>
            <Image
              source={SmallLogo}
              resizeMode="contain"
              style={styles.smallLogo}
            />
          </Box>
          <Center>
            <Text size='2xl'>Bem vindo</Text>
            <Text size='xl'>Ao Vida do Touro</Text>
          </Center>

          <ImageBackground
            source={LogoBackground}
            resizeMode="contain"
            style={styles.logobackground}
          >
            <Box>
              <Text size='lg'>Realize seu login</Text>
              <Input
                placeholder="CPF/CNPJ"
                style={styles.input}
                onChangeText={handleCpfCnpjChange}
                value={doc}
                onSubmitEditing={handlePassFocus}
              />
              <HStack
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: 300,
                  borderRadius: 8,
                }}
              >
                <Input
                  // @ts-ignore
                  ref={passwordInputRef}
                  placeholder="Confirmar Senha"
                  value={password}
                  onChangeText={text => setSenha(text)}
                  secureTextEntry={seePasswordFlag}
                  style={styles.input}
                  autoCapitalize={'none'}
                  onSubmitEditing={handleSubmit}
                />
                <Icon
                  name={seePasswordFlag ? 'eye-off-outline' : 'eye-outline'}
                  size={16}
                  color="black"
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 25,
                    alignSelf: 'center',
                    opacity: 0.4,
                    justifyContent: 'center',
                  }}
                  onPress={handlePasswordIconPress}
                />
              </HStack>
              <Center>
                <Text
                  onPress={() => router.push('/(auth)/reset-password')}
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
          </ImageBackground>
        </Center>
      </VStack>
    </KeyboardAvoidingView>
  );
}
