import Input from "../components/Input";

// functions/PhoneInput.js
const formatPhone = (value) => {
  let numero = value.replace(/\D/g, ""); // Remove tudo que não for número

  if (numero.length > 11) {
    numero = numero.slice(0, 11); // Limita a 11 dígitos
  }

  if (numero.length > 10) {
    return numero.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3"); // Celular
  } else if (numero.length > 6) {
    return numero.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3"); // Fixo
  } else if (numero.length > 2) {
    return numero.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
  } else {
    return numero.replace(/^(\d{0,2})/, "($1");
  }
};

const PhoneInput = ({ value, onChange }) => {
  const handlePhoneChange = (e) => {
    onChange({
      target: {
        name: "fone",
        value: formatPhone(e.target.value),
      },
    });
  };

  return (
    <Input
      type="text"
      name="fone"
      value={value}
      onChange={handlePhoneChange}
      placeholder="(XX) XXXXX-XXXX"
      maxLength="15"
    />
  );
};

export default PhoneInput;
