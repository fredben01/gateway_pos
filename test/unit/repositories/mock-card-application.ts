import CardApplication from '../../../src/modules/card/application/card.application';
import mockCard from '../mocks/card.json';
import CardInfrastructure from '../../../src/modules/card/infrastructure/card.infrastructure';
import Controller from '../../../src/modules/card/presenters/controller';
import Card from '../../../src/modules/card/domain/card'

import { ok } from 'neverthrow';


export class MockCardApplication {
  constructor () {
    (CardApplication as jest.Mock) = jest.fn().mockReturnValue({
      listOne: jest
          .fn()
          .mockResolvedValue({
            ...mockCard[0],
            isErr: () => false,
            isOk: () => true,

            value: {
              properties: () => mockCard[0],
            }
          }),
    });

    (CardInfrastructure as jest.Mock) = jest.fn().mockReturnValue({
      listOne: jest.fn().mockResolvedValue(
        ok(
          new Card({
            email: mockCard[0].email,
            card_number: mockCard[0].card_number,
            cvv: mockCard[0].cvv,
            expiration_year: mockCard[0].expiration_year,
            expiration_month: mockCard[0].expiration_month,
            pk: mockCard[0].pk,
            token: mockCard[0].token,
          })
        )
      ),
    });
  }

  getController() {
    const cardInfrastructure = new CardInfrastructure();
    const cardApplication = new CardApplication(cardInfrastructure);

    // console.log({cardApplication})

    return new Controller(cardApplication);
  }

  assertListOne(data:any) {
    const result = data;
    expect(result).toHaveProperty("email");
    expect(result).toHaveProperty("card_number");
    expect(result).not.toHaveProperty("cvv");
  }

}