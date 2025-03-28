import { useEffect } from "react";
import { useRouter } from "expo-router";
import { View, ActivityIndicator } from "react-native";
import { useUserStore } from "@/stores/user-store";

export default function Index() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (user?.id) {
        router.replace("/(drawer)");
      } else {
        router.replace("/(auth)");
      }
    }, 50);

    return () => clearTimeout(timeoutId);
  }, [user]);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  );
}
