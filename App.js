import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const RoundedButton = ({ text, onPress, color }) => (
  <TouchableOpacity style={[styles.button, { backgroundColor: color }]} onPress={onPress}>
    <Text style={styles.buttonText}>{text}</Text>
  </TouchableOpacity>
);

const LEDControlApp = () => {
  const [ledStatus, setLedStatus] = useState('LedOff.png');

  const turnOnLed = () => {
    sendCommand('1');
    updateLedImage('LedOn.png');
  };

  const turnOffLed = () => {
    sendCommand('0');
    updateLedImage('LedOff.png');
  };

  const sendCommand = async (status) => {
    const url = `https://app.brandonperez.online/iot/backend/setLed.php?setstatus=${status}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        console.log(`Comando enviado: ${status}`);
      } else {
        console.log(`Error al enviar el comando. Código de estado: ${response.status}`);
      }
    } catch (error) {
      console.log(`Error de conexión: ${error.message}`);
    }
  };

  const updateLedImage = (source) => {
    setLedStatus(source);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de LED por WiFi</Text>
      <Image source={{ uri: ledStatus }} style={styles.ledImage} />
      <RoundedButton text="Encender LED" onPress={turnOnLed} color="#10bb65" />
      <RoundedButton text="Apagar LED" onPress={turnOffLed} color="#fa6543" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#173b5e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  title: {
    fontSize: 30,
    color: 'white',
    marginBottom: 20,
  },
  ledImage: {
    width: '100%',
    height: 150,
    marginBottom: 20,
  },
  button: {
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 25,
    textAlign: 'center',
  },
});

export default LEDControlApp;
