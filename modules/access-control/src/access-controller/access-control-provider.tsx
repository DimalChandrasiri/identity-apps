/**
 * Copyright (c) 2021, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the 'License'); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * 'AS IS' BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import React, { Children, FunctionComponent, PropsWithChildren, ReactElement, ReactNode, isValidElement } from "react";

/**
 * This Component will provide a wrapper component to provide
 * access control for all child components provided.
 * 
 * @returns ReactElement with AccessProvider wrapped
 */
export const AccessControlProvider: FunctionComponent<PropsWithChildren<any>> = (
    props: PropsWithChildren<any>
): ReactElement => {

    const {
        children
    } = props;

    const recursiveMapWrapper = (children: ReactNode) => {
        return Children.map(children, child => {
            if (!isValidElement(child)) {
                return child;
            }

            if (child.props.children) {
                child = React.cloneElement(child, {
                    children: recursiveMapWrapper(child.props.children)
                });
            }

            return child;
        });
    };

    return (
        <div className="access-control">
            { children }
        </div>
    );

}
