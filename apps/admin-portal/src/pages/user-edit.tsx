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

import { UserAvatar } from "@wso2is/react-components";
import React, { useEffect, useState } from "react";

import { getUserDetails } from "../api";
import { EditUser } from "../components/users/edit-user";
import { history } from "../helpers";
import { PageLayout } from "../layouts";
import {  BasicProfileInterface, createEmptyProfile } from "../models";


/**
 * User Edit page.
 *
 * @return {JSX.Element}
 */
export const UserEditPage = (): JSX.Element => {
    const [ user, setUserProfile ] = useState<BasicProfileInterface>(createEmptyProfile);

    const handleUserUpdate = (userInfo: BasicProfileInterface): void => {
        setUserProfile(userInfo);
    };

    const getUser = (id: string): void => {
        getUserDetails(id)
            .then((response) => {
                setUserProfile(response);
            })
            .catch(() => {
                // TODO add to notifications
            });
    };

    useEffect(() => {
        const path = history.location.pathname.split("/");
        const id = path[ path.length - 1 ];

        getUser(id);
    }, []);

    const handleBackButtonClick = (): void => {
        history.push("/users");
    };

    return (
        <PageLayout
            title={ user?.name?.givenName && user.name.familyName ? user.name.givenName + " " + user.name.familyName :
                "Administrator" }
            description={ "" + user.emails && user.emails !== undefined ? user.emails[0].toString() :
                user.userName }
            image={ (
                <UserAvatar
                    name={ user.userName }
                    size="tiny"
                    floated="left"
                    image={ user.profileUrl }
                />
            ) }
            backButton={ {
                onClick: handleBackButtonClick,
                text: "Go back to users"
            } }
            titleTextAlign="left"
            bottomMargin={ false }
        >
            <EditUser user={ user } setUser={ handleUserUpdate } />
        </PageLayout>
    );
};
