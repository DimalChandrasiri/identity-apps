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

import { ResourceTab } from "@wso2is/react-components";
import React, { FunctionComponent, ReactElement } from "react";
import { useDispatch } from "react-redux";
import { AlertInterface, BasicProfileInterface } from "../../models";
import { addAlert } from "../../store/actions";
import { UserProfile } from "./user-profile";

interface EditUserPropsInterface {
    user: BasicProfileInterface;
    setUser: (userInfo: BasicProfileInterface) => void;
}

/**
 * Application edit component.
 *
 * @return {JSX.Element}
 */
export const EditUser: FunctionComponent<EditUserPropsInterface> = (
    props: EditUserPropsInterface
): JSX.Element => {

    const {
        user,
        setUser
    } = props;
    const dispatch = useDispatch();

    const handleAlerts = (alert: AlertInterface): void => {
        dispatch(addAlert(alert));
    };

    /* eslint-disable @typescript-eslint/no-explicit-any */
    const panes = (): Record<string, any>[] => ([
        {
            menuItem: "Profile",
            /* eslint-disable react/display-name */
            //TODO implement properly
            render: (): ReactElement => (
                <ResourceTab.Pane attached={ false }>
                    <UserProfile onAlertFired={ handleAlerts }  user={ user } setUser={ setUser }/>
                </ResourceTab.Pane>
            ),
        },
    ]);

    return (
        <ResourceTab
            panes={ panes() }
        />
    );
};
