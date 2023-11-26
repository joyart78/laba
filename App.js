import React, { Component } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Button from "./components/button";
import Row from "./components/row";
import calculator, { initialState } from "./components/calculatormy";

export default class App extends Component {
  state = initialState;

// Функция для проверки окончания на оператор
endsWithOperator = (str) => {
  const operators = ['*', '/', '+', '-'];
  return operators.some((operator) => str.endsWith(operator));
};

update = (state) => {
  let word = state.currentValue;
  // console.log(this.state.currentValue)
  let lengthNum = word.match(/[.\d]+/g);

  if (lengthNum.length > 1 && !this.endsWithOperator(state.currentValue)) {
    return { eq: state.currentValue };
  }
  else return { eq: ""}
}; 

HandleTap = (type, value) => {
  this.setState((state) => {
    const newState = calculator(type, value, state);
    // Вызываем update и обновляем eq
    return { ...newState, ...this.update(newState) };
  });
};

  render() {
    return (
      <View style={styles.container}>
        
        <SafeAreaView>
          <Text style={styles.value}>
            {(this.state.currentValue).toLocaleString()}
          </Text>
          
          <Text style={styles.valueeq}>
           {eval((this.state.eq))}
          </Text>

          <Row>
            <Button
              text="C"
              theme="secondary"

              onPress={() => this.HandleTap("clear")}
            />

            <Button
              text="√"
              theme="secondary"
              onPress={() => this.HandleTap("sqrt")}
            />

            <Button
              text="del"
              theme="secondary"
              onPress={() => this.HandleTap("operator","del")}
            />

            <Button
              text="/"
              theme="accent"
              onPress={() => this.HandleTap("operator", "/")}
            />
          </Row>

          
          <Row>
            <Button text="7" onPress={() => this.HandleTap("number", 7)} />
            <Button text="8" onPress={() => this.HandleTap("number", 8)} />
            <Button text="9" onPress={() => this.HandleTap("number", 9)} />
            <Button
              text="X"
              theme="accent"
              onPress={() => this.HandleTap("operator", "*")}
            />
          </Row>

          <Row>
            <Button text="5" onPress={() => this.HandleTap("number", 5)} />
            <Button text="6" onPress={() => this.HandleTap("number", 6)} />
            <Button text="7" onPress={() => this.HandleTap("number", 7)} />
            <Button
              text="-"
              theme="accent"
              onPress={() => this.HandleTap("operator", "-")}
            />
          </Row>

          <Row>
            <Button text="1" onPress={() => this.HandleTap("number", 1)} />
            <Button text="2" onPress={() => this.HandleTap("number", 2)} />
            <Button text="3" onPress={() => this.HandleTap("number", 3)} />
            <Button
              text="+"
              theme="accent"
              onPress={() => this.HandleTap("operator", "+")}
            />
          </Row>

          <Row>
            <Button text="0" onPress={() => this.HandleTap("number", 0)} />
            <Button text="." onPress={() => this.HandleTap("operator", ".")} />
            <Button
              text="="
              theme="primary"
              onPress={() => this.HandleTap("equal", "=")}
            />
          </Row>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#202020",
    justifyContent: "flex-end",
  },
  value: {
    color: "#fff",
    fontSize: 42,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
  valueeq: {
    color: "#bcc4c4",
    fontSize: 36,
    textAlign: "right",
    marginRight: 20,
    marginBottom: 10,
  },
});