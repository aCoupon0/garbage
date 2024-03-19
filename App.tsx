import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, Image, SafeAreaView, Pressable, Modal, FlatList, TextInput, Linking, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import * as Font from 'expo-font';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PhotoItem from './photoItem';
import { LinearGradient } from 'expo-linear-gradient';



export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTwoVisible, setModalTwoVisible] = useState(false)
  const [modal3Visible, setModal3Visible] = useState(false)
  const [careyQuantity, setCareyQuantity] = useState(0)
  const [noirQuantity, setNoirQuantity] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [delivery, setDelivery] = useState(0)

  const photos: { [key: string]: any } = {
    photo0: require('./assets/0.jpg'),
    photo1: require('./assets/1.jpg'),
    photo2: require('./assets/2.jpg'),
    photo3: require('./assets/3.jpg'),
  };


  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Bogart: require('./assets/fonts/Bogart.ttf'),
        VintageGoods: require('./assets/fonts/Vintage-Goods.otf'),
        BogartBold: require('./assets/fonts/BogartBold.ttf')
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const openModal2 = () => {
    setModalTwoVisible(true);
  };

  const closeModal2 = () => {
    setModalTwoVisible(false);
  };

  const openModal3 = () => {
    if (careyQuantity > 0 || noirQuantity > 0) {
      setModalTwoVisible(false)
      let deliveryCost = 2900 + ((careyQuantity + noirQuantity) / 2) * 1600
      setDelivery(deliveryCost)
      setModal3Visible(true);
    } else {
      Alert.alert('Por favor ingresa al menos una unidad')
    }
  }


  const closeModal3 = () => {
    setModal3Visible(false);
    setDelivery(0)
  };

  const plusCarey = () => {
    setCareyQuantity((prevQuantity) => {
      const upgrade = prevQuantity + 1;
      setTotalPrice((prevTotal) => (upgrade * 39000) + (noirQuantity * 39000));
      return upgrade;
    });
  };

  const minusCarey = () => {
    if (careyQuantity > 0) {
      setCareyQuantity((prevQuantity) => {
        const decrease = prevQuantity - 1;
        setTotalPrice((prevTotal) => (decrease * 39000) + (noirQuantity * 39000));
        return decrease;
      });
    }
  };

  const plusNoir = () => {
    setNoirQuantity((prevQuantity) => {
      const upgrade = prevQuantity + 1;
      setTotalPrice((prevTotal) => (careyQuantity * 39000) + (upgrade * 39000));
      return upgrade;
    });
  };

  const minusNoir = () => {
    if (noirQuantity > 0) {
      setNoirQuantity((prevQuantity) => {
        const decrease = prevQuantity - 1;
        setTotalPrice((prevTotal) => (careyQuantity * 39000) + (decrease * 39000));
        return decrease;
      });
    }
  };

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleAddressChange = (text: string) => {
    setAddress(text);
  };

  return (
    <ImageBackground
      source={require('./assets/BG.jpg')}
      style={styles.background}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.logoZone}>

        </View>

        <View style={styles.nameZone}>
          <Image
            source={require('./assets/line.png')}
            style={styles.line}
          />
          <Text style={styles.name}>Gafas - Estilo Vintage</Text>
        </View>

        <View style={styles.infoZone}>
          <View style={styles.infoContainer}>
            <Image
              source={require('./assets/info1.png')}
              style={styles.infoImage1}
            />
            <Image
              source={require('./assets/info2.png')}
              style={styles.infoImage2}
            />
            <Image
              source={require('./assets/info3.png')}
              style={styles.infoImage3}
            />
          </View>
          <Pressable style={styles.photoButton} onPress={openModal}>
            <Image
              source={require('./assets/camera.png')}
              style={styles.camera}
            />
            <Text style={styles.fotosTxt}>Ver fotos</Text>
          </Pressable>
        </View>
        <View style={styles.separador}></View>
        <View style={styles.infoPrecio}>
          <View style={styles.contraentregaContainer}>
            <Text style={styles.contraTxt}>Pagos Contraentrega</Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.dollarSign}>$</Text>
            <Text style={styles.price}>39.000</Text>
            <Text style={styles.currency}>COP</Text>
          </View>
        </View>
        <View style={styles.addContainer}>
          <Pressable style={styles.addButton} onPress={openModal2}>
            <Image
              source={require('./assets/cart.png')}
              style={styles.cart}
            />
            <Text style={styles.addTxt}>Comprar</Text>
          </Pressable>
        </View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <Pressable
            style={styles.closeModalOne}
            onPress={closeModal}
          >
          </Pressable>
          <View style={styles.modalOne}>
            <FlatList
              data={Object.keys(photos)}
              horizontal
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <PhotoItem source={photos[item]} />
              )}
            />
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalTwoVisible}
          onRequestClose={closeModal2}
        >
          <Pressable
            style={styles.closeModalTwo}
            onPress={closeModal2}
          >
          </Pressable>


          <View style={styles.modalTwo}>

            <View style={styles.expTxtCont}>
              <Text style={styles.expTxt}>Tenemos estos 2 modelos</Text>
              <Text style={styles.expTxt2}>¿Cuántos deseas de cada uno?</Text>
            </View>

            <View style={styles.modelMenu}>

              <View style={styles.carey}>
                <Text style={styles.careyTxt}>Carey</Text>
                <LinearGradient
                  colors={['#715140', '#C8A595']}
                  style={styles.careyContainer}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Image
                    source={require('./assets/careyModel.png')}
                    style={styles.glassePhoto}
                  />
                </LinearGradient>
                <View style={styles.careyCounter}>
                  <Pressable style={styles.changeQuantity} onPress={minusCarey}>
                    <Text style={styles.signTxt}>-</Text>
                  </Pressable>
                  <View style={styles.quantity}>
                    <Text style={styles.quantityTxt}>{careyQuantity}</Text>
                  </View>
                  <Pressable style={styles.changeQuantity} onPress={plusCarey}>
                    <Text style={styles.signTxt}>+</Text>
                  </Pressable>
                </View>
              </View>

              <View style={styles.noir}>
                <Text style={styles.careyTxt}>Noir</Text>
                <LinearGradient
                  colors={['#67759D', '#11364D']}
                  style={styles.careyContainer2}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Image
                    source={require('./assets/blackModel.png')}
                    style={styles.glassePhoto}
                  />
                </LinearGradient>
                <View style={styles.careyCounter}>
                  <Pressable style={styles.changeQuantity} onPress={minusNoir}>
                    <Text style={styles.signTxt}>-</Text>
                  </Pressable>
                  <View style={styles.quantity}>
                    <Text style={styles.quantityTxt}>{noirQuantity}</Text>
                  </View>
                  <Pressable style={styles.changeQuantity} onPress={plusNoir}>
                    <Text style={styles.signTxt}>+</Text>
                  </Pressable>
                </View>
              </View>

            </View>


            <View style={styles.priceAndConfirm}>
              <View style={styles.priceInfo}>
                <Text style={styles.priceInfoPrice2}>$</Text>
                <Text style={styles.priceInfoPrice}>{totalPrice.toLocaleString()}</Text>
                <Text style={styles.priceInfoPrice2}>COP</Text>
              </View>
              <Pressable style={styles.confirmButton} onPress={openModal3}>
                <Image
                  source={require('./assets/cart.png')}
                  style={styles.cart2}
                />
                <Text style={styles.cart2Txt}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modal3Visible}
          onRequestClose={closeModal2}
        >
          <Pressable
            style={styles.closeModalTwo}
            onPress={closeModal3}
          >
          </Pressable>


          <View style={styles.modalTwo}>
            <View style={styles.finalZone1}>

              <View style={styles.productInfo}>
                <View style={styles.productFinalPhotoCont}>
                  <Image
                    source={require('./assets/finalPhoto.jpg')}
                    style={styles.finalPhoto}
                  />
                </View>
                <View style={styles.productFinalTxtCont}>
                  <Text style={styles.finalTxt}>Gafas Vintage x {careyQuantity + noirQuantity}</Text>
                  <Text style={styles.finalTxt2}>{'$' + ' ' + totalPrice.toLocaleString()}</Text>
                </View>
              </View>

            </View>
            <View style={styles.finalZone2}>
              <TextInput
                style={styles.input1}
                placeholder="Nombre"
                placeholderTextColor="#666"
                value={name}
                onChangeText={handleNameChange}
              />
              <TextInput
                style={styles.input2}
                placeholder="Dirección"
                placeholderTextColor="#666"
                value={address}
                onChangeText={handleAddressChange}
              />
            </View>
            <View style={styles.finalZone3}>
              <View style={styles.contraentregaLine}>
                <Text style={styles.contraentregaLineTxt}>Pago Contraentrega</Text>
              </View>
              <View style={styles.infoPedidoZone}>
                <View style={styles.infoPedido1}>
                  <Text style={styles.infoPedidoTxt1}>Pedido</Text>
                  <Text style={styles.infoPedidoTxt4}>{totalPrice.toLocaleString()}</Text>
                </View>
                <View style={styles.infoPedido2}>
                  <Text style={styles.infoPedidoTxt2}>Envio</Text>
                  <Text style={styles.infoPedidoTxt5}>{delivery.toLocaleString()}</Text>
                </View>
                <View style={styles.infoPedido3}>
                  <Text style={styles.infoPedidoTxt3}>TOTAL</Text>
                  <Text style={styles.infoPedidoTxt6}>{(totalPrice + delivery).toLocaleString()}</Text>
                </View>
              </View>
            </View>

            <View style={styles.finalZone4}>
              <View style={styles.ignorar}></View>
              <View style={styles.finalView}>
                <Pressable
                  onPress={() => {
                    if (
                      name.trim().length > 0 &&
                      address.trim().length >= 10 &&
                      (careyQuantity > 0 || noirQuantity > 0)
                    ) {
                      let message = `*${name}*
${address}`;

                      if (careyQuantity > 0) {
                        message += `\nModelo Carey: ${careyQuantity}`;
                      }

                      if (noirQuantity > 0) {
                        message += `\nModelo Noir: ${noirQuantity}`;
                      }

                      message += `\nCobro: ${(totalPrice + delivery).toLocaleString()}
*Envía este mensaje para confirmar*`;

                      const url = `https://wa.me/573058376094?text=${encodeURIComponent(message)}`;
                      Linking.openURL(url);
                    } else {
                      Alert.alert('Por favor llena todos los campos')
                    }
                  }}
                  style={styles.sendButton}
                >
                  <Image
                    source={require('./assets/waIMG.png')}
                    style={styles.waPhoto}
                  />
                  <Text style={styles.sendButtonTxt}>Pedir</Text>
                </Pressable>
              </View>
            </View>

          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%', 
    height: '100%' // O 'contain' si prefieres otro tipo de escalado
  },
  container: {
    flex: 1, // Puedes ajustar la opacidad aquí si lo deseas
  },
  logoZone: {
    width: '100%',
    height: '13%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center'
  },
  logo: {
    width: '18%',
    height: '65%',
    marginLeft: '6%'
  },
  nameZone: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  line: {
    width: '20%',
    height: '50%'
  },
  name: {
    fontFamily: 'Bogart',
    fontSize: 22.5,
    color: 'white'
  },
  infoZone: {
    width: '100%',
    height: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoContainer: {
    width: '90%',
    height: '45%',
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  infoImage1: {
    height: '75%',
    width: '18%',
    marginLeft: 15
  },
  infoImage2: {
    height: '80%',
    width: '28%'
  },
  infoImage3: {
    height: '75%',
    width: '18%',
    marginRight: 15
  },
  photoButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    width: '35%',
    height: '20%',
    margin: 15,
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  fotosTxt: {
    fontFamily: 'Bogart',
    fontSize: 19,
    marginLeft: 10
  },
  camera: {
    width: '20%',
    height: '50%'
  },
  separador: {
    width: '100%',
    height: '8%',
  },
  infoPrecio: {
    width: '100%',
    height: '15%',
  },
  contraentregaContainer: {
    width: '100%',
    height: '33%',
    backgroundColor: 'rgba(53, 216, 244, 0.39)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  contraTxt: {
    fontFamily: 'Bogart',
    fontSize: 20,
    color: 'white'
  },
  priceContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 1
  },
  dollarSign: {
    color: 'white',
    fontFamily: 'Bogart',
    marginRight: 15,
    fontSize: 23
  },
  price: {
    color: 'white',
    fontFamily: 'Bogart',
    fontSize: 45
  },
  currency: {
    color: 'white',
    fontFamily: 'Bogart',
    marginLeft: 15,
    fontSize: 23
  },
  addContainer: {
    width: '100%',
    height: '10%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  },
  addButton: {
    width: '50%',
    height: '85%',
    backgroundColor: '#A6E1E0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 15
  },
  cart: {
    width: '18%',
    height: '50%'
  },
  addTxt: {
    fontFamily: 'Bogart',
    fontSize: 27,
    marginLeft: 17
  },
  closeModalOne: {
    width: '100%',
    height: '47%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOne: {
    flex: 1,
    height: '53%',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  photoItem: {
    width: '80%',
    height: '90%'
  },
  closeModalTwo: {
    width: '100%',
    height: '18%'
  },
  modalTwo: {
    width: '100%',
    height: '82%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'black',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25
  },
  modelMenu: {
    width: '100%',
    height: '60%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  carey: {
    height: '100%',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  noir: {
    height: '100%',
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  careyTxt: {
    color: 'white',
    fontFamily: 'Bogart',
    fontSize: 20,
    opacity: 0.5
  },
  careyContainer: {
    width: '79%',
    height: '51%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    margin: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  careyContainer2: {
    width: '79%',
    height: '51%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    margin: 7,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  careyCounter: {
    width: '60%',
    height: '12%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  changeQuantity: {
    height: '100%',
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  quantity: {
    height: '100%',
    width: '33%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signTxt: {
    fontFamily: 'Bogart',
    color: 'white',
    fontSize: 39
  },
  quantityTxt: {
    fontFamily: 'Bogart',
    color: 'white',
    fontSize: 25
  },
  glassePhoto: {
    width: '100%',
    height: '80%'
  },
  complements: {
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  complementsTitle: {
    width: '100%',
    height: '5%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  complementsTitleTxt: {
    fontFamily: 'Bogart',
    color: 'white',
    fontSize: 16,
    marginLeft: 15,
    bottom: '-6%'
  },
  complementsPhotoContainer: {
    width: '90%',
    height: '75%',
  },
  complementBG: {
    flex: 1,
  },
  priceAndConfirm: {
    width: '100%',
    height: '9%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  priceInfo: {
    width: '50%',
    height: '100%',
    backgroundColor: '#FAF3F3',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1
  },
  confirmButton: {
    width: '50%',
    height: '100%',
    backgroundColor: '#A6E1E0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  priceInfoPrice: {
    fontFamily: 'Bogart',
    fontSize: 28,
    color: 'black',
    margin: 7
  },
  priceInfoPrice2: {
    fontFamily: 'Bogart',
    fontSize: 15,
    color: 'black'
  },
  cart2: {
    width: '13%',
    height: '44%'
  },
  cart2Txt: {
    fontFamily: 'Bogart',
    color: 'black',
    fontSize: 20,
    margin: 13
  },
  finalZone1: {
    width: '100%',
    height: '24%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalZone2: {
    width: '100%',
    height: '25%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalZone3: {
    width: '100%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  finalZone4: {
    width: '100%',
    height: '15%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  productInfo: {
    width: '80%',
    height: '65%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 30,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

  },
  productFinalPhotoCont: {
    height: '100%',
    width: '31%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productFinalTxtCont: {
    height: '100%',
    width: '69%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  finalPhoto: {
    height: '100%',
    width: '100%',
    borderRadius: 30,
  },
  finalTxt: {
    fontFamily: 'Bogart',
    fontSize: 20,
    fontWeight: '900',
    color: 'white'
  },
  finalTxt2: {
    fontFamily: 'Bogart',
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    marginTop: 11
  },
  input1: {
    backgroundColor: 'white',
    textAlign: 'center',
    width: '50%',
    height: '33%',
    borderRadius: 20,
    margin: 7,
    fontFamily: 'Bogart',
    fontSize: 18
  },
  input2: {
    backgroundColor: 'white',
    textAlign: 'center',
    width: '70%',
    height: '33%',
    borderRadius: 20,
    margin: 7,
    fontFamily: 'Bogart',
    fontSize: 18,
    marginBottom: 30
  },
  contraentregaLine: {
    width: '100%',
    height: '20%',
    backgroundColor: '#0CC0DF',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  infoPedidoZone: {
    width: '100%',
    height: '80%',
  },
  contraentregaLineTxt: {
    fontFamily: 'BogartBold',
    color: 'white',
    fontSize: 18
  },
  infoPedido1: {
    width: '100%',
    height: '28%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 12
  },
  infoPedido2: {
    width: '100%',
    height: '28%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoPedido3: {
    width: '100%',
    height: '28%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  infoPedidoTxt1: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Bogart',
    fontSize: 18,
    marginLeft: 18
  },
  infoPedidoTxt2: {
    color: '#4C7B00',
    fontFamily: 'Bogart',
    fontSize: 18,
    marginLeft: 18
  },
  infoPedidoTxt3: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Bogart',
    fontSize: 18,
    marginLeft: 18
  },
  infoPedidoTxt4: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Bogart',
    fontSize: 20,
    marginLeft: 68
  },
  infoPedidoTxt5: {
    color: '#4C7B00',
    fontFamily: 'Bogart',
    fontSize: 20,
    marginLeft: 68
  },
  infoPedidoTxt6: {
    color: 'rgba(255, 255, 255, 1)',
    fontFamily: 'Bogart',
    fontSize: 20,
    marginLeft: 68
  },
  ignorar: {
    height: '100%',
    width: '55%'
  },
  finalView: {
    height: '100%',
    width: '45%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  sendButton: {
    width: '85%',
    height: '65%',
    backgroundColor: '#A6E1E0',
    borderRadius: 17,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  waPhoto: {
    width: '15%',
    height: '45%'
  },
  sendButtonTxt: {
    marginLeft: 15,
    color: 'black',
    fontFamily: 'Bogart',
    fontSize: 25,
    marginTop: 5
  },
  expTxt: {
    color: 'white',
    fontFamily: 'Bogart',
    fontSize: 19,
    marginTop: 10
  },
  expTxt2: {
    color: 'skyblue',
    fontFamily: 'Bogart',
    fontSize: 22,
    marginTop: 7,
    textShadowColor: 'rgba(0, 191, 255, 0.8)', // Azul celeste tenue con opacidad
    textShadowOffset: { width: 2, height: 3 }, // Desplazamiento de la sombra
    textShadowRadius: 6,
  },
  expTxtCont: {
    width: '100%',
    height: '9%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 18
  },
});
