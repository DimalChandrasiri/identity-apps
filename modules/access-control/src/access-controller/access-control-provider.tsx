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
 *
 */

import React, { PropsWithChildren, ReactElement } from "react";
import { AccessController } from "./access-controller";

export interface AccessControlProviderProps {
    accessId: string;
    permission: string;
}

/**
 * A provider component for access controlling elements
 * which will wrap any child component which consist 
 * of a `data-access-id`.
 */
export const AccessControlProvider: React.FunctionComponent<PropsWithChildren<AccessControlProviderProps>> = (
    props: PropsWithChildren<AccessControlProviderProps>
): React.ReactElement => {

    const {
        children,
        accessId,
        permission
    } = props;

    /**
     * Util method to check permission for the child
     * component
     */
    const checkPermission = ( accessControlId: string, renderPermission: string ): boolean => {
        if(accessControlId)
        return true;
    };

    return (
        <div className="access-control">
            { 
                React.Children.map(children, (child: ReactElement<any>) => (
                    <>
                        { child.props && child.props["data-access-id"] == accessId && 
                            <AccessController shouldRender={ checkPermission(accessId, permission) }>
                                { child }
                            </AccessController>
                        }
                    </>
                ))
            }
        </div>
    );
};
