
interface CardRequired {
  card_number: number;
  cvv: number;
  expiration_month: string;
  expiration_year: string;
  email: string;
  token: string;
}

type CardProperties = Required<CardRequired>;

export default class {
  private card_number!: number;
  private cvv!: number;
  private expiration_month!: string;
  private expiration_year!: string;
  private email!: string;
  private token!: string;

  constructor(cardProperties: CardProperties) {
    Object.assign(this, cardProperties);
  }

  properties(): CardProperties {
    return {
      card_number: this.card_number,
      cvv: this.cvv,
      expiration_month: this.expiration_month,
      expiration_year: this.expiration_year,
      email: this.email,
      token: this.token,
    };
  }
}