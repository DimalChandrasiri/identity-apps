/**
 * Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the License); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * AS IS BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/**
 *  Captures the basic details in the applications.
 */
export interface ApplicationBasicInterface {
    id: string;
    name: string;
    description?: string;
    accessUrl?: string;
}

/**
 *  Application list item model.
 */
export interface ApplicationListItemInterface extends ApplicationBasicInterface {
    image?: string;
    self?: string;
}

/**
 *  Main application interface.
 */
export interface ApplicationInterface extends ApplicationBasicInterface {
    imageUrl?: string;
    claimConfiguration?: ClaimConfigurationInterface;
    advancedConfigurations?: AdvancedConfigurationsInterface;
}

/**
 *  Captures application list properties.
 */
export interface ApplicationListInterface {
    /**
     * Number of results that match the listing operation.
     */
    totalResults?: number;
    /**
     * Index of the first element of the page, which will be equal to offset + 1.
     */
    startIndex?: number;
    /**
     * Number of elements in the returned page.
     */
    count?: number;
    /**
     * Set of applications.
     */
    applications?: ApplicationListItemInterface[];
    /**
     * Useful links for pagination.
     */
    links?: LinkInterface[];
}

export interface AppClaimInterface {
    id?: string;
    uri: string;
    displayname?: string;
}

interface ClaimMappingInterface {
    applicationClaim: string;
    localClaim: AppClaimInterface;
}

interface SubjectInterface {
    claim: AppClaimInterface[];
    includeUserDomain: boolean;
    includeTenantDomain: boolean;
    useMappedLocalSubject: boolean;
}

interface RoleInterface {
    claim: AppClaimInterface[];
    includeUserDomain: boolean;
}

interface RoleMappingInterface {
    localRole: string;
    applicationRole: string;
}

interface RoleConfigInterface {
    mappings: RoleMappingInterface[];
    includeUserDomain: boolean;
    claim: AppClaimInterface;
}

interface RequestedClaimConfigurationInterface {
    claim: AppClaimInterface;
    mandatory: boolean;
}

interface SubjectConfigInterface {
    claim?: AppClaimInterface;
    includeUserDomain?: boolean;
    includeTenantDomain?: boolean;
    useMappedLocalSubject?: boolean;
}

/**
 *  Captures main claim features.
 */
export interface ClaimConfigurationInterface {
    dialect: string;
    claimMapping: ClaimMappingInterface[];
    requestedClaims: RequestedClaimConfigurationInterface[];
    subject: SubjectConfigInterface;
    role: RoleConfigInterface;
}

/**
 *  Acceptable certificate types.
 */
enum CertificateTypeInterface {
    JWKS = "JWKS",
    PEM = "PEM"
}

export interface CertificateInterface {
    value?: string;
    type?: CertificateTypeInterface; // TODO  Check for upload option.
}

/**
 *  Captures application related configuration.
 */
export interface AdvancedConfigurationsInterface {
    saas?: boolean;
    discoverableByEndUsers?: boolean;
    certificate?: CertificateInterface;
    skipConsent?: boolean; // TODO  Add consent for logout
    returnAuthenticatedIdpList?: boolean;
    enableAuthorization?: boolean;
}

export interface LinkInterface {
    href: string;
    rel: string;
}
