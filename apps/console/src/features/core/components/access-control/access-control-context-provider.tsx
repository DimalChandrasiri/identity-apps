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

import { hasRequiredScopes } from "@wso2is/core/helpers";
import isEmpty from "lodash-es/isEmpty";
import { FunctionComponent, PropsWithChildren, ReactElement, useEffect } from "react";
import { useAccess } from "react-access-control";
import { useSelector } from "react-redux";
import { AccessControlConstants } from "./access-control-constants";
import { AppState, FeatureConfigInterface } from "../..";

/**
 * This component will handle mapping of the backend scopes which is recieved 
 * via the token call to the relevant UI feature.
 * 
 * @param props props containing children components
 * @returns returns unmodified children components
 */
export const AccessControlContext: FunctionComponent<PropsWithChildren<any>> = (
    props: PropsWithChildren<any>
): ReactElement => {

    const featureConfig: FeatureConfigInterface = useSelector((state: AppState) => state.config.ui.features);
    const allowedScopes: string = useSelector((state: AppState) => state?.auth?.scope);

    const { isLoaded, define } = useAccess();

    const {
        children
    } = props;

    useEffect(() => {
        
        if (isEmpty(allowedScopes)) {
            return;
        }

        if (isLoaded) {
            return;
        }

        /**
         * This function will define the required permissions to render 
         * UI components via the `Show` component provided by `react-access-control`
         * plugin.
         */
        define({
            permissions: {
                // Application Feature permissions
                [ AccessControlConstants.APPLICATION ] : hasRequiredScopes(featureConfig.applications, 
                    featureConfig.applications.scopes.feature, allowedScopes),
                [ AccessControlConstants.APPLICATION_READ ] : hasRequiredScopes(featureConfig.applications, 
                    featureConfig.applications.scopes.read, allowedScopes),
                [ AccessControlConstants.APPLICATION_WRITE ] : hasRequiredScopes(featureConfig.applications, 
                    featureConfig.applications.scopes.create, allowedScopes),
                [ AccessControlConstants.APPLICATION_EDIT ] : hasRequiredScopes(featureConfig.applications, 
                    featureConfig.applications.scopes.update, allowedScopes),
                [ AccessControlConstants.APPLICATION_DELETE ] : hasRequiredScopes(featureConfig.applications, 
                    featureConfig.applications.scopes.delete, allowedScopes),

                // Attribute Dialect Feature permissions
                [ AccessControlConstants.ATTRIBUTE ] : hasRequiredScopes(featureConfig.attributeDialects, 
                    featureConfig.attributeDialects.scopes.feature, allowedScopes),
                [ AccessControlConstants.ATTRIBUTE_READ ] : hasRequiredScopes(featureConfig.attributeDialects, 
                    featureConfig.attributeDialects.scopes.read, allowedScopes),
                [ AccessControlConstants.ATTRIBUTE_WRITE ] : hasRequiredScopes(featureConfig.attributeDialects, 
                    featureConfig.attributeDialects.scopes.create, allowedScopes),
                [ AccessControlConstants.ATTRIBUTE_EDIT ] : hasRequiredScopes(featureConfig.attributeDialects, 
                    featureConfig.attributeDialects.scopes.update, allowedScopes),
                [ AccessControlConstants.ATTRIBUTE_DELETE ] : hasRequiredScopes(featureConfig.attributeDialects, 
                    featureConfig.attributeDialects.scopes.delete, allowedScopes),

                // Group Feature permissions
                [ AccessControlConstants.GROUP ] : hasRequiredScopes(featureConfig.groups, 
                    featureConfig.groups.scopes.feature, allowedScopes),
                [ AccessControlConstants.GROUP_READ ] : hasRequiredScopes(featureConfig.groups, 
                    featureConfig.groups.scopes.read, allowedScopes),
                [ AccessControlConstants.GROUP_WRITE ] : hasRequiredScopes(featureConfig.groups, 
                    featureConfig.groups.scopes.create, allowedScopes),
                [ AccessControlConstants.GROUP_EDIT ] : hasRequiredScopes(featureConfig.groups, 
                    featureConfig.groups.scopes.update, allowedScopes),
                [ AccessControlConstants.GROUP_DELETE ] : hasRequiredScopes(featureConfig.groups, 
                    featureConfig.groups.scopes.delete, allowedScopes),

                // Identity Provider Feature permissions
                [ AccessControlConstants.IDP ] : hasRequiredScopes(featureConfig.identityProviders, 
                    featureConfig.identityProviders.scopes.feature, allowedScopes),
                [ AccessControlConstants.IDP_READ ] : hasRequiredScopes(featureConfig.identityProviders, 
                    featureConfig.identityProviders.scopes.read, allowedScopes),
                [ AccessControlConstants.IDP_WRITE ] : hasRequiredScopes(featureConfig.identityProviders, 
                    featureConfig.identityProviders.scopes.create, allowedScopes),
                [ AccessControlConstants.IDP_EDIT ] : hasRequiredScopes(featureConfig.identityProviders, 
                    featureConfig.identityProviders.scopes.update, allowedScopes),
                [ AccessControlConstants.IDP_DELETE ] : hasRequiredScopes(featureConfig.identityProviders, 
                    featureConfig.identityProviders.scopes.delete, allowedScopes),

                // Scope Feature permissions
                [ AccessControlConstants.SCOPE ] : hasRequiredScopes(featureConfig.oidcScopes, 
                    featureConfig.oidcScopes.scopes.feature, allowedScopes),
                [ AccessControlConstants.SCOPE_READ ] : hasRequiredScopes(featureConfig.oidcScopes, 
                    featureConfig.oidcScopes.scopes.read, allowedScopes),
                [ AccessControlConstants.SCOPE_WRITE ] : hasRequiredScopes(featureConfig.oidcScopes, 
                    featureConfig.oidcScopes.scopes.create, allowedScopes),
                [ AccessControlConstants.SCOPE_EDIT ] : hasRequiredScopes(featureConfig.oidcScopes, 
                    featureConfig.oidcScopes.scopes.update, allowedScopes),
                [ AccessControlConstants.SCOPE_DELETE ] : hasRequiredScopes(featureConfig.oidcScopes, 
                    featureConfig.oidcScopes.scopes.delete, allowedScopes),

                // User Feature permissions
                [ AccessControlConstants.USER ] : hasRequiredScopes(featureConfig.users, 
                    featureConfig.users.scopes.feature, allowedScopes),
                [ AccessControlConstants.USER_READ ] : hasRequiredScopes(featureConfig.users, 
                    featureConfig.users.scopes.read, allowedScopes),
                [ AccessControlConstants.USER_WRITE ] : hasRequiredScopes(featureConfig.users, 
                    featureConfig.users.scopes.create, allowedScopes),
                [ AccessControlConstants.USER_EDIT ] : hasRequiredScopes(featureConfig.users, 
                    featureConfig.users.scopes.update, allowedScopes),
                [ AccessControlConstants.USER_DELETE ] : hasRequiredScopes(featureConfig.users, 
                    featureConfig.users.scopes.delete, allowedScopes)
            }
        });

    }, [ allowedScopes ]);

    return children;
};