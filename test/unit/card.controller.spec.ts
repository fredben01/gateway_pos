import * as httpMock from 'node-mocks-http';
import { MockCardApplication } from './repositories/mock-card-application';

let req: any;
let res: any;
let mockCardApplication: any;
let cardController: any;

describe("card.controller", () => {
  beforeAll(() => {
    mockCardApplication = new MockCardApplication();
    cardController = mockCardApplication.getController();
  });

  beforeEach(() => {
    req = httpMock.createRequest();
    res = httpMock.createResponse();
  })

  it ("List One", async() => {
    // Act
    const data = await cardController.listOne(req,res);
    // Assert
    mockCardApplication.assertListOne(data);

  });


});