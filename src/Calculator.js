import './sts.css';
import React from "react";
import ReactDOM from 'react-dom/client';
import { useState } from "react";
import { useTransition, animated } from "react-spring";
import RB from './RB'
import Convert from './Convert';




function Calculator() {

  const [calc, setCalc] = useState("");
  const [result, setResult] = useState("");

  const dot = ['.'];
  const ops = ['/', '*', '-', '+'];
  const perc = ['%'];
  const neg = ['-/+'];
  const zero = ['0'];
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  console.log(result,calc);

  const updateCalc = value => {

    if ( perc.includes(calc.slice(-1)) && (digits.includes(value) || ops.includes(value))) {
      return;
    }

    if (
      (calc === '' && perc.includes(value)) ||
      (ops.includes(calc.slice(-1)) && perc.includes(value)) // mhn vazei % se keno h meta apo ops
    ){
      return;
    }

    if (
      zero.includes(calc) && zero.includes(value) // oxi 0 meta apo 0
    ){
      return;
    }

    if(
      digits.includes(value) && zero.includes(calc) // oxi digit meta apo 0 
    ){
      return;
    }

    if (
      calc.slice(-2,-1) === '/' && zero.includes(calc.slice(-1)) && (!dot.includes(value)) // ama einai /0 na dexetai mono dot meta
    ){
      return;
    }


    if (
      ops.includes(calc.slice(-2,-1)) && zero.includes(calc.slice(-1)) && (!ops.includes(value)) && (!dot.includes(value)) // mono dot h ops meta apo ops kai 0
    ){
      return;
    }


    if (
      (dot.includes(value) && calc === '')||
      (dot.includes(value) && dot.includes(calc.slice(-1))) // oxi sketh dot , dot meta apo dot 
    ){
      return;
    }


    const last_op = Math.max(calc.lastIndexOf('/'), calc.lastIndexOf('+'), calc.lastIndexOf('*'), calc.lastIndexOf('-')); // telutaiios ops

    if(
      dot.includes(value) && calc.includes('.') 
    ){
      if (
        calc.lastIndexOf('.') > last_op // oxi diplh dot se arithmo
      ){
        return;
      }
    }

    if (perc.includes(value) && last_op > 0){
      let num = parseInt(calc.slice(last_op+1))
      num = num/100
      setResult(num.toString());
      setCalc(num.toString()); // leitourgia %
      console.log(result, calc, num);
    } else if (perc.includes(value)) {
        let num = parseInt(calc)
        num = num/100
        setResult(num.toString());
        setCalc(num.toString());
        console.log(result, calc, num);
    }

    if(
      dot.includes(value) && ops.includes(calc.slice(-1)) // oxi dot meta apo ops
    ){
      return;
    }


    if (
      (ops.includes(value) && calc === '')||
      (ops.includes(value) && ops.includes(calc.slice(-1))) // oxi apanwta ops , oxi ops sto keno
      ){
        return;
      }
    else{
      setCalc(calc + value);  // EDW VAZEI TA OPS
    }

    if( perc.includes(value)){
      setCalc(calc + value); 
      setResult(eval(calc + '/100').toString());    // EDW VAZEI TO %
    }

    if (!ops.includes(value) && !perc.includes(value)){
      setResult(eval(calc + value).toString());  // EDW VAZEI TA NUMS
    }

    
  }

  const negative = () => {
    if (calc === '') {
      return;
    }
    let temp = result
    temp = -1 * temp
    setCalc(temp.toString());
    setResult(temp.toString());
  }

  const equals = () =>{
    if (
      calc === ''
    ){
      return;
    }

    if (
      ops.includes(calc.slice(-1))
    ){
      return;
    }

    if (
      calc.slice(-2,-1) === '/' && zero.includes(calc.slice(-1))
    ){
      return;
    }

    const first_perc = Math.max(calc.lastIndexOf('/'), calc.lastIndexOf('+'), calc.lastIndexOf('*'), calc.lastIndexOf('-'))

    if (perc.includes(calc.slice(-1))){
      setCalc(eval(calc.slice(0,-1) + '/100').toString());
    }else{
      setCalc(eval(calc).toString());
    }
   
    
    
  }

  const deleteLast = () => {
    if (calc === '') {
      return;
    }
    const value = calc.slice(0, -1);
    setCalc(value);
    setResult(value);

    if (
      calc === 'Infinity' || calc === 'NaN'
    ) {
      const value = '';
      setCalc(value);
      setResult(value);
    }


  } 

  const deleteAll = () => {
    const value = '';
    setCalc(value);
    setResult(value);
  }


  const[isVisible, setIsVisible] = useState(false);
  const transition = useTransition(isVisible, {
    from: {x: 100, y: 200, opacity: 0},
    enter: {x:0, y: 0, opacity: 1},
    leave: {x:400, y: 0, opacity: 0},
  });




  return (
    <div className='App'>
      <div className='Calculator'>  
        <div className='output'>
          {result ? <div className='previous-operand'>{result}</div> : ''}
          <div className='current-operand'>{calc || ""}</div>
        </div>
          
          <RB className='btns' onClick={() => updateCalc('%')}><span>%</span></RB>
          <RB className='btns' id='ac' onClick={deleteAll}><span>AC</span></RB>

          <RB className='btns' id="noselect" onClick={deleteLast}><span className='del' >DEL</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"/></svg></span></RB>


          <RB className='btns' onClick={() => updateCalc('-')}><span>-</span></RB>
          <RB className='btns' onClick={() => updateCalc('7')}><span>7</span></RB>
          <RB className='btns' onClick={() => updateCalc('8')}><span>8</span></RB>
          <RB className='btns' onClick={() => updateCalc('9')}><span>9</span></RB>

          <RB className='btns' onClick={() => updateCalc('+')}><span>+</span></RB>

          <RB className='btns' onClick={() => updateCalc('4')}><span>4</span></RB>
          <RB className='btns' onClick={() => updateCalc('5')}><span>5</span></RB>
          <RB className='btns' onClick={() => updateCalc('6')}><span>6</span></RB>

          <RB className='btns' onClick={() => updateCalc('*')}><span>*</span></RB>

          <RB className='btns' onClick={() => updateCalc('1')}><span>1</span></RB>
          <RB className='btns' onClick={() => updateCalc('2')}><span>2</span></RB>
          <RB className='btns' onClick={() => updateCalc('3')}><span>3</span></RB>

          <RB className='btns' onClick={() => updateCalc('/')}><span>/</span></RB>
          <RB className='btns' onClick={() => updateCalc('.')}><span>.</span></RB>
          <RB className='btns' onClick={() => updateCalc('0')}><span>0</span></RB>
          <RB className='btns' onClick= {negative}><span>-/+</span></RB>

          <button className='ops' id='equal' onClick={equals}>=</button>

          <button className='cnv' onClick={() => {
            setIsVisible(v =>!v);
          }}>{isVisible ? <><span>Hide Converter</span><span>Hide</span></> : <><span>Open Converter</span><span>Open</span></>}</button>
      </div>
        <div>
          {transition((style,item) => 
          item ? <animated.div style={style} className='item'> <Convert result={result} /> </animated.div>: null)} 
        </div>
    </div>
  )
}

export default Calculator;

