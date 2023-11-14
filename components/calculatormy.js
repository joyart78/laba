export const initialState = {
    currentValue: "0",
    operator: null,
    previousValue: null,
  };
  
  export const handleNumber = (value, state) => {
    if (state.currentValue === "0") {
      return { currentValue: `${value}` };
    }
  
    return {
      currentValue: `${state.currentValue}${value}`,
    };
  };


   
const handleEqual = (state, value) => {

  if (state.currentValue === "0") {
    return state;
  }

  let newState = state;

  switch (value) {
    case "-":
      if (['-'].includes(state.currentValue.slice(-1))) {
        return state;
      }
      newState = handleNumber(value, state);
      break;
      case "del":
        if (state.currentValue.length > 1) {
          newState.currentValue = state.currentValue.slice(0, -1);
        } else if (state.currentValue.length === 1) {
          newState = initialState;
        }
        break;
    case ".":
    case "*":
    case "+":
    case "/":
      if (['*', '/', '+', '-', '.'].includes(state.currentValue.slice(-1))) {
        return state;
      }
      newState = handleNumber(value, state);//, update
      break;

    default:
      break;
  }

  return newState;
};

  

  const calculator = (type, value, state) => {
    switch (type) {
      case "number":
        return handleNumber(value, state);
      case "sqrt":
        return {currentValue: `${Math.sqrt(parseFloat(state.currentValue))}`}
      case "clear":
        return initialState;
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