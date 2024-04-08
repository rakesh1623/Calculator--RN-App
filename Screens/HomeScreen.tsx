import React, { useState,useRef } from 'react';
import { View, Dimensions, Text } from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '../components/CustomButton';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
    Home: undefined;
    Binary: undefined; // Add other screens as needed
  };
  
  type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen: React.FC<Props> = ({navigation}) => {


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;
  
    const [calculation, setCalculation] = useState('');
    const[answer , setAnswer] = useState('')
    const [left ,setLeft] = useState('');
    const [right,setRight] = useState('');
    const [fillRight , setFillRight] = useState(false)
    // const [operator , setOperator] = useState('')
  
    function isOperator(value:any) {
      const operators = ['+', '-', '÷', '×'];
      return operators.includes(value);
    }
  
    const frRef = useRef(false);
    const leftSide = useRef('0')
    const rightSide = useRef('0')
    const operator = useRef('')
    const ans = useRef('0')
    const cal = useRef('')
    const count = useRef(0)
    const flag = useRef(false)


    const calc =(val:any)=>{

        //no double operator
        if(calculation[calculation.length-1] == '÷' || calculation[calculation.length-1] == '×' || calculation[calculation.length-1] == '-'  || calculation[calculation.length-1] == '+' || calculation[calculation.length-1] == '^' ){
          if(val == '÷' || val=='×' || val == '-' || val == '+' || val == '%' || val == '^'){
            let ans = calculation.slice(0,-1);
            ans = ans+val;
            operator.current = val;
            return setCalculation(ans)
    
          }
        }
    
        if(val == '+' || val == '-' || val == '÷' || val == '×' || val == '%' || val =='^'){
          operator.current = val;
          count.current = count.current +1;
          rightSide.current = '0';
          frRef.current = true;
          if(count.current>1){
            leftSide.current = ans.current;
          }
          return setCalculation(calculation+val);
        }
    
        if(count.current>1){
          rightSide.current = rightSide.current + val;
        }else{
          if(frRef.current){
            rightSide.current = rightSide.current + val;
            console.log("first right" , rightSide);
          }else{
            leftSide.current = leftSide.current + val;
            console.log("first left" , leftSide)
          }
        }
    
        if(frRef.current){
          console.log("ans start");
          let num1 = Number(leftSide.current);
          let num2 = Number(rightSide.current);
    
          console.log(num1 , num2 , operator.current);
    
          if(operator.current == '+'){
            ans.current = (num1 + num2).toString();
            setAnswer(ans.current);
          }
          else if (operator.current == '-'){
            ans.current  = (num1 - num2).toString();
            setAnswer(ans.current);
          }else if(operator.current == '÷'){
            ans.current  = (num1 / num2).toString();
            setAnswer(ans.current);
          }
          else if(operator.current == '×'){
            ans.current  = (num1 * num2).toString();
            setAnswer(ans.current);
          }
          else if(operator.current == '%'){
            let a = num1/num2;
            a = a*100;
            ans.current  = (a).toString();
            setAnswer(ans.current);
          }
          else if(operator.current == '^'){
            let a = Math.pow(num1,num2);
            ans.current =(a).toString();
            setAnswer(ans.current);
          }
    
        }
    
        setCalculation(calculation+val)
      
      }
    
      const eraseOne =()=>{ 
        setCalculation(calculation.slice(0,-1));
        
        if(count.current > 1){
          rightSide.current = rightSide.current.slice(0,-1)
        }else{
          if(frRef.current){
            rightSide.current = rightSide.current.slice(0,-1)
          }else{
            leftSide.current = leftSide.current.slice(0,-1);
          }
        }
      }
    
      const allClear=()=>{
        setCalculation("")
        setAnswer("")
        ans.current=''
        cal.current=''
        frRef.current=false;
        leftSide.current='0'
        rightSide.current='0'
        count.current = 0;
      }
    
      const equalTo =()=>{
    
        setCalculation(answer);
        leftSide.current = ans.current;
        rightSide.current='0';
        count.current=0;
        // frRef.current=false;
        ans.current='0'
        setAnswer(ans.current)
    
      }
  return (
    <View className='flex-1 bg-black'>
      <View className='w-full h-96 flex flex-col justify-center'>
        <View className='items-end'>
          <Text style={{color:'rgba(255,255,255,.8)'}} className='text-6xl mr-4 '>{calculation}</Text>
          <Text style={{color:'rgba(255,255,255,.6)'}} className='mr-4 text-4xl mt-1 '>{answer}</Text>
        </View>
      </View>
      <View className='border-b-2 border-gray-700'>
      </View>
      <View  className='mt-4 ml-2 flex-row space-x-4'>
        <Octicons onPress={()=> navigation.navigate('Binary')} name='file-binary' size={25} color={'rgba(255,255,255,.7)'} />
        <Text onPress={()=> navigation.navigate('Binary')} style={{color:'rgba(255,255,255,.7)'}} className='text-xl '>Binary Caculator</Text>
      </View>


      <View className='flex-1 mt-3' style={{ width: windowWidth }}>
        <View className='flex-row items-center justify-around mx-3'>
          <CustomButton
            title="AC"
            onPress={allClear}
            style={{ backgroundColor: 'rgba(0, 0, 255,0.3)' }} />
          <CustomButton
            title="<"
            onPress={eraseOne}
            style={{ backgroundColor: 'rgba(0, 0, 255,0.3)' }} />
          <CustomButton
            title="^"
            onPress={() => calc("^")}
            style={{ backgroundColor: 'rgba(0, 0, 255,0.3)' }} />
          <CustomButton
            title="÷"
            onPress={() => calc("÷")}
            style={{ backgroundColor: 'rgba(0, 0, 255,0.3)' }} />
        </View>

      </View>


      <View className='flex-1 mt-3' style={{ width: windowWidth }}>
        <View className='flex-row items-center justify-around mx-3'>
          <CustomButton
            title="7"
            onPress={() => calc("7")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="8"
            onPress={() => calc("8")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="9"
            onPress={() => calc("9")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="×"
            onPress={() => calc("×")}
            style={{ backgroundColor: 'rgba(0, 0, 255,0.3)' }} />
        </View>


      </View>


      <View className='flex-1 mt-3' style={{ width: windowWidth }}>
        <View className='flex-row items-center justify-around mx-3'>
          <CustomButton
            title="4"
            onPress={() => calc("4")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="5"
            onPress={() => calc("5")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="6"
            onPress={() => calc("6")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="-"
            onPress={() => calc("-")}
            style={{ backgroundColor: 'rgba(0, 0, 255,0.3)' }} />
        </View>


      </View>

      <View className='flex-1 mt-3' style={{ width: windowWidth }}>
        <View className='flex-row items-center justify-around mx-3'>
          <CustomButton
            title="1"
            onPress={() => calc("1")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="2"
            onPress={() => calc("2")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="3"
            onPress={() => calc("3")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="+"
            onPress={() => calc("+")}
            style={{ backgroundColor: 'rgba(0, 0, 255,0.3)' }} />
        </View>


      </View>

      <View className='flex-1 mt-3' style={{ width: windowWidth }}>
        <View className='flex-row items-center justify-around mx-3'>
          <CustomButton
            title="%"
            onPress={() =>calc("%")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="0"
            onPress={() => calc("0")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="."
            onPress={() => calc(".")}
            style={{ backgroundColor: '#141c22' }} />
          <CustomButton
            title="="
            onPress={equalTo}
            style={{ backgroundColor: 'blue' }} />
        </View>

      </View>

    </View>
  )
}

export default HomeScreen