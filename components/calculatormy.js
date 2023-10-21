export const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
    eq: " ",
  };
  
  export const handleNumber = (value, state) => {
    if (state.currentValue === "0") {
      return { currentValue: `${value}` };
    }
  
    return {
      currentValue: `${state.currentValue}${value}`,
    };
  };
// export const handleNumber = (value, state, callback) => {
//   if (state.currentValue === "0") {
//     return { currentValue: `${value}` };
//   }

//   const updatedState = {
//     currentValue: `${state.currentValue}${value}`,
//   };

//   // Выполнение колбэк-функции после завершения handleNumber
//   callback(updatedState);
//   return updatedState;
// };

// const update = (state) => {
//   let i = 2
//   let word = state.currentValue;
//   let lengthNum = word.match(/\d+/g);
//   console.log(state.currentValue);
//   console.log(Object.keys(lengthNum).length)
//   console.log(state.eq)
//   if (Object.keys(lengthNum).length > 1 ) {
//     console.log(true);
//     return { eq: state.currentValue };
//   }
  
// };


   
const handleEqual = (state, value) => {

  if (state.currentValue === "0") {
    return state;
  }

  let newState = state; // сохраняем текущее состояние

  switch (value) {
    case "-":
      if (['-'].includes(state.currentValue.slice(-1))) {
        return state;
      }
      newState = handleNumber(value, state);//, update
      break;
      case "del":
        if (state.currentValue.length > 1) {
          newState.currentValue = state.currentValue.slice(0, -1);
        } else if (state.currentValue.length === 1) {
          newState = initialState;
        }
        break;
    case "*":
    case "+":
    case "/":
      if (['*', '/', '+', '-'].includes(state.currentValue.slice(-1))) {
        return state;
      }
      newState = handleNumber(value, state);//, update
      break;

    default:
      break;
  }

  return newState;
};

  
  // calculator function
  const calculator = (type, value, state) => {
    switch (type) {
      case "number":
        // return update(value, state);
        return handleNumber(value, state);//, update
      case "clear":
        return initialState;
      
      case "percentage":
        return {
          eq: `${parseFloat(state.currentValue) * 0.01}`,
        };
      case "operator":
        return handleEqual(state, value)
        ;
      case "equal":
        return {
          currentValue: `${eval(state.eq)}`,
          eq: "",
        }
      default:
        return state;
    }
  };
  
  export default calculator;