import { expectSaga } from "redux-saga-test-plan";
import * as matchers from "redux-saga-test-plan/matchers";

import { getUserData } from "../../networking/api/userApi";
import { IUserRequest } from "../../types/request/user.request";
import { IUserResponse } from "../../types/response/user.response";
import { userActions } from "./user.reducer";
import { getUserDataRequest } from "./user.sagas";

const userDataRequest: IUserRequest = { userId: 1 };

const getUserDataRequestAction = {
  type: userActions.getUserDataRequest.type,
  payload: userDataRequest,
};

const mockUserResponse: IUserResponse = {
  id: 1,
  name: "Leanne Graham",
  username: "Bret",
  email: "Sincere@april.biz",
  address: {
    street: "Kulas Light",
    suite: "Apt. 556",
    city: "Gwenborough",
    zipcode: "92998-3874",
    geo: {
      lat: "-37.3159",
      lng: "81.1496",
    },
  },
  phone: "1-770-736-8031 x56442",
  website: "hildegard.org",
  company: {
    name: "Romaguera-Crona",
    catchPhrase: "Multi-layered client-server neural-net",
    bs: "harness real-time e-markets",
  },
};

test("get user data", () => {
  return expectSaga(getUserDataRequest, getUserDataRequestAction)
    .provide([[matchers.call.fn(getUserData), mockUserResponse]])
    .put({
      type: userActions.getUserDataSuccess.type,
      payload: mockUserResponse,
    })
    .run();
});
