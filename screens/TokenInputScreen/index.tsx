import React, {useState} from 'react';
import {Alert, StyleSheet, TextInput, View} from 'react-native';
import {Button, Text, YStack} from 'tamagui';
import {apiClient} from '../../services/api';

interface TokenInputScreenProps {
  onTokenSaved: () => void;
}

const TokenInputScreen: React.FC<TokenInputScreenProps> = ({onTokenSaved}) => {
  const [token, setToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveToken = async () => {
    if (!token.trim()) {
      Alert.alert('Error', 'Please enter a valid access token');
      return;
    }

    setIsLoading(true);
    try {
      // Save token using the API client
      await apiClient.setToken(token.trim());

      // Notify parent component that token is saved
      onTokenSaved();
    } catch (error) {
      console.error('Error saving token:', error);
      Alert.alert('Error', 'Failed to save token. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <YStack gap={20} padding={20} maxWidth={600} width="100%">
        <Text fontSize={24} fontWeight="bold" textAlign="center">
          Welcome to KLMS App
        </Text>

        <Text fontSize={16} textAlign="center">
          Please enter your Canvas LMS access token to continue
        </Text>

        <TextInput
          style={styles.input}
          value={token}
          onChangeText={setToken}
          placeholder="Enter your access token"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <Button
          onPress={handleSaveToken}
          disabled={isLoading}
          themeInverse
        >
          {isLoading ? 'Saving...' : 'Save Token'}
        </Button>

        <Text fontSize={14} textAlign="center" opacity={0.7}>
          You can find your access token in Canvas LMS settings.
          {"Go to Account > Settings > Approved Integrations > New Access Token."}
        </Text>
      </YStack>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
});

export default TokenInputScreen;
