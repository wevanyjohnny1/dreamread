// CustomTabBar.tsx
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Text } from '@/components/ui/Text';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

const CustomTabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ paddingBottom: insets.bottom }}
      className="flex-row bg-background-dark border-t border-gray-600"
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const renderLabel = () => {
          if (typeof label === 'function') {
            return label({
              focused: isFocused,
              color: isFocused ? 'blue' : 'gray',
              position: 'below-icon',
              children: route.name,
            });
          }
          return label;
        };

        const renderIcon = () => {
          if (typeof options.tabBarIcon === 'function') {
            return options.tabBarIcon({
              focused: isFocused,
              color: isFocused ? 'text-primary-500' : 'text-gray-400',
              size: 24,
            });
          }
          return null;
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center mt-2"
          >
            {renderIcon()}
            <Text className={`text-base ${isFocused ? 'text-primary-500 font-bold' : 'text-gray-400'}`}>
              {renderLabel()}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CustomTabBar;
