import React, { useEffect, useState } from 'react';
import { Button, TouchableOpacity, ScrollView, DeviceEventEmitter } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Voice from '@react-native-voice/voice';
import SoundPlayer from 'react-native-sound-player';
import { Box } from '@/components/ui/Box';
import { Text } from '@/components/ui/Text';
import { useRouter } from 'expo-router';
import { Icon } from '@/components/ui/Icon';
import { ArrowLeft } from 'lucide-react-native';
import { Heading } from '@/components/ui/Heading';

export default function History() {
  const router = useRouter();
  const [started, setStarted] = useState(false);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startSpeechToText = async () => {
    try {
      await Voice.start("pt-BR");
      setStarted(true);
    } catch (e) {
      console.error(e);
    }
  };

  const stopSpeechToText = async () => {
    try {
      await Voice.stop();
      setStarted(false);
    } catch (e) {
      console.error(e);
    }
  };

  const playRainSound = async () => {
    try {
      await stopSpeechToText();
      const subscription = DeviceEventEmitter.addListener('FinishedPlaying', () => {
        startSpeechToText();
        subscription.remove();
      });
      SoundPlayer.playSoundFile('rain', 'mp3');
    } catch (error) {
      console.log("Erro ao reproduzir o som:", error);
    }
  };

  const onSpeechResults = (result: any) => {
    const spokenPhrases = result.value;
    console.log('result', result);
    setResults(spokenPhrases);
    if (spokenPhrases.some((phrase: string) => phrase.toLowerCase().includes("começou a chover"))) {
      console.log("falou a palavra");
      playRainSound();
    }
  };

  const onSpeechError = (error: any) => {
    console.log(error);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-dark">
      <ScrollView contentContainerStyle={{ padding: 20 }} className="flex-1">
        <Box className="mb-4">
          <TouchableOpacity onPress={() => router.back()} className="flex-row items-center">
            <Icon as={ArrowLeft} size="md" className="text-white" />
            <Text className="text-white ml-2">voltar</Text>
          </TouchableOpacity>
        </Box>

        <Box className="mb-8">
          <Heading className="text-center">
            titulo da história
          </Heading>
        </Box>

        <Box className="mb-4">
          <Text className="text-white text-base mb-2">
            Era uma vez um pequeno vilarejo onde os moradores viviam em perfeita harmonia com a natureza. Todos os dias, eles se reuniam para celebrar a vida e compartilhar histórias de tempos antigos.
          </Text>
          <Text className="text-white text-base">
            Durante uma dessas histórias, <Text className="font-bold">começou a chover</Text> de maneira inesperada, trazendo um sentimento de renovação e magia ao ambiente. A chuva transformou o cenário, fazendo com que cada detalhe ganhasse um novo brilho.
          </Text>
        </Box>

        {!started ? (
          <Button title="Start Speech to Text" onPress={startSpeechToText} />
        ) : (
          <Button title="Stop Speech to Text" onPress={stopSpeechToText} />
        )}

        {results.map((result, index) => (
          <Text key={index} className="text-white text-sm mt-1">
            {result}
          </Text>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
