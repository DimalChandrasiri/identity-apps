/**
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

export const Theme = require("./theme");
// TODO: Revist default theme loading
// export const DefaultTheme = Theme.compile(
//     "./libs/styles/less/theme-module/themes/default/index.less",
//     "./libs/styles/less/theme-module/themes/default", {}
// );

// Icons
export const AppIcon = require("../lib/assets/images/icons/app-icon.svg");
export const BlockedMagnifierIcon = require("../lib/assets/images/icons/blocked-magnifier-icon.svg");
export const BoxIcon = require("../lib/assets/images/icons/box-icon.svg");
export const CaretRightIcon = require("../lib/assets/images/icons/caret-right-icon.svg");
export const CloseIcon = require("../lib/assets/images/icons/close-icon.svg");
export const CodeIcon = require("../lib/assets/images/icons/code-icon.svg");
export const ConsentIcon = require("../lib/assets/images/icons/consent-icon.svg");
export const ControlsIcon = require("../lib/assets/images/icons/controls-icon.svg");
export const CrossIcon = require("../lib/assets/images/icons/cross-icon.svg");
export const DashboardIcon = require("../lib/assets/images/icons/dashboard-icon.svg");
export const DotIcon = require("../lib/assets/images/icons/dot-icon.svg");
export const EmailIcon = require("../lib/assets/images/icons/email-icon.svg");
export const ErrorIcon = require("../lib/assets/images/icons/error-icon.svg");
export const FingerprintIcon = require("../lib/assets/images/icons/fingerprint.svg");
export const ForbiddenIcon = require("../lib/assets/images/icons/forbidden-icon.svg");
export const InfoIcon = require("../lib/assets/images/icons/info-icon.svg");
export const LockIcon = require("../lib/assets/images/icons/lock-icon.svg");
export const MonitorIcon = require("../lib/assets/images/icons/monitor-icon.svg");
export const PackageIcon = require("../lib/assets/images/icons/package.svg");
export const PadlockIcon = require("../lib/assets/images/icons/padlock-icon.svg");
export const PlugIcon = require("../lib/assets/images/icons/plug-icon.svg");
export const SecurityQuestionsIcon = require("../lib/assets/images/icons/security-questions-icon.svg");
export const SMSIcon = require("../lib/assets/images/icons/sms-icon.svg");
export const SuccessIcon = require("../lib/assets/images/icons/success-icon.svg");
export const TickCircleIcon = require("../lib/assets/images/icons/tick-circle-icon.svg");
export const ToolsIcon = require("../lib/assets/images/icons/tools-icon.svg");
export const UserIcon = require("../lib/assets/images/icons/user-icon.svg");
export const WarningIcon = require("../lib/assets/images/icons/warning-icon.svg");

// Illustrations
export const AssociatedAccountsIllustration = require("../lib/assets/images/illustrations/associated-accounts.svg");
export const AssociatedAccountsMiniIllustration = require("../lib/assets/images/illustrations/associated-accounts-mini.svg");
export const ChangePasswordIllustration = require("../lib/assets/images/illustrations/change-password.svg");
export const ChangePasswordMiniIllustration = require("../lib/assets/images/illustrations/change-password-mini.svg");
export const EmptySearchResultsIllustration = require("../lib/assets/images/illustrations/no-search-results.svg");
export const ProfileExportIllustration = require("../lib/assets/images/illustrations/profile-export.svg");
export const ProfileExportMiniIllustration = require("../lib/assets/images/illustrations/profile-export-mini.svg");
export const SecurityQuestionsIllustration = require("../lib/assets/images/illustrations/security-questions.svg");
export const SecurityQuestionsMiniIllustration = require("../lib/assets/images/illustrations/security-questions-mini.svg");

// Status shields
export const StatusShieldGood = require("../lib/assets/images/accounts-status-icons/good.svg");
export const StatusShieldWarning = require("../lib/assets/images/accounts-status-icons/warning.svg");
export const StatusShieldDanger = require("../lib/assets/images/accounts-status-icons/danger.svg");

// Logos
export const GravatarLogo = require("../lib/assets/images/gravatar-logo.png");
export const Logo = require("../lib/assets/images/logo.svg");

// Misc
export const DummyUser = require("../lib/assets/images/user.png");
export const OrangeAppIconBackground = require("../lib/assets/images/app-icon-background.png");

/**
 * The following has been kept for backward compatibility.
 * These can be removed once the user portal is refactored.
 */
export const Padlock = require("../lib/assets/images/icons/padlock-icon.svg");

export const HomeTileIcons = {
    profile: require("../lib/assets/images/home_profile_mgt.png"),
    security: require("../lib/assets/images/home_security_mgt.png"),
    consent: require("../lib/assets/images/home_consent_mgt.png")
};

export const SidePanelIconSet = {
    account: require("../lib/assets/images/icons/controls-icon.svg"),
    apps: require("../lib/assets/images/icons/app-icon.svg"),
    consent: require("../lib/assets/images/icons/tick-circle-icon.svg"),
    operations: require("../lib/assets/images/icons/tools-icon.svg"),
    overview: require("../lib/assets/images/icons/dashboard-icon.svg"),
    personal: require("../lib/assets/images/icons/user-icon.svg"),
    security: require("../lib/assets/images/icons/lock-icon.svg"),
    session: require("../lib/assets/images/icons/monitor-icon.svg"),
};

export const MFAIconSet = {
    sms: require("../lib/assets/images/icons/sms-icon.svg"),
    fingerprint: require("../lib/assets/images/icons/fingerprint.svg")
};

export const AccountRecoveryIconSet = {
    email: require("../lib/assets/images/icons/email-icon.svg"),
    securityQuestions: require("../lib/assets/images/icons/security-questions-icon.svg")
};

export const SettigsSectionIconSet = {
    associatedAccounts: require("../lib/assets/images/illustrations/associated-accounts.svg"),
    associatedAccountsMini: require("../lib/assets/images/illustrations/associated-accounts-mini.svg"),
    changePassword: require("../lib/assets/images/illustrations/change-password.svg"),
    changePasswordMini: require("../lib/assets/images/illustrations/change-password-mini.svg"),
    federatedAssociations: require("../lib/assets/images/illustrations/federated-associations.svg"),
    federatedAssociationsMini: require("../lib/assets/images/illustrations/federated-associations-mini.svg"),
    profileExport: require("../lib/assets/images/illustrations/profile-export.svg"),
    profileExportMini: require("../lib/assets/images/illustrations/profile-export-mini.svg"),
    securityQuestions: require("../lib/assets/images/illustrations/security-questions.svg"),
    securityQuestionsMini: require("../lib/assets/images/illustrations/security-questions-mini.svg")
};
