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
 */

const webpack = require("webpack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TaserJSPlugin = require("terser-webpack-plugin");
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = (env) => {
    const basename = "admin-portal";
    const devServerPort = 9001;
    const publicPath = `/${basename}`;

    /**
     * Deployment configurations
     */
    const serverHostDefault = "https://localhost:9443";
    const serverOriginDefault = serverHostDefault;
    const clientHostDefault = env.NODE_ENV === "prod" ? serverHostDefault : `https://localhost:${devServerPort}`;
    const clientOriginDefault = clientHostDefault;
    const clientIdDefault = "ADMIN_PORTAL";
    const applicationName = "Admin Portal";

    /**
     * App configurations
     */
    const loginPagePath = "/login";
    const homePagePath = "/overview";
    const externalLoginCallbackURL = `${publicPath}${loginPagePath}`;

    /**
     * Build configurations
     */
    const distFolder = path.resolve(__dirname, "build", basename);
    const faviconImage = path.resolve(__dirname, "node_modules", "@wso2is/theme/lib/assets/images/favicon.ico");
    const titleText = "WSO2 Identity Server";
    const copyrightText = `${titleText} \u00A9 ${ new Date().getFullYear() }`;

    const compileAppIndex = () => {
        if (env.NODE_ENV === "prod") {
            return new HtmlWebpackPlugin({
                filename: path.join(distFolder, "index.jsp"),
                template: path.join(__dirname, "src", "index.jsp"),
                hash: true,
                favicon: faviconImage,
                title: titleText,
                publicPath: publicPath,
                contentType: "<%@ page language=\"java\" contentType=\"text/html; charset=UTF-8\" " +
                    "pageEncoding=\"UTF-8\" %>",
                importUtil: "<%@ page import=\"" +
                    "static org.wso2.carbon.identity.core.util.IdentityUtil.getServerURL\" %>",
                serverUrl: "<%=getServerURL(\"\", true, true)%>",
                importTenantPrefix: "<%@ page import=\"static org.wso2.carbon.utils.multitenancy." +
                    "MultitenantConstants.TENANT_AWARE_URL_PREFIX\"%>",
                tenantDelimiter: "\"/\"+'<%=TENANT_AWARE_URL_PREFIX%>'+\"/\"",
                tenantPrefix: '<%=TENANT_AWARE_URL_PREFIX%>'
            });
        }
        else {
            return new HtmlWebpackPlugin({
                filename: path.join(distFolder, "index.html"),
                template: path.join(__dirname, "src", "index.html"),
                hash: true,
                favicon: faviconImage,
                title: titleText,
                publicPath: publicPath
            });
        }
    };

    return {
        entry: ["./src/index.tsx"],
        output: {
            path: distFolder,
            filename: "[name].js",
            publicPath: `${publicPath}/`
        },
        resolve: {
            extensions: [".tsx", ".ts", ".js", ".json"]
        },
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.less$/,
                    use: ["style-loader", "css-loader", "less-loader"]
                },
                {
                    test: /\.(png|jpg|cur|gif|eot|ttf|woff|woff2)$/,
                    use: ["url-loader"]
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "@svgr/webpack",
                            options: {
                                svgoConfig: {
                                    plugins: [{ prefixIds: false }]
                                }
                            }
                        },
                        {
                            loader: "url-loader"
                        }
                    ]
                },
                {
                    test: /\.tsx?$/,
                    use: "ts-loader",
                    exclude: /(node_modules|diagram)/
                },
                {
                    test: /\.ts$/,
                    enforce: "pre",
                    use: [
                        {
                            loader: "tslint-loader"
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    use: ["source-map-loader"],
                    enforce: "pre"
                }
            ]
        },
        watchOptions: {
            ignored: [/node_modules([\\]+|\/)+(?!@wso2is)/, /build/]
        },
        devServer: {
            https: true,
            contentBase: distFolder,
            inline: true,
            host: "localhost",
            port: devServerPort,
            historyApiFallback: true
        },
        node: {
            fs: "empty"
        },
        plugins: [
            new WriteFilePlugin(),
            new CopyWebpackPlugin([
                {
                    context: path.join(__dirname, "node_modules", "@wso2is", "theme"),
                    from: "lib",
                    to: "libs/styles/css"
                },
                // TODO: Removed temporally. Currently we don't use it in runtime
                // {
                //     context: path.resolve(__dirname, 'node_modules', '@wso2is', 'theme'),
                //     from: 'src',
                //     to: 'libs/styles/less/theme-module'
                // },
                // {
                //     context: path.resolve(__dirname, 'node_modules'),
                //     from: 'semantic-ui-less',
                //     to: 'libs/styles/less/semantic-ui-less'
                // },
                {
                    context: path.join(__dirname, "src"),
                    from: "public",
                    to: ".",
                    force: true
                }
            ]),
            compileAppIndex(),
            new webpack.DefinePlugin({
                APP_BASENAME: JSON.stringify(basename),
                APP_HOME_PATH: JSON.stringify(homePagePath),
                APP_LOGIN_PATH: JSON.stringify(loginPagePath),
                APP_NAME: JSON.stringify(applicationName),
                COPYRIGHT_TEXT_DEFAULT: JSON.stringify(copyrightText),
                CLIENT_ID_DEFAULT: JSON.stringify(clientIdDefault),
                CLIENT_HOST_DEFAULT: JSON.stringify(clientHostDefault),
                CLIENT_ORIGIN_DEFAULT: JSON.stringify(clientOriginDefault),
                LOGIN_CALLBACK_URL: JSON.stringify(externalLoginCallbackURL),
                SERVER_HOST_DEFAULT: JSON.stringify(serverHostDefault),
                SERVER_ORIGIN_DEFAULT: JSON.stringify(serverOriginDefault),
                TITLE_TEXT_DEFAULT: JSON.stringify(titleText),
                "typeof window": JSON.stringify("object"),
                "process.env": {
                    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
                }
            })
        ],
        devtool: "source-map",
        optimization: {
            minimize: true,
            minimizer: [
                new TaserJSPlugin({
                    terserOptions: {
                        keep_fnames: true
                    }
                })
            ]
        }
    };
};
