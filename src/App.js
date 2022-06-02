import "./App.css";
import { useEffect, useState } from "react";

const visa =
  "https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_card_visa-512.png";
const amex =
  "https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/16_Amex_Credit_Card_logo_logos-256.png";
const discover =
  "https://cdn2.iconfinder.com/data/icons/credit-cards-6/156/discover-256.png";
const mastercard =
  "https://cdn3.iconfinder.com/data/icons/payment-method-1/64/_Mastercard-256.png";
const closeIcon =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPmOiUQnr8YkU-1q5tcle7bS7f4_ftsu-1c_OrXSQRLHYgjrDWR-DMU9VgdNOXCNwfUZk&usqp=CAU";
function App() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardType, setCardType] = useState(null);
  const [cardIcon, setCardIcon] = useState(null);
  const [isValid, setIsValid] = useState(true);
  const [placeHolder, setPlaceHolder] = useState("0000 0000 0000 0000");

  const validateCard = (e) => {
    let enterValue = e.target.value;
    console.log({ placeHolder }, enterValue.replace(/ /g, "").length);
    if (/[^0-9-\s]+/.test(enterValue)) return false;
    let addZero = "";
    for (
      let x = 0;
      x < parseInt(16) - enterValue.replace(/ /g, "").length;
      x++
    ) {
      addZero += 0;
      // console.log({ x, addZero }, enterValue + addZero);
    }

    setPlaceHolder(
      (enterValue + addZero)
        .replace(/\W/gi, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    );
    setCardNumber(enterValue);
    getCardType(enterValue.replace(/ /g, ""));
  };

  useEffect(() => {
    if (cardNumber.length === 0) {
      setCardType(null);
      setCardIcon(null);
      setIsValid(true);
    }

    setCardNumber(
      cardNumber
        .replace(/\W/gi, "")
        .replace(/(.{4})/g, "$1 ")
        .trim()
    );
  }, [cardNumber]);

  const handleOnBlur = (e) => {
    var nCheck = 0,
      nDigit = 0,
      bEven = false;

    for (var n = cardNumber.replace(/\D/g, "").length - 1; n >= 0; n--) {
      var cDigit = cardNumber.replace(/\D/g, "").charAt(n);
      console.log({ cDigit });
      nDigit = parseInt(cDigit, 10);

      if (bEven) {
        if ((nDigit *= 2) > 9) nDigit -= 9;
      }

      nCheck += nDigit;
      bEven = !bEven;
    }

    if (nCheck % 10 == 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const getCardType = (card) => {
    const cardNumberLength = card.length;
    setIsValid(true);
    if (card.startsWith("4")) {
      setCardType("visa");
      setCardIcon(visa);
    } else if (card.startsWith("6011")) {
      setCardType("discover");
      setCardIcon(discover);
    } else if (card.startsWith("34") || card.startsWith("37")) {
      setCardType("amex");
      setCardIcon(amex);
    } else if (card.slice(0, 2) >= 51 && card.slice(0, 2) <= 55) {
      setCardType("mastercard");
      setCardIcon(mastercard);
    } else {
      setCardType(null);
    }

    if (cardNumberLength >= 13) {
      isValidLength(cardNumberLength);
    }
  };

  const isValidLength = (cardLength) => {
    if (["discover", "mastercard"].includes(cardType) && cardLength === 16) {
      setIsValid(true);
    } else if (cardType === "amex" && cardLength === 15) {
      setIsValid(true);
    } else if (cardType === "visa" && [13, 16].includes(cardLength)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="App">
      <div className="field-container">
        <input
          id="cardnumber"
          className="input"
          type="text"
          onChange={validateCard}
          value={cardNumber}
          autoComplete="off"
          onBlur={handleOnBlur}
          maxLength={19}
        />
        <div className="placeholder-style">{placeHolder}</div>
        {cardType && isValid && (
          <img alt="" className="ccicon" src={cardIcon} />
        )}
        {!isValid && (
          <img
            alt=""
            className="closeicon"
            src={closeIcon}
            onClick={() => {
              setCardNumber("");
              setPlaceHolder("0000 0000 0000 0000");
            }}
          />
        )}
        {!isValid && <span className="card-error">Invaild card number</span>}
      </div>
    </div>
  );
}

export default App;
