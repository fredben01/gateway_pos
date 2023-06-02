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
    // req.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwayI6ImRzbzBAXkRHIiwiaWF0IjoxNjg1NzE2ODY0LCJleHAiOjE2ODU3MTY5MjR9.JunDLjBdcIcjnPy8grt2mHnpMbOHojkwXlxz-WJcQVU";
    
    const data = await cardController.listOne(req,res);
    // console.log({data})

    // Assert
    mockCardApplication.assertListOne(data);

  });


});