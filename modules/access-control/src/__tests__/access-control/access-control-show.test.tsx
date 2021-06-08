/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import { render, screen } from "@testing-library/react";
import React from "react";
import { AccessControlConstants } from "../../access-control-constants";
import { AccessControlProvider } from "../../access-control-provider";
import { Show } from "../../access-control-show";
import { appDeveloperScopes, configMock } from "../__mocks__";

describe("Test access control module works fine", () => {

    test("test", async () => {
        const { getByTestId, rerender } = render(
            <AccessControlProvider featureConfig={ configMock.features } allowedScopes={ appDeveloperScopes }>
                <Show when={ AccessControlConstants.APPLICATION_READ } fallback={ <div>daasdas</div> }>
                    <div className="application-list">application</div>
                </Show>
            </AccessControlProvider>
        );

        rerender(
            <AccessControlProvider featureConfig={ configMock.features } allowedScopes={ appDeveloperScopes }>
                <Show when={ AccessControlConstants.APPLICATION_READ } fallback={ <div>daasdas</div> }>
                    <div className="application-list">application</div>
                </Show>
            </AccessControlProvider>
        );

        expect(screen.getByText("application")).toBeTruthy();
    });
    
});
