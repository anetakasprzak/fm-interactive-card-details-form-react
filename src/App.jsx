/* eslint react/prop-types: 0 */

import { useState } from "react";
import { useForm } from "react-hook-form";

export default function App() {
  const [showThankyou, setShowThankyou] = useState(false);

  const [fullName, setFullName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expireMonth, setExpireMonth] = useState("");
  const [expireYear, setExpireYear] = useState("");
  const [cvc, setCvc] = useState();

  return (
    <div className="wrapper">
      <div className="component">
        <main className="main__box">
          <div className="cards__box">
            <div className="card__front-position">
              <div className="card--front__box">
                <img
                  src="../public/images/card-logo.svg"
                  className="card--front__logo"
                />
                <img
                  src="../public/images/bg-card-front.png"
                  className="card"
                />
                <div className="card--front__text-box">
                  <p className="card__number">
                    {cardNumber || `0000 0000 0000 0000`}
                  </p>
                  <p className="card__name">{fullName || `Your name`}</p>
                  <p className="card__date">
                    {expireMonth || `00`}/{expireYear || `00`}
                  </p>
                </div>
              </div>
            </div>

            <div className="card__back-position">
              <div className="card--back__box">
                <img src="../public/images/bg-card-back.png" className="card" />
                <p className="back__card-cvc">{cvc || `000`}</p>
              </div>
            </div>
          </div>

          {!showThankyou && (
            <Form
              setShowThankyou={setShowThankyou}
              setFullName={setFullName}
              setCardNumber={setCardNumber}
              setExpireMonth={setExpireMonth}
              setExpireYear={setExpireYear}
              setCvc={setCvc}
            />
          )}
          {showThankyou && <ThankYou setShowThankyou={setShowThankyou} />}
        </main>
      </div>
    </div>
  );
}

function Form({
  setShowThankyou,
  setFullName,
  setCardNumber,
  setExpireMonth,
  setExpireYear,
  setCvc,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      cvc: "",
    },
  });

  const onSubmit = (data) => {
    setFullName(data.fullName);
    setCardNumber(data.cardNumber);
    setExpireMonth(data.expireMonth);
    setExpireYear(data.expireYear);
    setCvc(data.cvc);

    setShowThankyou(true);
  };

  return (
    <div>
      <form className="form__box" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-control">
          <label className="input__label">Cardholder Name</label>
          <input
            className="input"
            type="text"
            placeholder="e.g. Jane Appleseed"
            {...register("fullName", { required: true })}
          />
          {errors.fullName && (
            <span className="input__error">This field is required</span>
          )}
        </div>

        <div className="input-control">
          <label className="input__label">Card number</label>
          <input
            className="input"
            type="number"
            placeholder="e.g. 1234 5678 9123 0000"
            {...register("cardNumber", { required: true })}
          />
          {errors.cardNumber && (
            <span className="input__error">Wrong format, numbers only</span>
          )}
        </div>

        <div className="form__card-details">
          <div className="input-control">
            <label className="input__label">Exp. Date (MM/YY)</label>
            <div className="input__date">
              <input
                className="input input--small"
                type="number"
                placeholder="MM"
                {...register("expireMonth", { required: true })}
              />
              <input
                className="input input--small"
                type="number"
                placeholder="YY"
                {...register("expireYear", { required: true })}
              />
            </div>
            {errors.expireMonth ||
              (errors.expireYear && (
                <span className="input__error">Cant be blank</span>
              ))}
          </div>

          <div className="input-control input--cvc">
            <label className="input__label">CVC</label>
            <input
              className="input input--cvc-fix"
              type="number"
              placeholder="e.g. 123"
              {...register("cvc", { required: true })}
            />
            {errors.cvc && <span className="input__error">Cant be blank</span>}
          </div>
        </div>
        <button className="btn">Confirm</button>
      </form>
    </div>
  );
}

function ThankYou({ setShowThankyou }) {
  return (
    <section className="thankyou__box">
      <img src="../public/images/icon-complete.svg" className="thankyou__img" />
      <h2 className="thankyou__heading">Thank you!</h2>
      <p className="thankyou__text">We&apos;ve added your card details</p>
      <button onClick={() => setShowThankyou(false)} className="btn">
        Continue
      </button>
    </section>
  );
}

/*   Continue */
