/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { CommonAuthReducerStateInterface } from "../../models";
import { CommonAuthenticateActionTypes, CommonAuthenticateActions } from "../actions/types";

/**
 * Reducer to handle the state of common authentication related actions.
 *
 * @param {CommonAuthReducerStateInterface} initialState - Reducer initial state.
 * @returns {CommonAuthReducerStateInterface} The new state.
 */
export const commonAuthenticateReducer = (initialState: CommonAuthReducerStateInterface) => (
    state: CommonAuthReducerStateInterface = { ...initialState },
    action: CommonAuthenticateActions
): CommonAuthReducerStateInterface => {

    switch (action.type) {
        case CommonAuthenticateActionTypes.SET_SIGN_IN:
            if (action.payload) {
                return {
                    ...state,
                    displayName: action.payload.display_name,
                    emails: action.payload.email,
                    isAuthenticated: true,
                    loginInit: true,
                    logoutInit: false,
                    scope: action.payload.scope,
                    username: action.payload.username
                };
            }
            return {
                ...state
            };
        case CommonAuthenticateActionTypes.SET_SIGN_OUT:
            return {
                ...state,
                loginInit: false,
                logoutInit: true
            };
        case CommonAuthenticateActionTypes.SET_INITIALIZED:
            return {
                ...state,
                initialized: action.payload
            };
        case CommonAuthenticateActionTypes.RESET_AUTHENTICATION:
            return {
                ...initialState
            };
        default:
            return state;
    }
};
