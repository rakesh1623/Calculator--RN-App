import React, { useRef, useState } from 'react'
import { ToastAndroid, Text, View,Dimensions, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Iconicons from 'react-native-vector-icons/Ionicons'
import Clipboard from '@react-native-clipboard/clipboard';


type RootStackParamList = {
  Home: undefined;
  Binary: undefined; // Add other screens as needed
};

type Props = NativeStackScreenProps<RootStackParamList, 'Binary'>;

const inputTypes = [{ type: "Binary" }, { type: "Decimal" }]
const operators = [{ oper: "ADD" }, { oper: "SUB" }, { oper: "XOR" }, { oper: "OR" }, { oper: "AND" }]

const BinaryScreen: React.FC<Props> = ({ navigation }) => {
  const [activeOne, setActiveOne] = useState("");
  const [activeOneSecond, setActiveOneSecond] = useState("");
  const [bin, setBin] = useState(false)
  const [dec, setDec] = useState(false)
  const [binSecond, setBinSecond] = useState(false)
  const [decSecond, setDecSecond] = useState(false)
  const [binValue, setBinValue] = useState('')
  const [decValue, setDecValue] = useState('')
  const [binSecondValue, setBinSecondValue] = useState('')
  const [decSecondValue, setDecSecondValue] = useState('')
  const [ans, setAns] = useState('')
  const [err, setErr] = useState(false)
  const [binary, setBinary] = useState("");
  const [decimal, setDecimal] = useState("");
  const [hexaDecimal, setHexaDecimal] = useState("")
  const [octaDecimal, setOctaDecimal] = useState("")

  // const bin = useRef(false)
  // const dec = useRef(false)
  const operations = useRef('')

  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  const calcAns = () => {
    console.log(binValue)
    console.log(binSecondValue)
    console.log(operations.current)


    // add

    const num1 = parseInt(binValue, 2);
    const num2 = parseInt(binSecondValue, 2);

    if (operations.current == "ADD") {

      setDecimal((num1 + num2).toString())
      setBinary((num1 + num2).toString(2));
      setHexaDecimal((num1 + num2).toString(16));
      setOctaDecimal((num1 + num2).toString(8));
    }
    else if (operations.current == "SUB") {

      setDecimal((num1 - num2).toString())
      setBinary((num1 - num2).toString(2));
      setHexaDecimal((num1 - num2).toString(16));
      setOctaDecimal((num1 - num2).toString(8));
    }
    else if (operations.current == "XOR") {
      setDecimal((num1 ^ num2).toString())
      setBinary((num1 ^ num2).toString(2))
      setHexaDecimal((num1 ^ num2).toString(16))
      setOctaDecimal((num1 ^ num2).toString(8))
    }
    else if (operations.current == "OR") {
      setDecimal((num1 | num2).toString())
      setBinary((num1 | num2).toString(2))
      setHexaDecimal((num1 | num2).toString(16))
      setOctaDecimal((num1 | num2).toString(8))
    }
    else if (operations.current == "AND") {
      setDecimal((num1 & num2).toString())
      setBinary((num1 & num2).toString(2))
      setHexaDecimal((num1 & num2).toString(16))
      setOctaDecimal((num1 & num2).toString(8))
    }
  }

  const setValuesAndError = (val: any, type: any, num: any) => {

    const regex = /[^01]/;

    // console.log(typeof(val), typeof(type), typeof(num));
    setBinValue(val);

    if (type == "binary") {
      if (num == "first") {
        // console.log(val)
        if (regex.test(val)) {
          setErr(true)
        } else {
          setBinValue(val);
          let newVal = parseInt(val, 2);
          setDecValue(newVal.toString());
        }
      }
    }
  }
  const setValuesAndErrorSecond = (val: any, type: any, num: any) => {

    const regex = /[^01]/;

    // console.log(typeof(val), typeof(type), typeof(num));
    // setBinValue

    if (type == "binary") {
      if (num == "second") {
        // console.log(val)
        if (regex.test(val)) {
          setErr(false)
        } else {
          setBinSecondValue(val);
          let newVal = parseInt(val, 2);
          setDecSecondValue(newVal.toString());
        }
      }
    }
  }

  const setDectoBinaryValue = (newValue: any) => {

    setDecValue(newValue);
    let decimalNumber = parseInt(newValue, 10);
    setBinValue(decimalNumber.toString(2))

  }
  const setDectoBinaryValueSecond = (newValue: any) => {

    setDecSecondValue(newValue);
    let decimalNumber = parseInt(newValue, 10);
    setBinSecondValue(decimalNumber.toString(2))

  }

  const copyDecimal = () => {
    Clipboard.setString(decimal)
    ToastAndroid.showWithGravity(
      'Copied to Clipboard',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  const copyBinary = () => {
    Clipboard.setString(binary)
    ToastAndroid.showWithGravity(
      'Copied to Clipboard',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  const copyHexaDecimal = () => {
    Clipboard.setString(hexaDecimal)
    ToastAndroid.showWithGravity(
      'Copied to Clipboard',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }
  const copyoctal = () => {
    Clipboard.setString(octaDecimal)
    ToastAndroid.showWithGravity(
      'Copied to Clipboard',
      ToastAndroid.SHORT,
      ToastAndroid.CENTER,
    );
  }

  

  return (
    <View style={{height:windowHeight, width:windowWidth
    }} className='flex-1 bg-black'>
      <View className='flex-row mt-3 '>
        <Iconicons onPress={() => navigation.navigate('Home')} name='chevron-back' color={'white'} size={32} />
        <Text style={{color:'rgba(255,255,255,.7)'}} className='text-center text-3xl relative mx-auto '>Binary Calculator</Text>
      </View>


      <View className='flex-row bg-slate-200 mx-2 py-2 rounded-md justify-around items-center mt-12'>

        <SelectDropdown
          data={inputTypes}

          onSelect={(selectedItem, index) => {
            if (selectedItem.type == "Binary") {
              setBin(true)
              setDec(false)
              setActiveOne("binary")
            } else if (selectedItem.type == "Decimal") {
              setBin(false)
              setDec(true)
              setActiveOne("decimal")
            }
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {

            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <Text style={styles.dropdownButtonIconStyle}>{selectedItem.type}</Text>
                )}
                {!selectedItem && (
                  <Text style={styles.dropdownButtonIconStyle}>Select</Text>
                )}

                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{item.type}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
        <View >
          <Text className='text-lg mb-2 text-black font-bold'>Binary</Text>
          <TextInput editable={bin} value={binValue} onChangeText={(newValue) => setValuesAndError(newValue, "binary", "first")} style={{ backgroundColor: 'rgba(0,0,0,.8)', borderWidth: 3, borderColor: activeOne == "binary" ? '#07b32f' : '#e2e8f0' }} className=' w-24 h-12 rounded-lg text-white text-xl' keyboardType='numeric' ></TextInput>
          <Text style={{ color: err ? 'red' : '#e2e8f0' }} className='mt-1 font-bold'>only 0's and 1's</Text>
        </View>
        <View>
          <Text className='text-lg mb-2 text-black font-bold'>
            Decimal
          </Text>
          <View className=''>

            <TextInput editable={dec} value={decValue} onChangeText={(newValue) => setDectoBinaryValue(newValue)} style={{
              backgroundColor: 'rgba(0,0,0,.8)', borderWidth: 3, borderColor: activeOne == "decimal" ? '#07b32f' : '#e2e8f0'
            }} className={` w-24 h-12 rounded-lg text-white text-xl `} keyboardType='numeric' ></TextInput>
          </View>
          <Text style={{ color: '#e2e8f0' }} className='mt-1 font-bold'>only 0's and 1's</Text>
        </View>
      </View>

      <View className='flex-row bg-slate-200 mx-2 py-2 rounded-md justify-around items-center mt-8'>

        <SelectDropdown
          data={inputTypes}

          onSelect={(selectedItem, index) => {
            if (selectedItem.type == "Binary") {
              // console.log("yeah")
              setBinSecond(true)
              setDecSecond(false)
              setActiveOneSecond("binary")
            } else if (selectedItem.type == "Decimal") {
              setBinSecond(false)
              setDecSecond(true)
              setActiveOneSecond("decimal")
            }
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {

            return (
              <View style={styles.dropdownButtonStyle}>
                {selectedItem && (
                  <Text style={styles.dropdownButtonIconStyle}>{selectedItem.type}</Text>
                )}
                {!selectedItem && (
                  <Text style={styles.dropdownButtonIconStyle}>Select</Text>
                )}

                <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{item.type}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />

        <View >
          <Text className='text-lg mb-2 text-black font-bold'>Binary</Text>
          <TextInput editable={binSecond} value={binSecondValue} onChangeText={(newValue) => setValuesAndErrorSecond(newValue, "binary", "second")} style={{ backgroundColor: 'rgba(0,0,0,.8)' , borderWidth:3, borderColor: activeOneSecond == "binary" ? '#07b32f' : '#e2e8f0'}} className=' w-24 h-12 rounded-lg text-white text-xl' keyboardType='numeric' ></TextInput>
          <Text style={{ color: '#e2e8f0' }} className='mt-1 font-bold'>only 0's and 1's</Text>
        </View>
        <View>
          <Text className='text-lg mb-2 text-black font-bold'>
            Decimal
          </Text>
          <TextInput editable={decSecond} value={decSecondValue} onChangeText={(newValue) => setDectoBinaryValueSecond(newValue)} style={{ backgroundColor: 'rgba(0,0,0,.8)', borderWidth:3, borderColor: activeOneSecond == "decimal" ? '#07b32f':'#e2e8f0' }} className={` w-24 h-12 rounded-lg text-white text-xl`} keyboardType='numeric' ></TextInput>
          <Text style={{ color: '#e2e8f0' }} className='mt-1 font-bold'>only 0's and 1's</Text>
        </View>
      </View>


      <View className='justify-center  items-center mt-8'>
        <SelectDropdown
          data={operators}

          onSelect={(selectedItem, index) => {
            if (selectedItem.oper == "ADD") {
              operations.current = "ADD";
              console.log("add")
            } else if (selectedItem.oper == "SUB") {
              operations.current = "SUB";
              console.log("sub")
            }
            else if (selectedItem.oper == "XOR") {
              operations.current = "XOR";
              console.log("xor")
            }
            else if (selectedItem.oper == "OR") {
              operations.current = "OR";
              console.log("or")
            }
            else if (selectedItem.oper == "AND") {
              operations.current = "AND";
              console.log("and")
            }
          }}
          renderButton={(selectedItem, isOpened) => {

            return (
              <View>
                <Text style={{color:'rgba(255,255,255,.7)'}} className='items-center mx-auto mb-3 text-xl font-bold '>Operators</Text>
                <View style={[styles.dropdownButtonStyle, { height: 40 }]}>

                  {selectedItem && (
                    <Text style={styles.dropdownButtonIconStyle}>{selectedItem.oper}</Text>
                  )}
                  {!selectedItem && (
                    <Text style={[styles.dropdownButtonIconStyle, { fontSize: 20 }]}>Select</Text>
                  )}

                  <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} style={styles.dropdownButtonArrowStyle} />
                </View>
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                <Text style={styles.dropdownItemTxtStyle}>{item.oper}</Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          dropdownStyle={styles.dropdownMenuStyle}
        />
      </View>


      <TouchableOpacity onPress={calcAns} className='items-center mt-5 bg-orange-700 rounded-xl w-20 mx-auto'>
        <View className=' '>
          <Text className='text-4xl'>=</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.container}>
        <Text  style={styles.header}>Answer</Text>


        <View style={styles.row}>
          <Text style={styles.label}>Binary</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <View style={{}}>
              <Text style={styles.scrollText}>{binary}</Text>
            </View>
          </ScrollView>
          <TouchableOpacity onPress={copyBinary} style={styles.button}>
            <Text style={styles.buttonText}>copy</Text>
          </TouchableOpacity>
        </View>
        <View className='mt-2' style={styles.row}>
          <Text style={styles.label}>Decimal</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <Text style={styles.scrollText}>{decimal}</Text>
          </ScrollView>
          <TouchableOpacity onPress={copyDecimal} style={styles.button}>
            <Text style={styles.buttonText}>copy</Text>
          </TouchableOpacity>
        </View>

        <View className='mt-2' style={styles.row}>
          <Text style={styles.label}>OctDec</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <Text style={styles.scrollText}>{octaDecimal}</Text>
          </ScrollView>
          <TouchableOpacity onPress={copyoctal} style={styles.button}>
            <Text style={styles.buttonText}>copy</Text>
          </TouchableOpacity>
        </View>


        <View className='mt-2' style={styles.row}>
          <Text style={styles.label}>HexaDec</Text>
          <ScrollView horizontal={true} style={styles.scrollView}>
            <Text style={styles.scrollText}>{hexaDecimal}</Text>
          </ScrollView>
          <TouchableOpacity onPress={copyHexaDecimal} style={styles.button}>
            <Text style={styles.buttonText}>copy</Text>
          </TouchableOpacity>
        </View>



      </View>




    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Equivalent to 'items-center'
    marginTop: 20, // Equivalent to 'mt-8'
    // Adjust spacing between children using padding or margin in children instead of 'space-y-*'
  },
  header: {
    fontSize: 24, // Equivalent to 'text-xl'
    fontWeight: 'bold', // Equivalent to 'font-bold'
    marginBottom: 12, // Adjust space between elements
    color:'rgba(255,255,255,.7)'
  },
  row: {
    flexDirection: 'row', // Equivalent to 'flex-row'
    alignItems: 'center', // Equivalent to 'items-center'
    justifyContent: 'space-between', // Adjusted for React Native. Consider your layout needs.
    width: '100%', // Ensure the row takes full width to space items correctly
    paddingHorizontal: 16, // Adjust as needed for your layout
  },
  label: {
    fontSize: 16, // Equivalent to 'text-xl'
    width: 64,
    color:'white'
    // Equivalent to 'font-bold'
  },
  scrollView: {
    // Define styles specific to the ScrollView if needed
    marginHorizontal: 16,
    borderRadius: 2,
    backgroundColor: 'black',
    borderWidth: 2,
    borderColor: 'gray'
  },
  scrollText: {
    fontSize: 18, // Equivalent to 'text-xl'
    color: 'white', // Equivalent to 'text-black'
    paddingHorizontal: 8, // Equivalent to 'px-2'
    paddingVertical: 4, // Equivalent to 'py-1'
    backgroundColor: 'black',

    // Width and height might not be necessary here, depending on your layout
  },
  button: {
    backgroundColor: 'white', // Equivalent to 'bg-white'
    borderRadius: 10
    // Adjust button styles as needed
  },
  buttonText: {
    color: 'green', // Equivalent to 'text-black'
    paddingHorizontal: 8, // Equivalent to 'px-2'
    paddingVertical: 4, // Equivalent to 'py-1'
    fontSize: 18, // Equivalent to 'text-lg'
    fontWeight: 'bold',
  },
  dropdownButtonStyle: {
    width: 120,
    height: 30,
    backgroundColor: 'green',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'white',
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
    color: 'white',
  },
  dropdownButtonIconStyle: {
    fontSize: 17,
    marginRight: 8,
    color: 'white'
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
  },
  dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  dropdownItemIconStyle: {
    fontSize: 28,
    marginRight: 8,
  },
});

export default BinaryScreen