import { useForm } from "react-hook-form";

export default function App() {
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
                  <p className="card__number">0000 0000 0000 0000</p>
                  <p className="card__name">Jane Appleseed</p>
                  <p className="card__date">00/00</p>
                </div>
              </div>
            </div>

            <div className="card__back-position">
              <div className="card--back__box">
                <img src="../public/images/bg-card-back.png" className="card" />
                <p className="back__card-cvc">000</p>
              </div>
            </div>
          </div>

          <Form />
        </main>
      </div>
    </div>
  );
}

function Form() {
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

  const onSubmit = (data) => console.log(data);

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
                className="input"
                type="number"
                placeholder="MM"
                {...register("expireMonth", { required: true })}
              />
              <input
                className="input"
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

          <div className="input-control">
            <label className="input__label">CVC</label>
            <input
              className="input"
              type="number"
              placeholder="e.g. 123"
              {...register("cvc", { required: true })}
            />
            {errors.cvc && <span className="input__error">Cant be blank</span>}
          </div>
        </div>
      </form>
    </div>
  );
}

/*       e.g. 123 Confirm Thank you! We've added your card details Continue */
