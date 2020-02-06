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

/**
 * Returns true if a given key in the JSON object is set to true
 * @param appConfig
 * @param key
 */
export const checkEnabled = (appConfig: any, key: string): boolean => {
    if (appConfig[key] === undefined) {
        return true;
    } else if (typeof appConfig[key] === "boolean" && appConfig[key]) {
        return true;
    } else if (typeof appConfig[key] === "object" && appConfig[key].enabled) {
        return true;
    } else {
        return false;
    }
};

/**
 * This removes the `common:` part from the route names
 * @param name
 */
export const getRouteName = (name: string): string => {
    const names: string[] = name.split(":");
    return names.length > 1 ? names[1] : names[0];
};
