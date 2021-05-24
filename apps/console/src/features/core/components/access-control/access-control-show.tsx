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

import { 
    Children, 
    FunctionComponent, 
    PropsWithChildren, 
    cloneElement, 
    isValidElement 
} from "react";
import { useAccess } from "react-access-control";

/**
 * Props interface for access control based show
 * component.
 */
export interface AccessControlShowInterface {
    /**
     * String array with permissions required to render children.
     */
    when: string | string[];
    /**
     * String array with permissions which the children shouldn't be rendered.
     */
    notWhen?: string |string[];
    /**
     * fallback element which will be rendered if permissions not matched.
     */
    fallback?: any;
    /**
     * granular resource level permission handling.
     */
    resource?: any;
}

/**
 * This component will render children based on the propes passed.
 * 
 * @param props props required for permission based rendering.
 * @returns children
 */
export const Show: FunctionComponent<PropsWithChildren<AccessControlShowInterface>> = (
    props: PropsWithChildren<AccessControlShowInterface>
): any => {

    const { hasPermission } = useAccess();

    const {
        when,
        notWhen,
        fallback,
        resource,
        children,
        ...rest
    } = props;

    // Checks whether the passed permissions are in the permissions store.
	const show = hasPermission(when, { resource });
    let hideOn = false;

    if (notWhen && notWhen.length > 0) {
        hideOn = hasPermission(notWhen, { resource });
    }

    if (show) {

        if (hideOn) {
            return null;
        } else {
            return Children.map(children, child => {
                if (isValidElement(child)) {
                    return cloneElement(child, rest);
                }
            });
        }
        
    }

    return fallback || null;

};
