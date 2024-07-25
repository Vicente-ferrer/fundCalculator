import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";

export default class HomeScreen extends React.Component {
  state = {
    monthlyInvestment: "",
    pricePerShare: "",
    dividendPerShare: "",
    investmentPeriod: "",
  };

  formatInput = (value) => {
    return value
      .replace(/\D/g, "") // Remove tudo que não é dígito
      .replace(/(\d)(\d{2})$/, "$1,$2") // Coloca a vírgula antes dos últimos 2 dígitos
      .replace(/(?=(\d{3})+(\D))\B/g, "."); // Coloca o ponto a cada 3 dígitos
  };

  handleInputChange = (field, value) => {
    this.setState({ [field]: this.formatInput(value) });
  };

  validarEntrada = () => {
    const {
      monthlyInvestment,
      pricePerShare,
      dividendPerShare,
      investmentPeriod,
    } = this.state;
    if (
      monthlyInvestment === "" ||
      pricePerShare === "" ||
      dividendPerShare === "" ||
      investmentPeriod === ""
    ) {
      Alert.alert("Erro ao calcular", "Por favor, preencha todos os campos!");
      return false;
    }
    return true;
  };

  calculateInvestment = () => {
    const {
      monthlyInvestment,
      pricePerShare,
      dividendPerShare,
      investmentPeriod,
    } = this.state;

    const investmentMonths = parseInt(investmentPeriod.replace(",", "."), 10);
    const monthlyInvestmentAmount = parseFloat(
      monthlyInvestment.replace(/\./g, "").replace(",", ".")
    );
    const sharePrice = parseFloat(
      pricePerShare.replace(/\./g, "").replace(",", ".")
    );
    const shareDividend = parseFloat(
      dividendPerShare.replace(/\./g, "").replace(",", ".")
    );

    let cotasAtuais = 0;
    let rendimentosMensais = 0;
    let bola_neve = 0;
    let mes = 0;

    for (mes = 0; mes <= investmentMonths; mes++) {
      if (mes > 0) {
        rendimentosMensais = cotasAtuais * shareDividend;
        if (rendimentosMensais >= sharePrice) {
          bola_neve = Math.floor(rendimentosMensais / sharePrice);
          cotasAtuais += bola_neve;
        }
      }
      cotasAtuais += Math.floor(1 + monthlyInvestmentAmount / sharePrice);
      rendimentosMensais = cotasAtuais * shareDividend;
    }

    this.props.navigation.navigate("Result", {
      totalShares: cotasAtuais.toFixed(0),
      totalDividends: rendimentosMensais.toFixed(0),
      snowballShares: bola_neve.toFixed(0),
      currentMonth: mes - 1,
    });
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.inputText}> Investimento Mensal </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: R$ 2.000,00"
          keyboardType="numeric"
          value={this.state.monthlyInvestment}
          onChangeText={(text) =>
            this.handleInputChange("monthlyInvestment", text)
          }
        />
        <Text style={styles.inputText}> Preço por Cota </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: R$ 10,00"
          keyboardType="numeric"
          value={this.state.pricePerShare}
          onChangeText={(text) => this.handleInputChange("pricePerShare", text)}
        />
        <Text style={styles.inputText}> Rendimento por Cota </Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: R$ 1,50"
          keyboardType="numeric"
          value={this.state.dividendPerShare}
          onChangeText={(text) =>
            this.handleInputChange("dividendPerShare", text)
          }
        />
        <Text style={styles.inputText}> Período de Investimento </Text>
        <TextInput
          style={styles.input}
          placeholder="6 meses"
          keyboardType="numeric"
          value={this.state.investmentPeriod}
          onChangeText={(text) => this.setState({ investmentPeriod: text })}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            if (this.validarEntrada()) {
              this.calculateInvestment();
            }
          }}
        >
          <Text style={styles.buttonText}>Calcular investimento</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f7f7f7",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
  },
  input: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    width: "100%",
    height: 56,
    backgroundColor: "#FFFFFF",
    borderColor: "#E6E0DB",
    borderWidth: 1,
    borderRadius: 12,
    margin: 8,
  },
  inputText: {
    fontSize: 24,
    fontFamily: "Work-Sans-Regular",
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
