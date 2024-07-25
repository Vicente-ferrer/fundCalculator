import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default class ResultScreen extends React.Component {
  backToHome = () => {
    this.props.navigation.navigate("Home");
  };

  render() {
    const { totalShares, totalDividends, snowballShares, currentMonth } =
      this.props.route.params;

    return (
      <View style={styles.container}>
        <AntDesign
          style={styles.backPageIcon}
          onPress={this.backToHome}
          name="back"
          size={24}
          color="black"
        />
        <Text style={styles.monthlyIncome}>Seu dinheiro renderia</Text>
        <Text style={styles.incomeValue}>R${totalDividends}</Text>
        <Text style={styles.last30Days}>No período de 30 dias</Text>
        {/* Gráfico de exemplo */}
        <View style={styles.chartPlaceholder}></View>
        <View style={styles.resultContainer}>
          <View style={styles.resultCard}>
            <Text style={styles.label}>Total Monthly Income</Text>
            <Text style={styles.value}>${totalDividends}</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.label}>Período</Text>
            <Text style={styles.value}>{totalShares} meses</Text>
          </View>
          <View style={styles.resultCard}>
            <Text style={styles.label}>Reinvested Shares</Text>
            <Text style={styles.value}>{snowballShares}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff", // cor de fundo branca
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    marginTop: 35,
    color: "#333333", // cor preta
  },
  monthlyIncome: {
    fontSize: 18,
    marginTop: "25%",
    color: "#666666", // cor cinza escura
  },
  incomeValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333333", // cor preta
    marginVertical: 8,
  },
  last30Days: {
    fontSize: 14,
    color: "#666666", // cor cinza escura
    marginBottom: 24,
  },
  chartPlaceholder: {
    width: "100%",
    height: 100,
    backgroundColor: "#f7f7f7", // placeholder para o gráfico
    marginBottom: 24,
  },
  resultContainer: {
    width: "100%",
    paddingHorizontal: 24,
  },
  resultCard: {
    backgroundColor: "#ffffff", // cor de fundo branca
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#666666", // cor cinza escura
  },
  value: {
    fontSize: 18,
    color: "#333333", // cor preta mais escura
  },
  backPageIcon: {
    position: "absolute",
    top: 55,
    left: 16, // fixed value for left position
  },
  button: {
    width: "80%",
    alignSelf: "center",
    backgroundColor: "#ED8F12",
    padding: 16,
    borderRadius: 10,
    marginTop: 16,
  },
  buttonText: {
    fontSize: 18,
    color: "#171412",
    textAlign: "center",
    fontFamily: "Work-Sans-Bold",
  },
});
